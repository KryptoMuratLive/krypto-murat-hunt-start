import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Sword, Shield, Brain, Zap, Users, Timer, Wallet } from "lucide-react";

interface Card {
  id: number;
  name: string;
  team: "murat" | "jäger";
  geschicklichkeit: number;
  intelligenz: number;
  stärke: number;
  fähigkeit: string;
  seltenheit: "common" | "rare" | "epic" | "legendary";
  image: string;
}

const muratCards: Card[] = [
  {
    id: 1,
    name: "KryptoMurat",
    team: "murat",
    geschicklichkeit: 95,
    intelligenz: 88,
    stärke: 75,
    fähigkeit: "Bitcoin-Radar: Findet versteckte Krypto-Hinweise",
    seltenheit: "legendary",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Blockchain-Hacker",
    team: "murat",
    geschicklichkeit: 80,
    intelligenz: 92,
    stärke: 60,
    fähigkeit: "Code-Breaker: Hackt gegnerische Systeme",
    seltenheit: "epic",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Krypto-Analyst",
    team: "murat",
    geschicklichkeit: 70,
    intelligenz: 85,
    stärke: 55,
    fähigkeit: "Market-Vision: Vorhersage von Krypto-Bewegungen",
    seltenheit: "rare",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Wallet-Wächter",
    team: "murat",
    geschicklichkeit: 75,
    intelligenz: 70,
    stärke: 80,
    fähigkeit: "Sicherheits-Schild: Schutz vor Angriffen",
    seltenheit: "rare",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "DeFi-Ninja",
    team: "murat",
    geschicklichkeit: 85,
    intelligenz: 75,
    stärke: 65,
    fähigkeit: "Schnell-Tausch: Blitzschnelle Transaktionen",
    seltenheit: "common",
    image: "/placeholder.svg"
  }
];

const jägerCards: Card[] = [
  {
    id: 6,
    name: "Der Schatten-Jäger",
    team: "jäger",
    geschicklichkeit: 90,
    intelligenz: 80,
    stärke: 85,
    fähigkeit: "Unsichtbarkeit: Kann unentdeckt angreifen",
    seltenheit: "legendary",
    image: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Cyber-Verfolger",
    team: "jäger",
    geschicklichkeit: 75,
    intelligenz: 88,
    stärke: 70,
    fähigkeit: "Tracking: Verfolgt digitale Spuren",
    seltenheit: "epic",
    image: "/placeholder.svg"
  },
  {
    id: 8,
    name: "Netzwerk-Saboteur",
    team: "jäger",
    geschicklichkeit: 80,
    intelligenz: 82,
    stärke: 65,
    fähigkeit: "System-Crash: Legt Netzwerke lahm",
    seltenheit: "rare",
    image: "/placeholder.svg"
  },
  {
    id: 9,
    name: "Daten-Dieb",
    team: "jäger",
    geschicklichkeit: 85,
    intelligenz: 75,
    stärke: 60,
    fähigkeit: "Info-Steal: Stiehlt wichtige Informationen",
    seltenheit: "rare",
    image: "/placeholder.svg"
  },
  {
    id: 10,
    name: "Blockchain-Brecher",
    team: "jäger",
    geschicklichkeit: 70,
    intelligenz: 90,
    stärke: 55,
    fähigkeit: "Chain-Break: Unterbricht Blockchain-Verbindungen",
    seltenheit: "common",
    image: "/placeholder.svg"
  }
];

const Game = () => {
  const [selectedTeam, setSelectedTeam] = useState<"murat" | "jäger" | null>(null);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  useEffect(() => {
    const savedTeam = localStorage.getItem("selectedTeam") as "murat" | "jäger" | null;
    if (savedTeam) {
      setSelectedTeam(savedTeam);
    }
  }, []);

  const handleTeamSelection = (team: "murat" | "jäger") => {
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", team);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "epic": return "bg-gradient-to-r from-purple-400 to-pink-500";
      case "rare": return "bg-gradient-to-r from-blue-400 to-cyan-500";
      default: return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case "legendary": return "Legendär";
      case "epic": return "Episch";
      case "rare": return "Selten";
      default: return "Gewöhnlich";
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
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Wähle dein Team</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card 
              className={`comic-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedTeam === "murat" ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => handleTeamSelection("murat")}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-blue-400">
                  <Users className="w-6 h-6" />
                  <span>Team Murat</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Kämpfe für Gerechtigkeit und die Wahrheit. Nutze Intelligenz und Strategie.
                </p>
                <Button 
                  className={`w-full ${selectedTeam === "murat" ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTeamSelection("murat");
                  }}
                >
                  {selectedTeam === "murat" ? "Ausgewählt" : "Team Murat beitreten"}
                </Button>
              </CardContent>
            </Card>

            <Card 
              className={`comic-card cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedTeam === "jäger" ? "ring-2 ring-red-500" : ""
              }`}
              onClick={() => handleTeamSelection("jäger")}
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-red-400">
                  <Sword className="w-6 h-6" />
                  <span>Team Jäger</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Jage den Bitcoin mit roher Gewalt und List. Keine Regeln, nur Sieg.
                </p>
                <Button 
                  className={`w-full ${selectedTeam === "jäger" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTeamSelection("jäger");
                  }}
                >
                  {selectedTeam === "jäger" ? "Ausgewählt" : "Team Jäger beitreten"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* NFT Kartenübersicht */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">NFT-Kartensammlung</h2>
            <Link to="/nft">
              <Button variant="outline">
                Zur NFT-Galerie
              </Button>
            </Link>
          </div>
          
          {/* Team Murat Karten */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Team Murat Karten</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {muratCards.map((card) => (
                <Card key={card.id} className="comic-card relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-full h-1 ${getRarityColor(card.seltenheit)}`} />
                  <CardHeader className="pb-2">
                    <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-2 flex items-center justify-center">
                      <Shield className="w-12 h-12 text-blue-400" />
                    </div>
                    <CardTitle className="text-sm text-blue-400">{card.name}</CardTitle>
                    <Badge className={`text-xs ${getRarityColor(card.seltenheit)} text-white`}>
                      {getRarityText(card.seltenheit)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span>Geschick: {card.geschicklichkeit}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Brain className="w-3 h-3 text-purple-400" />
                      <span>Intel: {card.intelligenz}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Sword className="w-3 h-3 text-red-400" />
                      <span>Stärke: {card.stärke}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {card.fähigkeit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Jäger Karten */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-red-400 mb-4">Team Jäger Karten</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {jägerCards.map((card) => (
                <Card key={card.id} className="comic-card relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-full h-1 ${getRarityColor(card.seltenheit)}`} />
                  <CardHeader className="pb-2">
                    <div className="aspect-square bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg mb-2 flex items-center justify-center">
                      <Sword className="w-12 h-12 text-red-400" />
                    </div>
                    <CardTitle className="text-sm text-red-400">{card.name}</CardTitle>
                    <Badge className={`text-xs ${getRarityColor(card.seltenheit)} text-white`}>
                      {getRarityText(card.seltenheit)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs">
                      <Zap className="w-3 h-3 text-yellow-400" />
                      <span>Geschick: {card.geschicklichkeit}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Brain className="w-3 h-3 text-purple-400" />
                      <span>Intel: {card.intelligenz}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Sword className="w-3 h-3 text-red-400" />
                      <span>Stärke: {card.stärke}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {card.fähigkeit}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

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
          <DialogContent className="comic-card">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-3">
                <Wallet className="w-6 h-6 text-primary" />
                <span>Wallet verbinden</span>
              </DialogTitle>
              <DialogDescription>
                Verbinde deine Wallet, um mit deinen NFT-Karten zu spielen.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Du benötigst mindestens eine NFT-Karte aus der KryptoMurat Kollektion, um spielen zu können.
              </p>
              <div className="flex space-x-4">
                <Button className="neon-glow flex-1">
                  Wallet verbinden
                </Button>
                <Link to="/nft" className="flex-1">
                  <Button variant="outline" className="w-full">
                    NFTs kaufen
                  </Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Game;