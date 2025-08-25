-- Create enum for match status
CREATE TYPE match_status AS ENUM ('waiting', 'active', 'finished', 'cancelled');

-- Create enum for team types
CREATE TYPE team_type AS ENUM ('murat', 'jaeger');

-- Create enum for action types
CREATE TYPE action_type AS ENUM (
  'move', 'use_character_ability', 'use_action_card', 
  'verstecken', 'polizei_rufen', 'falle_stellen', 
  'bitcoin_transaktion', 'crowdsourcing', 'live_spender'
);

-- Create matches table
CREATE TABLE public.matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status match_status NOT NULL DEFAULT 'waiting',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  winner_wallet TEXT,
  current_turn INTEGER NOT NULL DEFAULT 1,
  turn_timer_start TIMESTAMP WITH TIME ZONE,
  board_state JSONB NOT NULL DEFAULT '{}',
  murat_position TEXT NOT NULL DEFAULT 'A',
  jaeger_position TEXT NOT NULL DEFAULT 'E',
  murat_visible BOOLEAN NOT NULL DEFAULT true,
  murat_visible_turns INTEGER NOT NULL DEFAULT 0,
  game_log JSONB NOT NULL DEFAULT '[]'
);

-- Create match_players table
CREATE TABLE public.match_players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  wallet_address TEXT NOT NULL,
  team team_type NOT NULL,
  deck JSONB NOT NULL DEFAULT '[]',
  ready BOOLEAN NOT NULL DEFAULT false,
  is_current_turn BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(match_id, wallet_address),
  UNIQUE(match_id, team)
);

-- Create match_actions table
CREATE TABLE public.match_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  match_id UUID NOT NULL REFERENCES public.matches(id) ON DELETE CASCADE,
  turn_number INTEGER NOT NULL,
  wallet_address TEXT NOT NULL,
  action_type action_type NOT NULL,
  payload JSONB NOT NULL DEFAULT '{}',
  processed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_actions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for matches
CREATE POLICY "Players can view their own matches" 
ON public.matches FOR SELECT 
USING (
  id IN (
    SELECT match_id FROM public.match_players 
    WHERE wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text)
  )
  OR status = 'finished'
);

CREATE POLICY "Players can update their own matches" 
ON public.matches FOR UPDATE 
USING (
  id IN (
    SELECT match_id FROM public.match_players 
    WHERE wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text)
  )
);

-- RLS Policies for match_players
CREATE POLICY "Players can view match players" 
ON public.match_players FOR SELECT 
USING (
  match_id IN (
    SELECT match_id FROM public.match_players 
    WHERE wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text)
  )
  OR wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text)
);

CREATE POLICY "Players can insert their own match participation" 
ON public.match_players FOR INSERT 
WITH CHECK (wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text));

CREATE POLICY "Players can update their own match participation" 
ON public.match_players FOR UPDATE 
USING (wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text));

-- RLS Policies for match_actions
CREATE POLICY "Players can view actions from their matches" 
ON public.match_actions FOR SELECT 
USING (
  match_id IN (
    SELECT match_id FROM public.match_players 
    WHERE wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text)
  )
);

CREATE POLICY "Players can insert their own actions" 
ON public.match_actions FOR INSERT 
WITH CHECK (wallet_address = ((current_setting('request.headers'::text, true))::json ->> 'wallet-address'::text));

-- Create triggers for updated_at
CREATE TRIGGER update_matches_updated_at
  BEFORE UPDATE ON public.matches
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_match_players_wallet ON public.match_players(wallet_address);
CREATE INDEX idx_match_players_match_id ON public.match_players(match_id);
CREATE INDEX idx_match_actions_match_id ON public.match_actions(match_id);
CREATE INDEX idx_match_actions_turn ON public.match_actions(match_id, turn_number);