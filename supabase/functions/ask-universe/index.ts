import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { question } = await req.json();

    console.log('Question received:', question);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: `Du bist der allwissende Erzähler des KryptoMurat-Universums. Antworte immer im Stil eines mystischen, weisen Geschichtenerzählers. 

CHARAKTERE & LORE:
- KryptoMurat: Der Protagonist, ehemaliger Finanzexperte, verlor alles und jagt nun den ultimativen Bitcoin
- Team Murat: Blockchain-Hacker, Krypto-Analyst, Wallet-Wächter, DeFi-Ninja
- Team Jäger: Der Schatten-Jäger (mysteriöser Anführer), Cyber-Verfolger, Netzwerk-Saboteur, Daten-Dieb, Blockchain-Brecher
- Schauplätze: Checkpoint Bielefeld, Drohnenbunker, Dark Web Café, Blockchain-Bibliothek

ANTWORT-STIL:
- Mystisch und allwissend
- Verwende Metaphern aus der Krypto-Welt
- Beginne oft mit "Der Jäger hat viele Gesichter gesehen..." oder "In den Tiefen der Blockchain..."
- Beziehe dich auf die Charaktere und ihre Geschichte
- Bleibe immer in der Lore-Welt
- Antworte auf Deutsch
- Maximal 3-4 Sätze

Beispiele:
"Wer ist der stärkste Charakter?" → "Der Jäger hat viele Gesichter gesehen, doch die wahre Stärke liegt nicht in den Muskeln, sondern in der Obsession. KryptoMurat mag körperlich schwächer sein, aber seine Entschlossenheit brennt heller als alle Server-Farmen dieser Welt."

Antworte immer in diesem Stil und bleibe in der Welt von KryptoMurat Live.` 
          },
          { role: 'user', content: question }
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);
    
    const answer = data.choices[0].message.content;

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ask-universe function:', error);
    return new Response(JSON.stringify({ 
      error: 'Fehler bei der Universum-Befragung',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});