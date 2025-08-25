
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Timer } from "lucide-react";
import { WalletConnect } from "@/components/WalletConnect";
import TeamSelection from "@/components/game/TeamSelection";
import NFTCardCollection from "@/components/game/NFTCardCollection";
import ActionCards from "@/components/game/ActionCards";

const Game = () => {
  const [selectedTeam, setSelectedTeam] = useState<"murat" | "jaeger" | null>(null);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

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

        {/* Spiel starten */}
        <Card className="comic-card">
          <CardHeader>
            <CardTitle className="text-2xl">Bereit für das Spiel?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Nur mit NFT spielbar – Wallet verbinden erforderlich
            </p>
            <div className="space-y-4">
              <Button 
                className="neon-glow w-full text-lg py-6"
                onClick={() => setShowWalletDialog(true)}
                disabled={!selectedTeam}
              >
                {selectedTeam ? "Spiel starten" : "Wähle zuerst ein Team"}
              </Button>
              {selectedTeam && (
                <p className="text-sm text-center text-accent">
                  Du spielst für Team {selectedTeam === "murat" ? "Murat" : "Jäger"}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Wallet Dialog */}
        <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
          <DialogContent className="comic-card max-w-md">
            <DialogHeader>
              <DialogTitle>Spiel starten</DialogTitle>
              <DialogDescription>
                Verbinde deine Wallet, um das Spiel zu starten.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <WalletConnect />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Game;
