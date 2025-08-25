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

    const { matchId, actionType, payload } = await req.json();
    const walletAddress = req.headers.get('wallet-address') || 'demo';

    console.log(`Player ${walletAddress} taking action ${actionType} in match ${matchId}`);

    // Validate match and player turn
    const { data: match, error: matchError } = await supabase
      .from('matches')
      .select('*')
      .eq('id', matchId)
      .eq('status', 'active')
      .single();

    if (matchError || !match) {
      throw new Error('Match not found or not active');
    }

    const { data: player, error: playerError } = await supabase
      .from('match_players')
      .select('*')
      .eq('match_id', matchId)
      .eq('wallet_address', walletAddress)
      .eq('is_current_turn', true)
      .single();

    if (playerError || !player) {
      throw new Error('Not your turn or player not found');
    }

    // Record the action
    const { error: actionError } = await supabase
      .from('match_actions')
      .insert({
        match_id: matchId,
        turn_number: match.current_turn,
        wallet_address: walletAddress,
        action_type: actionType,
        payload: payload,
        processed: false
      });

    if (actionError) {
      console.error('Error recording action:', actionError);
      throw actionError;
    }

    // Process the action based on type
    let newPosition = actionType === 'move' ? payload.toZone : 
                     (player.team === 'murat' ? match.murat_position : match.jaeger_position);
    let gameLogEntry = {
      turn: match.current_turn,
      player: player.team,
      action: actionType,
      details: JSON.stringify(payload),
      timestamp: new Date().toISOString()
    };

    // Update game state based on action
    const gameLog = Array.isArray(match.game_log) ? [...match.game_log, gameLogEntry] : [gameLogEntry];
    
    let updateData: any = {
      game_log: gameLog,
      current_turn: match.current_turn + 1,
      turn_timer_start: new Date().toISOString()
    };

    if (actionType === 'move') {
      if (player.team === 'murat') {
        updateData.murat_position = newPosition;
      } else {
        updateData.jaeger_position = newPosition;
      }
    }

    // Check win conditions
    let winner = null;
    if (player.team === 'murat' && newPosition === 'I') {
      winner = walletAddress;
      updateData.status = 'finished';
      updateData.winner_wallet = winner;
    } else if (player.team === 'jaeger' && newPosition === match.murat_position) {
      winner = walletAddress;
      updateData.status = 'finished';
      updateData.winner_wallet = winner;
    }

    // Update match
    const { error: updateError } = await supabase
      .from('matches')
      .update(updateData)
      .eq('id', matchId);

    if (updateError) {
      console.error('Error updating match:', updateError);
      throw updateError;
    }

    if (!winner) {
      // Switch turns
      await supabase
        .from('match_players')
        .update({ is_current_turn: false })
        .eq('match_id', matchId)
        .eq('wallet_address', walletAddress);

      await supabase
        .from('match_players')
        .update({ is_current_turn: true })
        .eq('match_id', matchId)
        .neq('wallet_address', walletAddress);
    }

    console.log(`Action ${actionType} processed successfully`);

    return new Response(JSON.stringify({ 
      success: true, 
      winner: winner,
      newState: updateData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in take-action function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});