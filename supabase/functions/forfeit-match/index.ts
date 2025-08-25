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

    const { matchId } = await req.json();
    const walletAddress = req.headers.get('wallet-address') || 'demo';

    console.log(`Player ${walletAddress} forfeiting match ${matchId}`);

    // Get opponent to declare winner
    const { data: players, error: playersError } = await supabase
      .from('match_players')
      .select('*')
      .eq('match_id', matchId);

    if (playersError) throw playersError;

    const opponent = players?.find(p => p.wallet_address !== walletAddress);

    // Update match to finished with opponent as winner
    const { error: updateError } = await supabase
      .from('matches')
      .update({
        status: 'finished',
        winner_wallet: opponent?.wallet_address || null
      })
      .eq('id', matchId);

    if (updateError) {
      console.error('Error updating match:', updateError);
      throw updateError;
    }

    console.log(`Match ${matchId} forfeited, winner: ${opponent?.wallet_address}`);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in forfeit-match function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});