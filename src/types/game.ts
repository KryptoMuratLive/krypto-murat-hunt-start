export type TeamType = 'murat' | 'jaeger';
export type MatchStatus = 'waiting' | 'active' | 'finished' | 'cancelled';
export type ActionType = 
  | 'move' 
  | 'use_character_ability' 
  | 'use_action_card'
  | 'verstecken'
  | 'polizei_rufen'
  | 'falle_stellen'
  | 'bitcoin_transaktion'
  | 'crowdsourcing'
  | 'live_spender';

export type Zone = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I';

export interface Character {
  id: number;
  name: string;
  team: TeamType;
  geschwindigkeit: number;
  intelligenz: number;
  staerke: number;
  ability: string;
  description: string;
  image?: string;
}

export interface GameAction {
  id: string;
  match_id: string;
  turn_number: number;
  wallet_address: string;
  action_type: ActionType;
  payload: Record<string, any>;
  processed: boolean;
  created_at: string;
}

export interface MatchPlayer {
  id: string;
  match_id: string;
  wallet_address: string;
  team: TeamType;
  deck: Character[];
  ready: boolean;
  is_current_turn: boolean;
  created_at: string;
}

export interface Match {
  id: string;
  status: MatchStatus;
  created_at: string;
  updated_at: string;
  winner_wallet?: string;
  current_turn: number;
  turn_timer_start?: string;
  board_state: Record<string, any>;
  murat_position: Zone;
  jaeger_position: Zone;
  murat_visible: boolean;
  murat_visible_turns: number;
  game_log: GameLogEntry[];
}

export interface GameLogEntry {
  turn: number;
  player: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface GameState {
  currentMatch?: Match;
  players: MatchPlayer[];
  myDeck: Character[];
  availableActions: string[];
  turnTimeLeft: number;
  isMyTurn: boolean;
  gameLog: GameLogEntry[];
}

export interface BoardZone {
  id: Zone;
  name: string;
  adjacentZones: Zone[];
  blocked: boolean;
  blockedTurns: number;
}

// Character definitions with exact stats from requirements
export const CHARACTERS: Character[] = [
  // Team Murat
  { id: 1001, name: "Murat", team: "murat", geschwindigkeit: 9, intelligenz: 8, staerke: 7, ability: "Täuschungsmanöver", description: "Neutralisiert 1 gegnerische Aktion, +1 Zug" },
  { id: 1002, name: "Hacker", team: "murat", geschwindigkeit: 5, intelligenz: 10, staerke: 2, ability: "Digitale Ablenkung", description: "Blockiert Ortung 3 Züge" },
  { id: 1003, name: "Informant", team: "murat", geschwindigkeit: 3, intelligenz: 7, staerke: 3, ability: "Versteckter Hinweis", description: "Geheimer Pfad (Sprint +1 Zone)" },
  { id: 1004, name: "Kletterer", team: "murat", geschwindigkeit: 9, intelligenz: 4, staerke: 6, ability: "Parkour", description: "Ignoriert 1 Blockade" },
  { id: 1005, name: "Freund", team: "murat", geschwindigkeit: 3, intelligenz: 5, staerke: 2, ability: "Ablenkung", description: "1 gegnerische Karte 1 Zug blocken" },
  
  // Team Jäger
  { id: 2001, name: "Jäger", team: "jaeger", geschwindigkeit: 8, intelligenz: 10, staerke: 7, ability: "Komplette Überwachung", description: "Murat 3 Runden sichtbar" },
  { id: 2002, name: "Drohnenpilot", team: "jaeger", geschwindigkeit: 4, intelligenz: 9, staerke: 3, ability: "Luftüberwachung", description: "Deckt Murat-Karten im Radius 2 Zonen auf" },
  { id: 2003, name: "Saboteur", team: "jaeger", geschwindigkeit: 8, intelligenz: 6, staerke: 7, ability: "Sprengfalle", description: "Murat pausiert 2 Runden" },
  { id: 2004, name: "Rockerbande", team: "jaeger", geschwindigkeit: 6, intelligenz: 4, staerke: 9, ability: "Straßenblockade", description: "Zone 2 Runden blockiert" },
  { id: 2005, name: "Passant", team: "jaeger", geschwindigkeit: 4, intelligenz: 3, staerke: 3, ability: "Hinweis", description: "Murat 1 Runde sichtbar" }
];

// Board configuration
export const BOARD_ZONES: BoardZone[] = [
  { id: 'A', name: 'Start (Murat)', adjacentZones: ['B', 'D'], blocked: false, blockedTurns: 0 },
  { id: 'B', name: 'Zentrum West', adjacentZones: ['A', 'C', 'E'], blocked: false, blockedTurns: 0 },
  { id: 'C', name: 'Nord West', adjacentZones: ['B', 'F'], blocked: false, blockedTurns: 0 },
  { id: 'D', name: 'Süd West', adjacentZones: ['A', 'E', 'G'], blocked: false, blockedTurns: 0 },
  { id: 'E', name: 'Zentrum (Jäger Start)', adjacentZones: ['B', 'D', 'F', 'H'], blocked: false, blockedTurns: 0 },
  { id: 'F', name: 'Nord Ost', adjacentZones: ['C', 'E', 'I'], blocked: false, blockedTurns: 0 },
  { id: 'G', name: 'Süd Ost', adjacentZones: ['D', 'H'], blocked: false, blockedTurns: 0 },
  { id: 'H', name: 'Zentrum Ost', adjacentZones: ['E', 'G', 'I'], blocked: false, blockedTurns: 0 },
  { id: 'I', name: 'Ziel', adjacentZones: ['F', 'H'], blocked: false, blockedTurns: 0 }
];

export const DEMO_DECKS = {
  murat: [1001, 1002, 1004], // Murat, Hacker, Kletterer
  jaeger: [2001, 2002, 2003]  // Jäger, Drohnenpilot, Saboteur
};