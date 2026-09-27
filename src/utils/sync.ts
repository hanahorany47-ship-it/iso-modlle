import { RoomState } from '../types';

const STORAGE_KEY_PREFIX = 'nettower_room_';
let broadcastChannel: BroadcastChannel | null = null;

if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    broadcastChannel = new BroadcastChannel('nettower_channel');
  } catch {}
}

export function createInitialRoomState(roomId: string): RoomState {
  const cleanId = (roomId || 'NET7').toUpperCase().slice(0, 8);
  return {
    id: cleanId,
    level: 1,
    scenarioId: 'http_browser',
    transmissionMedia: 'fiber',
    activeComputer: 'A',
    activeLayer: 7,
    stepIndex: 0,
    floorBadges: {},
    players: {},
    sabotage: {
      packetLoss: false,
      bitError: false,
      latency: false,
    },
    gameStatus: 'lobby',
    startTime: null,
    elapsedSeconds: 0,
  };
}

export function saveLocalRoom(state: RoomState) {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + state.id, JSON.stringify(state));
    if (broadcastChannel) {
      broadcastChannel.postMessage({ type: 'ROOM_UPDATE', state });
    }
  } catch {}
}

export function getLocalRoom(roomId: string): RoomState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + roomId.toUpperCase());
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed) {
        parsed.floorBadges = parsed.floorBadges || {};
        parsed.players = parsed.players || {};
        return parsed;
      }
    }
  } catch {}
  return null;
}

export async function fetchRoomState(roomId: string): Promise<RoomState> {
  const cleanId = roomId.toUpperCase();
  try {
    const res = await fetch(`/api/rooms/${cleanId}`);
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && serverData.scenarioId) {
        serverData.floorBadges = serverData.floorBadges || {};
        serverData.players = serverData.players || {};
        saveLocalRoom(serverData);
        return serverData;
      }
      const local = getLocalRoom(cleanId);
      if (local) return local;
      return serverData;
    }
  } catch {}

  const local = getLocalRoom(cleanId);
  if (local) return local;
  const initial = createInitialRoomState(cleanId);
  saveLocalRoom(initial);
  return initial;
}

export async function pushRoomState(state: RoomState): Promise<void> {
  saveLocalRoom(state);
  try {
    await fetch(`/api/rooms/${state.id}/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(state),
    });
  } catch {}
}

export function subscribeToLocalSync(callback: (state: RoomState) => void): () => void {
  if (!broadcastChannel) return () => {};
  const handler = (event: MessageEvent) => {
    if (event.data?.type === 'ROOM_UPDATE' && event.data.state) {
      callback(event.data.state);
    }
  };
  broadcastChannel.addEventListener('message', handler);
  return () => {
    broadcastChannel?.removeEventListener('message', handler);
  };
}
