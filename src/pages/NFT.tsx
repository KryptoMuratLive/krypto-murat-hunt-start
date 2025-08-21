import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Coins, Star } from "lucide-react";

const NFT = () => {
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
            KryptoMurat NFT Kollektion
          </h1>
          <p className="text-xl text-muted-foreground">
            Exklusive digitale Sammelobjekte aus dem KryptoMurat-Universum
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-accent" />
                <span>Legendäre Karten</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Seltene KryptoMurat Charakterkarten mit einzigartigen Eigenschaften.
              </p>
              <Button variant="outline" className="w-full">
                Sammlung ansehen
              </Button>
            </CardContent>
          </Card>

          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Coins className="w-6 h-6 text-primary" />
                <span>Bitcoin Artifacts</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Mystische Gegenstände und Schlüssel aus der Bitcoin-Jagd.
              </p>
              <Button className="neon-glow w-full">
                Marketplace
              </Button>
            </CardContent>
          </Card>

          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-secondary" />
                <span>Exklusiv Sets</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Limitierte Edition Pakete für echte Sammler und Fans.
              </p>
              <Button variant="secondary" className="w-full">
                Bald verfügbar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NFT;