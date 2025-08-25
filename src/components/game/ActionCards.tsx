import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  EyeOff, 
  Shield, 
  Zap, 
  Bitcoin, 
  Users, 
  Car,
  Clock,
  Sparkles
} from "lucide-react";
import { actionCards, getActionCardsByTeam } from "@/data/actionCards";

interface ActionCardsProps {
  selectedTeam: "murat" | "jaeger" | null;
  onUseCard?: (cardId: string) => void;
}

const ActionCards = ({ selectedTeam, onUseCard }: ActionCardsProps) => {
  const getIcon = (iconName: string) => {
    const iconMap = {
      EyeOff: EyeOff,
      Shield: Shield,
      Trap: Zap, // Using Zap as Trap placeholder
      Bitcoin: Bitcoin,
      Users: Users,
      Car: Car
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Sparkles;
    return <IconComponent className="w-6 h-6" />;
  };

  const getTeamColor = (team: string) => {
    switch (team) {
      case "murat": return "text-blue-400";
      case "jaeger": return "text-red-400";
      case "both": return "text-purple-400";
      default: return "text-muted-foreground";
    }
  };

  const getTeamBg = (team: string) => {
    switch (team) {
      case "murat": return "from-blue-500/20 to-cyan-500/20";
      case "jaeger": return "from-red-500/20 to-orange-500/20";
      case "both": return "from-purple-500/20 to-pink-500/20";
      default: return "from-gray-500/20 to-gray-600/20";
    }
  };

  const availableCards = selectedTeam ? getActionCardsByTeam(selectedTeam) : actionCards;

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">⚡ Aktionskarten</h2>
        <Badge variant="outline" className="text-sm">
          Gameplay-Karten (keine NFTs)
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableCards.map((card) => (
          <Card key={card.id} className="comic-card relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-full h-1 bg-gradient-to-r ${
              card.team === "murat" ? "from-blue-400 to-blue-600" :
              card.team === "jaeger" ? "from-red-400 to-red-600" :
              "from-purple-400 to-purple-600"
            }`} />
            
            <CardHeader className="pb-2">
              <div className={`aspect-square bg-gradient-to-br ${getTeamBg(card.team)} rounded-lg mb-2 flex items-center justify-center`}>
                <div className={getTeamColor(card.team)}>
                  {getIcon(card.icon)}
                </div>
              </div>
              
              <CardTitle className={`text-sm ${getTeamColor(card.team)}`}>
                {card.name}
              </CardTitle>
              
              <div className="flex justify-between items-center">
                <Badge className={`text-xs ${
                  card.team === "murat" ? "bg-blue-500" :
                  card.team === "jaeger" ? "bg-red-500" :
                  "bg-purple-500"
                } text-white`}>
                  {card.team === "both" ? "Beide Teams" : `Team ${card.team === "murat" ? "Murat" : "Jäger"}`}
                </Badge>
                
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>{card.cooldown}R</span>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="text-xs font-semibold text-accent">
                Effekt: {card.effect}
              </div>
              
              <p className="text-xs text-muted-foreground">
                {card.description}
              </p>
              
              {onUseCard && selectedTeam && (card.team === selectedTeam || card.team === "both") && (
                <Button 
                  size="sm" 
                  className="w-full text-xs"
                  variant="outline"
                  onClick={() => onUseCard(card.id)}
                >
                  Karte spielen
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-foreground">Aktionskarten Info</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>
            <p>• <strong>Cooldown:</strong> Runden bis zur nächsten Nutzung</p>
            <p>• <strong>Team-spezifisch:</strong> Nur für gewähltes Team verfügbar</p>
          </div>
          <div>
            <p>• <strong>Beide Teams:</strong> Von beiden Seiten nutzbar</p>
            <p>• <strong>Strategisch einsetzen:</strong> Timing entscheidet über Erfolg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionCards;