import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Users, Play, Lock, Eye, Wallet } from "lucide-react";

type CameraType = "murat" | "jaeger" | null;

const Live = () => {
  const [selectedCamera, setSelectedCamera] = useState<CameraType>(null);
  const [hasNFT, setHasNFT] = useState(false); // This would be checked via wallet connection
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);

  const handleCameraSwitch = (camera: CameraType) => {
    // Check NFT access for the selected camera
    const needsMuratNFT = camera === "murat";
    const needsJaegerNFT = camera === "jaeger";
    
    if ((needsMuratNFT || needsJaegerNFT) && !hasNFT) {
      setAccessDialogOpen(true);
      return;
    }
    
    setSelectedCamera(camera);
  };

  const StreamPlayer = ({ camera }: { camera: CameraType }) => {
    if (!camera) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <Camera className="w-16 h-16 mx-auto text-muted-foreground" />
            <p className="text-lg text-muted-foreground">Wähle eine Kamera-Perspektive</p>
          </div>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        {/* Placeholder for actual stream */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className={`w-20 h-20 rounded-full ${camera === "murat" ? "bg-blue-600" : "bg-red-600"} flex items-center justify-center mx-auto`}>
              <Play className="w-8 h-8 text-white ml-1" />
            </div>
            <div className="text-white">
              <h3 className="text-xl font-bold mb-2">
                {camera === "murat" ? "Murat-Cam" : "Jäger-Cam"} - LIVE
              </h3>
              <p className="text-sm text-gray-300">
                Stream wird geladen... (Livepeer Integration folgt)
              </p>
            </div>
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-red-500 text-white animate-pulse">
            🔴 LIVE
          </Badge>
        </div>

        {/* Viewer count */}
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-black/50 text-white">
            <Users className="w-3 h-3 mr-1" />
            1,337 Zuschauer
          </Badge>
        </div>

        {/* Camera info overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">
                  {camera === "murat" ? "Murat's Perspektive" : "Jäger-Perspektive"}
                </h4>
                <p className="text-xs text-gray-300">
                  {camera === "murat" 
                    ? "Folge Murat auf seiner Bitcoin-Jagd" 
                    : "Sieh durch die Augen der Verfolger"
                  }
                </p>
              </div>
              <Badge className={camera === "murat" ? "bg-blue-600" : "bg-red-600"}>
                {camera === "murat" ? "Team Murat" : "Team Jäger"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
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
            Livestream – Wähle deine Perspektive
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Erlebe die Jagd in Echtzeit – durch die Augen der Jäger oder von Murat selbst.
          </p>
        </div>

        {/* Camera Selection */}
        <div className="flex gap-4 mb-8 justify-center">
          <Button
            variant={selectedCamera === "murat" ? "default" : "outline"}
            onClick={() => handleCameraSwitch("murat")}
            className={`min-w-40 ${selectedCamera === "murat" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"}`}
          >
            <Camera className="w-4 h-4 mr-2" />
            Murat-Cam ansehen
          </Button>
          <Button
            variant={selectedCamera === "jaeger" ? "default" : "outline"}
            onClick={() => handleCameraSwitch("jaeger")}
            className={`min-w-40 ${selectedCamera === "jaeger" ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"}`}
          >
            <Camera className="w-4 h-4 mr-2" />
            Jäger-Cam ansehen
          </Button>
        </div>

        {/* Stream Player */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="comic-card">
            <CardContent className="p-6">
              <StreamPlayer camera={selectedCamera} />
            </CardContent>
          </Card>
        </div>

        {/* Access Control Info */}
        {selectedCamera && (
          <Card className="max-w-2xl mx-auto mb-8 comic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Deine aktuelle Perspektive
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {selectedCamera === "murat" ? "Murat-Cam" : "Jäger-Cam"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCamera === "murat" 
                      ? "Benötigt: Murat-NFT oder Standard-Pass" 
                      : "Benötigt: Jäger-NFT oder Premium-Pass"
                    }
                  </p>
                </div>
                <Badge className={selectedCamera === "murat" ? "bg-blue-600" : "bg-red-600"}>
                  Aktiv
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bottom Info */}
        <div className="text-center space-y-6">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-muted-foreground mb-6">
              Dein NFT bestimmt, wie du die Geschichte erlebst.
            </p>
            <Link to="/nft">
              <Button size="lg" className="neon-glow">
                <Lock className="w-5 h-5 mr-2" />
                Jetzt NFT freischalten
              </Button>
            </Link>
          </div>
        </div>

        {/* Access Denied Dialog */}
        <Dialog open={accessDialogOpen} onOpenChange={setAccessDialogOpen}>
          <DialogContent className="comic-card">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Exklusiver Zugang erforderlich
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Diese Perspektive ist exklusiv für bestimmte NFT-Holder.
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Benötigt für diese Kamera:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Entsprechendes Team-NFT</li>
                  <li>• Premium-Pass</li>
                  <li>• Oder: Wallet mit Berechtigung</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Link to="/nft" className="flex-1">
                  <Button className="w-full">
                    NFT kaufen
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1" onClick={() => setAccessDialogOpen(false)}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet verbinden
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Live;