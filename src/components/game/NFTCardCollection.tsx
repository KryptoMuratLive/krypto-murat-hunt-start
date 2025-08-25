import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sword, Shield, Brain, Zap } from "lucide-react";
import { muratCards, jaegerCards } from "@/data/nftCards";

const NFTCardCollection = () => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "sehr-selten": return "bg-gradient-to-r from-red-400 to-red-600";
      case "selten": return "bg-gradient-to-r from-orange-400 to-orange-600";
      case "haeufig": return "bg-gradient-to-r from-green-400 to-green-600";
      default: return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case "sehr-selten": return "Sehr selten";
      case "selten": return "Selten";
      case "haeufig": return "Häufig";
      default: return "Gewöhnlich";
    }
  };

  return (
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
              <div className={`absolute top-0 right-0 w-full h-1 ${getRarityColor(card.rarity)}`} />
              <CardHeader className="pb-2">
                <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg mb-2 flex items-center justify-center">
                  <Shield className="w-12 h-12 text-blue-400" />
                </div>
                <CardTitle className="text-sm text-blue-400">{card.name}</CardTitle>
                <Badge className={`text-xs ${getRarityColor(card.rarity)} text-white`}>
                  {getRarityText(card.rarity)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>Geschick: {card.skills.geschicklichkeit}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Brain className="w-3 h-3 text-purple-400" />
                  <span>Intel: {card.skills.intelligenz}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Sword className="w-3 h-3 text-red-400" />
                  <span>Stärke: {card.skills.staerke}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {card.ability}
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
          {jaegerCards.map((card) => (
            <Card key={card.id} className="comic-card relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-full h-1 ${getRarityColor(card.rarity)}`} />
              <CardHeader className="pb-2">
                <div className="aspect-square bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-lg mb-2 flex items-center justify-center">
                  <Sword className="w-12 h-12 text-red-400" />
                </div>
                <CardTitle className="text-sm text-red-400">{card.name}</CardTitle>
                <Badge className={`text-xs ${getRarityColor(card.rarity)} text-white`}>
                  {getRarityText(card.rarity)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span>Geschick: {card.skills.geschicklichkeit}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Brain className="w-3 h-3 text-purple-400" />
                  <span>Intel: {card.skills.intelligenz}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Sword className="w-3 h-3 text-red-400" />
                  <span>Stärke: {card.skills.staerke}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {card.ability}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTCardCollection;