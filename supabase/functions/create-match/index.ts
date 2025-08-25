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

    const { team, deck } = await req.json();
    const walletAddress = req.headers.get('wallet-address') || 'demo';

    console.log(`Creating match for team ${team} with deck:`, deck);

    // Create new match
    const { data: match, error: matchError } = await supabase
      .from('matches')
      .insert({
        status: 'waiting',
        board_state: {},
        murat_position: 'A',
        jaeger_position: 'E',
        murat_visible: true,
        murat_visible_turns: 0,
        game_log: []
      })
      .select()
      .single();

    if (matchError) {
      console.error('Error creating match:', matchError);
      throw matchError;
    }

    // Add player to match
    const { error: playerError } = await supabase
      .from('match_players')
      .insert({
        match_id: match.id,
        wallet_address: walletAddress,
        team: team,
        deck: deck,
        ready: true,
        is_current_turn: team === 'murat' // Murat starts first
      });

    if (playerError) {
      console.error('Error adding player:', playerError);
      throw playerError;
    }

    console.log(`Match ${match.id} created successfully`);

    return new Response(JSON.stringify(match), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-match function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});