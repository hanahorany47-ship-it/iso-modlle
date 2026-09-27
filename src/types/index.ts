export type Language = 'he' | 'ar';

export type ComputerId = 'A' | 'B';

export type LayerNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type TransmissionMedia = 'fiber' | 'copper' | 'wifi' | 'satellite';

export type ColumnCategory = 'pdu_protocol' | 'address_port' | 'process_action';

export interface LayerMetadata {
  layer: LayerNumber;
  nameHe: string;
  nameAr: string;
  nameEn: string;
  pduHe: string;
  pduAr: string;
  pduEn: string;
  color: string;
  iconName: string;
  descriptionHeA: string;
  descriptionHeB: string;
  descriptionArA: string;
  descriptionArB: string;
}

export interface ChoiceOption {
  id: string;
  textHe: string;
  textAr: string;
  isCorrect: boolean;
  explanationHe: string;
  explanationAr: string;
  hintHe: string;
  hintAr: string;
}

export interface LayerChallenge {
  computer: ComputerId;
  layer: LayerNumber;
  titleHe: string;
  titleAr: string;
  promptHe: string;
  promptAr: string;
  receivedDataHe: string;
  receivedDataAr: string;
  expectedPdu: string;
  options: ChoiceOption[];
}

export interface Scenario {
  id: string;
  level: 1 | 2;
  icon: string;
  titleHe: string;
  titleAr: string;
  subtitleHe: string;
  subtitleAr: string;
  descriptionHe: string;
  descriptionAr: string;
  dataPayload: string;
  dataSize: string;
  protocolL7: string;
  protocolL4: 'TCP' | 'UDP' | 'NONE';
  ports: string;
  specialRulesHe?: string;
  specialRulesAr?: string;
  challenges: Record<string, LayerChallenge>;
}

export interface ColumnOptionItem {
  id: string;
  category: ColumnCategory;
  nameHe: string;
  nameAr: string;
  subtextHe: string;
  subtextAr: string;
  iconName: string;
  isCorrect: boolean;
  explanationHe: string;
  explanationAr: string;
  hintHe: string;
  hintAr: string;
  badgeLabelHe: string;
  badgeLabelAr: string;
}

export interface FloorVerifiedBadge {
  id: string;
  labelHe: string;
  labelAr: string;
  category: ColumnCategory;
}

export interface Player {
  id: string;
  name: string;
  computer: ComputerId;
  layer: LayerNumber;
  isBot?: boolean;
  lastActive: number;
}

export interface RoomState {
  id: string;
  level: 1 | 2;
  scenarioId: string;
  transmissionMedia: TransmissionMedia;
  activeComputer: ComputerId;
  activeLayer: LayerNumber;
  stepIndex: number;
  floorBadges: Record<string, FloorVerifiedBadge[]>;
  players: Record<string, Player>;
  sabotage: {
    packetLoss: boolean;
    bitError: boolean;
    latency: boolean;
    triggeredAt?: number;
    messageHe?: string;
    messageAr?: string;
  };
  gameStatus: 'lobby' | 'playing' | 'completed' | 'sabotaged';
  startTime: number | null;
  elapsedSeconds: number;
  completedTime?: number;
}
