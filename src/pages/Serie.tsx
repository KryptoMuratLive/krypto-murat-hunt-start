import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";

const Serie = () => {
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
            KryptoMurat Live - Serie
          </h1>
          <p className="text-xl text-muted-foreground">
            Die epische Web3-Serie: Jagd auf den Bitcoin
          </p>
        </div>

        <div className="grid gap-8">
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Play className="w-6 h-6 text-primary" />
                <span>Folge 1: Der Beginn der Jagd</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                KryptoMurat entdeckt die ersten Hinweise auf den legendären Bitcoin. 
                Die Jagd beginnt in den dunklen Gassen der Krypto-Welt.
              </p>
              <Button className="neon-glow">
                Jetzt ansehen
              </Button>
            </CardContent>
          </Card>

          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Play className="w-6 h-6 text-secondary" />
                <span>Folge 2: Gefährliche Allianzen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Neue Verbündete und Feinde erscheinen. Wem kann KryptoMurat vertrauen?
              </p>
              <Button variant="secondary">
                Bald verfügbar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Serie;