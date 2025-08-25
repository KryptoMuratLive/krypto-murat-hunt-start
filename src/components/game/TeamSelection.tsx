import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Sword } from "lucide-react";
import { muratCards, jaegerCards } from "@/data/nftCards";

interface TeamSelectionProps {
  selectedTeam: "murat" | "jaeger" | null;
  onTeamSelection: (team: "murat" | "jaeger") => void;
}

const TeamSelection = ({ selectedTeam, onTeamSelection }: TeamSelectionProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">Wähle dein Team</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <Card 
          className={`comic-card cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedTeam === "murat" ? "ring-2 ring-blue-500" : ""
          }`}
          onClick={() => onTeamSelection("murat")}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-blue-400">
              <Users className="w-6 h-6" />
              <span>Team Murat ({muratCards.length} Karten)</span>
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
                onTeamSelection("murat");
              }}
            >
              {selectedTeam === "murat" ? "Ausgewählt" : "Team Murat beitreten"}
            </Button>
          </CardContent>
        </Card>

        <Card 
          className={`comic-card cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedTeam === "jaeger" ? "ring-2 ring-red-500" : ""
          }`}
          onClick={() => onTeamSelection("jaeger")}
        >
          <CardHeader>
            <CardTitle className="flex items-center space-x-3 text-red-400">
              <Sword className="w-6 h-6" />
              <span>Team Jäger ({jaegerCards.length} Karten)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Jage den Bitcoin mit roher Gewalt und List. Keine Regeln, nur Sieg.
            </p>
            <Button 
              className={`w-full ${selectedTeam === "jaeger" ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"}`}
              onClick={(e) => {
                e.stopPropagation();
                onTeamSelection("jaeger");
              }}
            >
              {selectedTeam === "jaeger" ? "Ausgewählt" : "Team Jäger beitreten"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamSelection;