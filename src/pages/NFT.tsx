
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Wallet, Gamepad2, Shield, Zap, Brain } from "lucide-react";
import { allNFTCards, muratCards, jaegerCards } from "@/data/nftCards";

const NFT = () => {
  const [selectedTeam, setSelectedTeam] = useState<"all" | "murat" | "jaeger">("all");
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);

  const filteredCards = selectedTeam === "all" 
    ? allNFTCards 
    : selectedTeam === "murat" 
      ? muratCards 
      : jaegerCards;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "sehr-selten": return "bg-red-500";
      case "selten": return "bg-orange-500";
      case "haeufig": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case "sehr-selten": return "🔴 Sehr selten";
      case "selten": return "🟠 Selten";
      case "haeufig": return "🟢 Häufig";
      default: return "Unbekannt";
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
            NFT-Karten – Deine Schlüssel zum Spiel
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Sammle legendäre Charakterkarten aus der Jagd auf den Bitcoin. Jede Karte ist ein NFT mit einzigartigen Werten und Fähigkeiten.
          </p>
        </div>

        {/* Team Filter */}
        <div className="flex gap-4 mb-8 justify-center">
          <Button
            variant={selectedTeam === "all" ? "default" : "outline"}
            onClick={() => setSelectedTeam("all")}
            className="min-w-32"
          >
            Alle Teams ({allNFTCards.length} Karten)
          </Button>
          <Button
            variant={selectedTeam === "murat" ? "default" : "outline"}
            onClick={() => setSelectedTeam("murat")}
            className={`min-w-32 ${selectedTeam === "murat" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"}`}
          >
            Team Murat ({muratCards.length})
          </Button>
          <Button
            variant={selectedTeam === "jaeger" ? "default" : "outline"}
            onClick={() => setSelectedTeam("jaeger")}
            className={`min-w-32 ${selectedTeam === "jaeger" ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"}`}
          >
            Team Jäger ({jaegerCards.length})
          </Button>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCards.map((card) => (
            <Card key={card.id} className="comic-card group hover:scale-105 transition-transform duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">{card.name}</CardTitle>
                  <Badge className={`${getRarityColor(card.rarity)} text-white`}>
                    {getRarityText(card.rarity)}
                  </Badge>
                </div>
                <div className="w-full h-40 bg-muted rounded-lg mb-4 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Geschicklichkeit
                    </span>
                    <span className="font-bold">{card.skills.geschicklichkeit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Brain className="w-3 h-3" /> Intelligenz
                    </span>
                    <span className="font-bold">{card.skills.intelligenz}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3" /> Stärke
                    </span>
                    <span className="font-bold">{card.skills.staerke}</span>
                  </div>
                </div>

                {/* Ability */}
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm font-medium mb-1">Fähigkeit:</p>
                  <p className="text-xs text-muted-foreground">{card.ability}</p>
                </div>

                {/* Mint Button */}
                <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full neon-glow">
                      Jetzt minten
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="comic-card">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Wallet className="w-5 h-5" />
                        Wallet verbinden
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Verbinde deine Wallet, um {card.name} zu minten.
                      </p>
                      <div className="grid gap-3">
                        <Button className="justify-start" onClick={() => setWalletDialogOpen(false)}>
                          <Wallet className="w-4 h-4 mr-2" />
                          WalletConnect
                        </Button>
                        <Button variant="outline" className="justify-start" onClick={() => setWalletDialogOpen(false)}>
                          <Wallet className="w-4 h-4 mr-2" />
                          MetaMask
                        </Button>
                        <Button variant="outline" className="justify-start" onClick={() => setWalletDialogOpen(false)}>
                          <Wallet className="w-4 h-4 mr-2" />
                          Coinbase Wallet
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Info Section */}
        <div className="text-center space-y-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              NFTs gewähren dir Zugang zur Serie, dem Spiel, exklusiven Cams & Entscheidungen.
            </p>
            <Link to="/game">
              <Button size="lg" className="neon-glow">
                <Gamepad2 className="w-5 h-5 mr-2" />
                Mit deinen Karten spielen
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFT;
