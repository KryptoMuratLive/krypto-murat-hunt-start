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
    const { analysis_request, voting_data } = await req.json();

    console.log('Analysis request:', analysis_request);
    console.log('Voting data:', voting_data);

    // Generate mock voting data if none provided
    const mockVotingData = voting_data || {
      total_votes: Math.floor(Math.random() * 1000) + 500,
      option_a: {
        name: "Flucht",
        percentage: Math.floor(Math.random() * 30) + 60, // 60-90%
      },
      option_b: {
        name: "Kampf", 
        percentage: Math.floor(Math.random() * 30) + 10, // 10-40%
      },
      trend: "Team Murat denkt strategisch"
    };

    // Ensure percentages add up to 100
    mockVotingData.option_b.percentage = 100 - mockVotingData.option_a.percentage;

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
            content: `Du bist ein KI-Analyst für die KryptoMurat Live Community. Analysiere Community-Entscheidungen mit Witz, Intelligenz und einem tiefen Verständnis für die Charaktere.

CONTEXT: 
- KryptoMurat ist auf der Flucht vor den Jägern
- Die Community trifft Entscheidungen, die sein Schicksal beeinflussen
- Team Murat vs Team Jäger
- Krypto-Themen und Blockchain-Metaphern

ANALYSE-STIL:
- Intelligent und analytisch
- Nutze die Voting-Daten für konkrete Insights  
- Erkläre, was die Entscheidung über die Community aussagt
- Verwende Krypto- und Gaming-Metaphern
- Spekuliere über Motivation der Voter
- Antworte auf Deutsch
- 2-3 prägnante Absätze

Beispiel: "Über 72% stimmten für Flucht statt Kampf. Es zeigt: Team Murat denkt taktisch – aber auch vorsichtig. Die Mehrheit will den langfristigen Gewinn statt des schnellen Risikos. Typisch für HODLer-Mentalität!"

Verwende die bereitgestellten Voting-Daten für deine Analyse.` 
          },
          { 
            role: 'user', 
            content: `Analysiere diese Community-Entscheidung: "${analysis_request}"

Voting-Ergebnisse:
- Gesamtstimmen: ${mockVotingData.total_votes}
- ${mockVotingData.option_a.name}: ${mockVotingData.option_a.percentage}%
- ${mockVotingData.option_b.name}: ${mockVotingData.option_b.percentage}%

Was sagt das über die Community aus?` 
          }
        ],
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI analysis response:', data);
    
    const analysis = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      analysis,
      voting_data: mockVotingData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in analyze-community function:', error);
    return new Response(JSON.stringify({ 
      error: 'Fehler bei der Community-Analyse',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});