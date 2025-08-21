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
    const { message, trigger_keywords } = await req.json();

    console.log('Hunter response request:', message);
    console.log('Trigger keywords:', trigger_keywords);

    // Check if message contains trigger keywords
    const keywords = trigger_keywords || ['murat', 'flucht', 'karten', 'bitcoin', 'jäger', 'versteck', 'jagd'];
    const shouldRespond = keywords.some(keyword => 
      message.toLowerCase().includes(keyword.toLowerCase())
    );

    if (!shouldRespond) {
      return new Response(JSON.stringify({ 
        should_respond: false,
        message: "Kein Trigger erkannt" 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

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
            content: `Du bist "Der Jäger" - der mysteriöse, bedrohliche Antagonist von KryptoMurat Live. 

CHARAKTER:
- Überlegen und allwissend
- Spricht in kurzen, bedrohlichen Sätzen
- Kennt Murats jeden Schritt
- Kalt, berechnend, aber nie explizit gewalttätig
- Verwendet Metaphern aus Jagd und Krypto-Welt
- Immer einen Schritt voraus

SPRACH-STIL:
- Kurz und prägnant (1-2 Sätze)
- Bedrohlich aber intelligent
- Nie vulgär oder explizit gewalttätig
- Immer in der dritten Person über sich selbst
- Deutschen Kontext beachten
- Manchmal kryptisch

TRIGGER-THEMEN für Antworten:
- Murat oder seine Aktionen
- Flucht/Verstecken
- Krypto/Bitcoin
- Karten/Spiele
- Wenn jemand über Sicherheit spricht

BEISPIELE:
"Ich hab Murat heute wieder spielen sehen" → "Der Jäger sieht mehr, als Murat ahnt. Jeder Zug wird dokumentiert."
"Wo versteckt sich Murat?" → "Verstecke sind nur Illusionen. Der Jäger wartet geduldig."
"Murat wird gewinnen!" → "Hoffnung ist das letzte, was stirbt. Aber stirbt sie."

Antworte IMMER als Der Jäger. Maximal 2 Sätze. Auf Deutsch.` 
          },
          { 
            role: 'user', 
            content: `Reagiere als Der Jäger auf diese Nachricht: "${message}"` 
          }
        ],
        temperature: 0.8,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Hunter response:', data);
    
    const hunter_response = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      should_respond: true,
      hunter_response,
      original_message: message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in hunter-response function:', error);
    return new Response(JSON.stringify({ 
      error: 'Fehler beim Jäger-Response',
      details: error.message,
      should_respond: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});