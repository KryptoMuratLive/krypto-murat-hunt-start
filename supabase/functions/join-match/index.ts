import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { matchId, team, deck } = await req.json();
    const walletAddress = req.headers.get('wallet-address') || 'demo';

    console.log(`Player ${walletAddress} joining match ${matchId} as team ${team}`);

    // Check if match exists and is waiting
    const { data: match, error: matchFetchError } = await supabase
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .eq('status', 'waiting')
      .single();

    if (matchFetchError || !match) {
      throw new Error('Match not found or not available');
    }

    // Check if player already in match
    const { data: existingPlayer } = await supabase
      .from('match_players')
      .select('*')
      .eq('match_id', matchId)
      .eq('wallet_address', walletAddress)
      .single();

    if (existingPlayer) {
      throw new Error('Player already in this match');
    }

    // Add player to match
    const { error: playerError } = await supabase
      .from('match_players')
      .insert({
        match_id: matchId,
        wallet_address: walletAddress,
        team: team,
        deck: deck,
        ready: true,
        is_current_turn: false // First player (creator) starts
      });

    if (playerError) {
      console.error('Error adding player:', playerError);
      throw playerError;
    }

    // Check if we have 2 players now, if so start the match
    const { data: players, error: playersError } = await supabase
      .from('match_players')
      .select('*')
      .eq('match_id', matchId);

    if (playersError) throw playersError;

    if (players && players.length === 2) {
      // Start the match
      const { error: updateError } = await supabase
        .from('matches')
        .update({ 
          status: 'active',
          turn_timer_start: new Date().toISOString()
        })
        .eq('id', matchId);

      if (updateError) {
        console.error('Error starting match:', updateError);
        throw updateError;
      }

      console.log(`Match ${matchId} started with 2 players`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in join-match function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});