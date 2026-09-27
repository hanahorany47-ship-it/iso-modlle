import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Player {
  id: string;
  name: string;
  computer: 'A' | 'B';
  layer: number;
  lastActive: number;
}

interface RoomState {
  id: string;
  level: 1 | 2;
  scenarioId: string;
  transmissionMedia: 'fiber' | 'copper' | 'wifi' | 'satellite';
  activeComputer: 'A' | 'B';
  activeLayer: number; // 7 down to 1 on A, 1 up to 7 on B
  floorBadges: Record<string, Array<{ id: string; labelHe: string; labelAr: string; category: string }>>;
  packetHistory: Array<{
    computer: 'A' | 'B';
    layer: number;
    timestamp: number;
    status: 'success' | 'error' | 'pending';
    dataSnapshot: string;
  }>;
  players: Record<string, Player>;
  sabotage: {
    packetLoss: boolean;
    bitError: boolean;
    latency: boolean;
    message?: string;
  };
  gameStatus: 'lobby' | 'playing' | 'completed' | 'failed';
  startTime: number | null;
  elapsedSeconds: number;
  lastError: {
    computer: 'A' | 'B';
    layer: number;
    message: string;
    hint: string;
    timestamp: number;
  } | null;
}

const rooms = new Map<string, RoomState>();

// Helper to get or create room
function getOrCreateRoom(roomId: string): RoomState {
  const cleanId = (roomId || 'DEMO').toUpperCase().slice(0, 8);
  if (!rooms.has(cleanId)) {
    rooms.set(cleanId, {
      id: cleanId,
      level: 1,
      scenarioId: 'http_browser',
      transmissionMedia: 'fiber',
      activeComputer: 'A',
      activeLayer: 7,
      floorBadges: {},
      packetHistory: [],
      players: {},
      sabotage: {
        packetLoss: false,
        bitError: false,
        latency: false,
      },
      gameStatus: 'lobby',
      startTime: null,
      elapsedSeconds: 0,
      lastError: null,
    });
  }
  return rooms.get(cleanId)!;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get('/api/rooms/:id', (req, res) => {
    const room = getOrCreateRoom(req.params.id);
    res.json(room);
  });

  app.post('/api/rooms/:id/join', (req, res) => {
    const room = getOrCreateRoom(req.params.id);
    const { playerId, name, computer, layer } = req.body;
    if (!playerId) {
      return res.status(400).json({ error: 'Player ID required' });
    }
    room.players[playerId] = {
      id: playerId,
      name: name || 'תלמיד',
      computer: computer || 'A',
      layer: Number(layer) || 7,
      lastActive: Date.now(),
    };
    res.json({ success: true, room });
  });

  app.post('/api/rooms/:id/leave', (req, res) => {
    const room = getOrCreateRoom(req.params.id);
    const { playerId } = req.body;
    if (playerId && room.players[playerId]) {
      delete room.players[playerId];
    }
    res.json({ success: true, room });
  });

  app.post('/api/rooms/:id/update', (req, res) => {
    const room = getOrCreateRoom(req.params.id);
    const updates = req.body;
    Object.assign(room, updates);
    res.json({ success: true, room });
  });

  app.post('/api/rooms/:id/reset', (req, res) => {
    const room = getOrCreateRoom(req.params.id);
    room.activeComputer = 'A';
    room.activeLayer = 7;
    room.floorBadges = {};
    room.packetHistory = [];
    room.sabotage = { packetLoss: false, bitError: false, latency: false };
    room.gameStatus = 'playing';
    room.startTime = Date.now();
    room.elapsedSeconds = 0;
    room.lastError = null;
    res.json({ success: true, room });
  });

  const PORT = 3000;

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
