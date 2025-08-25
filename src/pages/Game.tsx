
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Timer } from "lucide-react";
import TeamSelection from "@/components/game/TeamSelection";
import NFTCardCollection from "@/components/game/NFTCardCollection";
import ActionCards from "@/components/game/ActionCards";

const Game = () => {
  const [selectedTeam, setSelectedTeam] = useState<"murat" | "jaeger" | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const savedTeam = localStorage.getItem("selectedTeam") as "murat" | "jaeger" | null;
    if (savedTeam) {
      setSelectedTeam(savedTeam);
    }
  }, []);

  const handleTeamSelection = (team: "murat" | "jaeger") => {
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", team);
  };

  const handleUseActionCard = (cardId: string) => {
    // Placeholder for action card logic
    console.log(`Using action card: ${cardId}`);
    // Here you would implement the actual game logic
  };

  const handleStartGame = () => {
    if (selectedTeam) {
      setGameStarted(true);
      console.log(`Game started for team: ${selectedTeam}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Hauptseite
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Das Spiel – Deine Karten entscheiden
          </h1>
          
          {/* Intro Bereich */}
          <div className="mb-8">
            <p className="text-xl text-muted-foreground mb-2">
              In diesem Spiel geht es um Strategie, Mut und dein Deck.
            </p>
            <p className="text-lg text-accent">
              Wähle dein Team – Murat oder Jäger – und beeinflusse den Verlauf der Serie.
            </p>
          </div>

          {/* Fortschrittsbalken */}
          <Card className="comic-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Timer className="w-6 h-6 text-primary" />
                <span>Spielstatus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground font-semibold">Runde 1 aktiv</span>
                  <span className="text-accent">Nächste Entscheidung in 3 Tagen</span>
                </div>
                <Progress value={33} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  Die Community entscheidet über den nächsten Schritt in der Serie
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Teamwahl */}
        <TeamSelection 
          selectedTeam={selectedTeam}
          onTeamSelection={handleTeamSelection}
        />

        {/* Aktionskarten */}
        <ActionCards 
          selectedTeam={selectedTeam}
          onUseCard={handleUseActionCard}
        />

        {/* NFT Kartenübersicht */}
        <NFTCardCollection />

        {/* Spiel starten/Status */}
        {!gameStarted ? (
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="text-2xl">Bereit für das Spiel?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                🎮 Testmodus aktiviert - kein Wallet erforderlich
              </p>
              <div className="space-y-4">
                <Button 
                  className="neon-glow w-full text-lg py-6"
                  onClick={handleStartGame}
                  disabled={!selectedTeam}
                >
                  {selectedTeam ? "🚀 Spiel starten" : "Wähle zuerst ein Team"}
                </Button>
                {selectedTeam && (
                  <p className="text-sm text-center text-accent">
                    Du spielst für Team {selectedTeam === "murat" ? "Murat" : "Jäger"}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="comic-card border-green-500/50">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">🎮 Spiel aktiv!</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-semibold">
                    Team: {selectedTeam === "murat" ? "Murat 🛡️" : "Jäger ⚔️"}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setGameStarted(false)}
                  >
                    Spiel beenden
                  </Button>
                </div>
                <Progress value={75} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  ⚡ Nutze deine Aktionskarten strategisch!
                </p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm">📊 Statistiken</Button>
                  <Button variant="outline" size="sm">🎯 Ziele</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Game;
