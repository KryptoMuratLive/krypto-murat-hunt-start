import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Play, Lock, Crown, Vote, Wallet } from "lucide-react";

const episodes = [
  {
    id: 1,
    title: "Die Entscheidung",
    description: "KryptoMurat steht vor der größten Entscheidung seines Lebens. Die Jagd beginnt.",
    accessLevel: "free",
    unlocked: true,
  },
  {
    id: 2,
    title: "Verfolgung",
    description: "Die ersten Hinweise führen in gefährliche Gebiete. Wer verfolgt wen?",
    accessLevel: "nft",
    unlocked: false,
  },
  {
    id: 3,
    title: "Täuschung",
    description: "Nichts ist wie es scheint. Premium-Enthüllungen warten auf dich.",
    accessLevel: "premium",
    unlocked: false,
  },
  {
    id: 4,
    title: "Der Showdown",
    description: "Das finale Duell um den Bitcoin. Deine Stimme entscheidet das Ende.",
    accessLevel: "voting",
    unlocked: false,
  },
];

const Serie = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const getAccessIcon = (accessLevel: string) => {
    switch (accessLevel) {
      case "free":
        return <Play className="w-5 h-5 text-primary" />;
      case "nft":
        return <Lock className="w-5 h-5 text-accent" />;
      case "premium":
        return <Crown className="w-5 h-5 text-secondary" />;
      case "voting":
        return <Vote className="w-5 h-5 text-primary" />;
      default:
        return <Lock className="w-5 h-5" />;
    }
  };

  const getAccessText = (accessLevel: string) => {
    switch (accessLevel) {
      case "free":
        return "Kostenlos verfügbar";
      case "nft":
        return "NFT erforderlich";
      case "premium":
        return "Premium-NFT erforderlich";
      case "voting":
        return "NFT + Voting erforderlich";
      default:
        return "Gesperrt";
    }
  };

  const handleEpisodeClick = (episode: any) => {
    if (episode.unlocked) {
      // Navigate to episode detail page
      window.location.href = `/folge/${episode.id}`;
    } else {
      setShowWalletDialog(true);
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
            Die Serie – Jagd auf den Bitcoin
          </h1>
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Schalte die Wahrheit frei
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Nur wer einen NFT besitzt, kann die nächste Folge sehen.
          </p>
          
          <Link to="/nft">
            <Button className="neon-glow mb-8">
              NFTs ansehen
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {episodes.map((episode) => (
            <Card 
              key={episode.id} 
              className={`comic-card relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                !episode.unlocked ? 'opacity-75' : ''
              }`}
              onClick={() => handleEpisodeClick(episode)}
            >
              {!episode.unlocked && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-accent mx-auto mb-4" />
                    <p className="text-foreground font-semibold">Gesperrt</p>
                  </div>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Folge {episode.id}: {episode.title}</span>
                  {getAccessIcon(episode.accessLevel)}
                </CardTitle>
                <p className="text-sm text-accent">
                  {getAccessText(episode.accessLevel)}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {episode.description}
                </p>
                <Button 
                  variant={episode.unlocked ? "default" : "outline"}
                  className={episode.unlocked ? "neon-glow" : ""}
                  disabled={!episode.unlocked}
                >
                  {episode.unlocked ? "Jetzt ansehen" : "Freischalten erforderlich"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={showWalletDialog} onOpenChange={setShowWalletDialog}>
        <DialogContent className="comic-card">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <Wallet className="w-6 h-6 text-primary" />
              <span>Wallet verbinden</span>
            </DialogTitle>
            <DialogDescription>
              Verbinde deine Wallet, um diese Folge freizuschalten.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Du benötigst einen NFT aus der KryptoMurat Kollektion, um auf gesperrte Episoden zugreifen zu können.
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
  );
};

export default Serie;