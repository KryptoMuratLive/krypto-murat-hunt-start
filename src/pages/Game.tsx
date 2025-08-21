import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, Trophy } from "lucide-react";

const Game = () => {
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
            KryptoMurat Spiel
          </h1>
          <p className="text-xl text-muted-foreground">
            Werde zum Bitcoin-Jäger und sammle Kryptowährungen!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Gamepad2 className="w-6 h-6 text-primary" />
                <span>Story Modus</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Folge der Hauptgeschichte und hilf KryptoMurat bei seiner Bitcoin-Jagd.
              </p>
              <Button className="neon-glow w-full">
                Story starten
              </Button>
            </CardContent>
          </Card>

          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Trophy className="w-6 h-6 text-secondary" />
                <span>Herausforderungen</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Tägliche Challenges und Mini-Games für extra Belohnungen.
              </p>
              <Button variant="secondary" className="w-full">
                Herausforderungen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Game;