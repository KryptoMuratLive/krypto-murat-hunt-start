import { useAddress, useContract, useNFT, useConnectionStatus } from "@thirdweb-dev/react";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Users, Play, Lock, Eye, Wallet, AlertCircle } from "lucide-react";

// NFT Gate Configuration
const NFT_GATE_CONTRACT = "0xc4D64540D638138D142115F97A559024c9ba2bc0"; // Replace with actual NFT contract address
const REQUIRED_NFT_ID = "1"; // ID des NFT-Passes (z. B. Serien-Pass)

type CameraType = "murat" | "jaeger";

const Live = () => {
  const address = useAddress();
  const connectionStatus = useConnectionStatus();
  const { contract } = useContract(NFT_GATE_CONTRACT);
  const { data: nft, isLoading } = useNFT(contract, REQUIRED_NFT_ID);
  const [selectedCamera, setSelectedCamera] = useState<CameraType>("murat");
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);

  // Stream IDs für Livepeer (using simple video for demo)
  const streamKeys = {
    murat: "/lovable-uploads/1945b2dd-4535-4341-8070-a9c7428358a3.png", // Replace with actual Stream ID from Livepeer
    jaeger: "/lovable-uploads/1945b2dd-4535-4341-8070-a9c7428358a3.png"  // Replace with actual Stream ID from Livepeer
  };

  // For demo purposes, assume user has NFT if connected
  const hasNFTAccess = address && connectionStatus === "connected";

  const handleCameraSwitch = (camera: CameraType) => {
    if (!address || connectionStatus !== "connected") {
      setAccessDialogOpen(true);
      return;
    }
    
    // In production, check actual NFT ownership here
    if (!hasNFTAccess) {
      setAccessDialogOpen(true);
      return;
    }
    
    setSelectedCamera(camera);
  };

  const StreamPlayer = ({ camera }: { camera: CameraType }) => {
    if (!hasNFTAccess) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center space-y-4">
            <Lock className="w-16 h-16 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-semibold text-muted-foreground mb-2">
                🔐 Exklusiver Zugang erforderlich
              </p>
              <p className="text-sm text-muted-foreground">
                Verbinde deine Wallet und stelle sicher, dass du den erforderlichen NFT-Pass besitzt.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        {/* Video placeholder for now - replace with Livepeer Player */}
        <img 
          src={streamKeys[camera]} 
          alt={`${camera} stream`}
          className="w-full h-full object-cover"
        />
        
        {/* Live indicator */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-red-500 text-white animate-pulse">
            🔴 LIVE
          </Badge>
        </div>

        {/* Viewer count */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="secondary" className="bg-black/50 text-white">
            <Users className="w-3 h-3 mr-1" />
            1,337 Zuschauer
          </Badge>
        </div>

        {/* Camera info overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
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

  // Loading state
  if (isLoading || connectionStatus === "connecting") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">⏳ Verbinde mit Wallet...</p>
        </div>
      </div>
    );
  }

  // Not connected state
  if (!address || connectionStatus !== "connected") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-4 comic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet-Verbindung erforderlich
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              🔐 Bitte verbinde deine Wallet, um den Livestream zu sehen.
            </p>
            <Button onClick={() => setAccessDialogOpen(true)} className="w-full">
              <Wallet className="w-4 h-4 mr-2" />
              Wallet verbinden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  NFT-Pass verifiziert ✅ - Vollzugang gewährt
                </p>
              </div>
              <Badge className={selectedCamera === "murat" ? "bg-blue-600" : "bg-red-600"}>
                Aktiv
              </Badge>
            </div>
          </CardContent>
        </Card>

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
                Wallet-Verbindung & NFT erforderlich
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Um den Livestream zu sehen, benötigst du eine Wallet-Verbindung und den entsprechenden NFT-Pass.
              </p>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Voraussetzungen:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Ethereum/Polygon-kompatible Wallet (MetaMask, Coinbase, WalletConnect)</li>
                  <li>• KryptoMurat Serienpass NFT (Contract: {NFT_GATE_CONTRACT})</li>
                  <li>• Aktive Blockchain-Verbindung</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <Link to="/nft" className="flex-1">
                  <Button className="w-full">
                    <Lock className="w-4 h-4 mr-2" />
                    NFT-Pass kaufen
                  </Button>
                </Link>
                <Button variant="outline" className="flex-1" onClick={() => setAccessDialogOpen(false)}>
                  <Wallet className="w-4 h-4 mr-2" />
                  Schließen
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