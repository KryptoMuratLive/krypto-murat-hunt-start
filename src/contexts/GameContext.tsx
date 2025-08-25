import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { GameState, Match, MatchPlayer, GameLogEntry, TeamType } from '@/types/game';
import { gameApi } from '@/services/gameApi';
import { useToast } from '@/hooks/use-toast';

interface GameContextType {
  state: GameState;
  createMatch: (team: TeamType, deck: number[]) => Promise<void>;
  joinMatch: (matchId: string, team: TeamType, deck: number[]) => Promise<void>;
  takeAction: (actionType: string, payload: any) => Promise<void>;
  forfeitMatch: () => Promise<void>;
  startDemo: (team: TeamType) => void;
  loading: boolean;
}

type GameAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_MATCH'; payload: Match }
  | { type: 'SET_PLAYERS'; payload: MatchPlayer[] }
  | { type: 'SET_DECK'; payload: number[] }
  | { type: 'UPDATE_TURN_TIME'; payload: number }
  | { type: 'ADD_LOG_ENTRY'; payload: GameLogEntry }
  | { type: 'RESET_GAME' }
  | { type: 'START_DEMO'; payload: { team: TeamType } };

const initialState: GameState = {
  currentMatch: undefined,
  players: [],
  myDeck: [],
  availableActions: [],
  turnTimeLeft: 60,
  isMyTurn: false,
  gameLog: []
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_LOADING':
      return state; // Loading handled separately
    case 'SET_MATCH':
      return {
        ...state,
        currentMatch: action.payload,
        gameLog: action.payload.game_log || []
      };
    case 'SET_PLAYERS':
      return {
        ...state,
        players: action.payload,
        isMyTurn: action.payload.some(p => p.is_current_turn && p.wallet_address === 'demo') // Demo mode
      };
    case 'SET_DECK':
      return {
        ...state,
        myDeck: action.payload.map(id => ({ 
          id, 
          name: `Card ${id}`, 
          team: id > 2000 ? 'jaeger' : 'murat',
          geschwindigkeit: 5,
          intelligenz: 5,
          staerke: 5,
          ability: 'Test',
          description: 'Test card'
        }))
      };
    case 'UPDATE_TURN_TIME':
      return {
        ...state,
        turnTimeLeft: action.payload
      };
    case 'ADD_LOG_ENTRY':
      return {
        ...state,
        gameLog: [...state.gameLog, action.payload]
      };
    case 'START_DEMO':
      return {
        ...state,
        currentMatch: {
          id: 'demo',
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          current_turn: 1,
          board_state: {},
          murat_position: 'A',
          jaeger_position: 'E',
          murat_visible: true,
          murat_visible_turns: 0,
          game_log: []
        },
        players: [
          {
            id: 'demo-player',
            match_id: 'demo',
            wallet_address: 'demo',
            team: action.payload.team,
            deck: [],
            ready: true,
            is_current_turn: true,
            created_at: new Date().toISOString()
          }
        ],
        isMyTurn: true
      };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  const createMatch = async (team: TeamType, deck: number[]) => {
    try {
      setLoading(true);
      const match = await gameApi.createMatch(team, deck);
      dispatch({ type: 'SET_MATCH', payload: match });
      toast({
        title: "Match erstellt",
        description: "Warte auf Gegenspieler..."
      });
    } catch (error) {
      console.error('Error creating match:', error);
      toast({
        title: "Fehler",
        description: "Match konnte nicht erstellt werden",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const joinMatch = async (matchId: string, team: TeamType, deck: number[]) => {
    try {
      setLoading(true);
      await gameApi.joinMatch(matchId, team, deck);
      toast({
        title: "Match beigetreten",
        description: "Spiel startet..."
      });
    } catch (error) {
      console.error('Error joining match:', error);
      toast({
        title: "Fehler", 
        description: "Konnte Match nicht beitreten",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const takeAction = async (actionType: string, payload: any) => {
    if (!state.currentMatch) return;
    
    try {
      if (state.currentMatch.id === 'demo') {
        // Demo mode - just add to log
        const logEntry: GameLogEntry = {
          turn: state.currentMatch.current_turn,
          player: 'Demo Player',
          action: actionType,
          details: JSON.stringify(payload),
          timestamp: new Date().toISOString()
        };
        dispatch({ type: 'ADD_LOG_ENTRY', payload: logEntry });
        return;
      }

      await gameApi.takeAction(state.currentMatch.id, actionType, payload);
      toast({
        title: "Aktion ausgeführt",
        description: `${actionType} wurde gespielt`
      });
    } catch (error) {
      console.error('Error taking action:', error);
      toast({
        title: "Fehler",
        description: "Aktion konnte nicht ausgeführt werden",
        variant: "destructive"
      });
    }
  };

  const forfeitMatch = async () => {
    if (!state.currentMatch) return;
    
    try {
      await gameApi.forfeitMatch(state.currentMatch.id);
      dispatch({ type: 'RESET_GAME' });
      toast({
        title: "Match aufgegeben",
        description: "Das Spiel wurde beendet"
      });
    } catch (error) {
      console.error('Error forfeiting match:', error);
    }
  };

  const startDemo = (team: TeamType) => {
    dispatch({ type: 'START_DEMO', payload: { team } });
    toast({
      title: "Demo gestartet",
      description: `Spielst als Team ${team === 'murat' ? 'Murat' : 'Jäger'}`
    });
  };

  // Timer effect
  useEffect(() => {
    if (state.currentMatch?.status === 'active' && state.isMyTurn) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TURN_TIME', payload: Math.max(0, state.turnTimeLeft - 1) });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state.currentMatch?.status, state.isMyTurn, state.turnTimeLeft]);

  return (
    <GameContext.Provider value={{
      state,
      createMatch,
      joinMatch,
      takeAction,
      forfeitMatch,
      startDemo,
      loading
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}