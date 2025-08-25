import { supabase } from '@/integrations/supabase/client';
import { Match, MatchPlayer, TeamType } from '@/types/game';

export const gameApi = {
  async createMatch(team: TeamType, deck: number[]): Promise<Match> {
    const { data, error } = await supabase.functions.invoke('create-match', {
      body: { team, deck }
    });
    
    if (error) throw error;
    return data;
  },

  async joinMatch(matchId: string, team: TeamType, deck: number[]): Promise<void> {
    const { error } = await supabase.functions.invoke('join-match', {
      body: { matchId, team, deck }
    });
    
    if (error) throw error;
  },

  async startMatch(matchId: string): Promise<void> {
    const { error } = await supabase.functions.invoke('start-match', {
      body: { matchId }
    });
    
    if (error) throw error;
  },

  async takeAction(matchId: string, actionType: string, payload: Record<string, any>): Promise<void> {
    const { error } = await supabase.functions.invoke('take-action', {
      body: { matchId, actionType, payload }
    });
    
    if (error) throw error;
  },

  async forfeitMatch(matchId: string): Promise<void> {
    const { error } = await supabase.functions.invoke('forfeit-match', {
      body: { matchId }
    });
    
    if (error) throw error;
  },

  async getMatch(matchId: string): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      ...data,
      board_state: typeof data.board_state === 'object' ? data.board_state as Record<string, any> : {},
      game_log: Array.isArray(data.game_log) ? data.game_log as any[] : []
    } as Match;
  },

  async getMatchPlayers(matchId: string): Promise<MatchPlayer[]> {
    const { data, error } = await supabase
      .from('match_players')
      .select('*')
      .eq('match_id', matchId);
    
    if (error) throw error;
    
    return (data || []).map(player => ({
      ...player,
      deck: Array.isArray(player.deck) ? player.deck as any[] : []
    })) as MatchPlayer[];
  },

  async findWaitingMatch(team: TeamType): Promise<Match | null> {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .eq('status', 'waiting')
      .limit(1)
      .maybeSingle();
    
    if (error) throw error;
    if (!data) return null;
    
    return {
      ...data,
      board_state: typeof data.board_state === 'object' ? data.board_state as Record<string, any> : {},
      game_log: Array.isArray(data.game_log) ? data.game_log as any[] : []
    } as Match;
  }
};