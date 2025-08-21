import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface LivestreamSubtitlesProps {
  className?: string;
}

export default function LivestreamSubtitles({ className }: LivestreamSubtitlesProps) {
  const [selectedLang, setSelectedLang] = useState("en");
  const [subtitle, setSubtitle] = useState("Live translation will appear here…");
  const [isActive, setIsActive] = useState(false);

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "tr", label: "Türkçe" },
    { value: "es", label: "Español" },
    { value: "fr", label: "Français" },
  ];

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive) {
      const subtitleLoop = async () => {
        // Simulate real-time subtitle updates
        const audioInput = {}; // TODO: Real audio capture from WebRTC/MicStream
        const detectedText = await whisperToText(audioInput);
        const translated = await translateTextGermanTo(selectedLang, detectedText);
        setSubtitle(translated);
      };

      // Update subtitles every 4 seconds
      intervalId = setInterval(subtitleLoop, 4000);
      subtitleLoop(); // Initial call
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [selectedLang, isActive]);

  // Placeholder for Speech-to-Text (Whisper API)
  async function whisperToText(audioBuffer: any): Promise<string> {
    // TODO: Implement real Whisper API call
    const sampleTexts = [
      "Willkommen zur Jagd auf den Bitcoin!",
      "Der Jäger hat viele Gesichter gesehen...",
      "In den Tiefen der Blockchain versteckt sich die Wahrheit.",
      "KryptoMurat's Obsession brennt heller als alle Server-Farmen.",
      "Das Team bereitet sich auf den nächsten Move vor.",
    ];
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  }

  // Placeholder for translation (MarianMT/GPT API)
  async function translateTextGermanTo(lang: string, text: string): Promise<string> {
    // TODO: Implement real translation API
    const translations: Record<string, Record<string, string>> = {
      "Willkommen zur Jagd auf den Bitcoin!": {
        en: "Welcome to the hunt for Bitcoin!",
        tr: "Bitcoin avına hoş geldiniz!",
        es: "¡Bienvenido a la caza del Bitcoin!",
        fr: "Bienvenue dans la chasse au Bitcoin !",
      },
      "Der Jäger hat viele Gesichter gesehen...": {
        en: "The Hunter has seen many faces...",
        tr: "Avcı birçok yüz görmüş...",
        es: "El Cazador ha visto muchas caras...",
        fr: "Le Chasseur a vu de nombreux visages...",
      },
      "In den Tiefen der Blockchain versteckt sich die Wahrheit.": {
        en: "In the depths of the blockchain, truth is hidden.",
        tr: "Blockchain'in derinliklerinde gerçek gizlidir.",
        es: "En las profundidades del blockchain se esconde la verdad.",
        fr: "Dans les profondeurs de la blockchain se cache la vérité.",
      },
    };

    return translations[text]?.[lang] || text;
  }

  return (
    <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}>
      <div className="flex flex-col items-center gap-2">
        {/* Language Selector */}
        <div className="flex items-center gap-2">
          <Select value={selectedLang} onValueChange={setSelectedLang}>
            <SelectTrigger className="w-32 bg-background/90 backdrop-blur-sm border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
              isActive 
                ? "bg-red-500 text-white" 
                : "bg-background/90 border border-border text-foreground hover:bg-accent"
            }`}
          >
            {isActive ? "🔴 ON" : "⚪ OFF"}
          </button>
        </div>

        {/* Subtitle Display */}
        {isActive && (
          <Card className="bg-black/80 backdrop-blur-sm border-0 max-w-2xl">
            <div className="px-6 py-3">
              <p className="text-white text-lg text-center leading-relaxed">
                {subtitle}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}