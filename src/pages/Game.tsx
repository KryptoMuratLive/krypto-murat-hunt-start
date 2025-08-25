
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { ArrowLeft, Timer, Play } from "lucide-react";
import { GameProvider, useGame } from "@/contexts/GameContext";
import { TeamType, Zone } from "@/types/game";
import GameLobby from "@/components/game/GameLobby";
import GameBoard from "@/components/game/GameBoard";
import GameHUD from "@/components/game/GameHUD";
import CharacterHand from "@/components/game/CharacterHand";
import ActionCards from "@/components/game/ActionCards";

const GameContent = () => {
  const { state, takeAction } = useGame();
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const { currentMatch } = state;

  console.log('GameContent rendering, state:', state);
  console.log('Current match:', currentMatch);

  const handleZoneClick = (zone: Zone) => {
    console.log('🎯 Zone clicked:', zone, 'My turn:', state.isMyTurn);
    if (state.isMyTurn && currentMatch) {
      takeAction('move', { toZone: zone });
    }
  };

  const handleUseActionCard = (cardId: string) => {
    console.log(`Using action card: ${cardId}`);
    takeAction('use_action_card', { cardId });
  };

  const handleCharacterSelect = (characterId: number) => {
    setSelectedCharacter(characterId);
  };

  const handleUseAbility = (characterId: number) => {
    console.log(`Using character ability: ${characterId}`);
  };

  // Show lobby if no active match
  if (!currentMatch || currentMatch.status === 'waiting') {
    return <GameLobby />;
  }

  // Show active game
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left Column - Game Board */}
      <div className="lg:col-span-2 space-y-6">
        <GameBoard onZoneClick={handleZoneClick} />
        
        {/* Character Hand */}
        <CharacterHand
          selectedCharacterId={selectedCharacter}
          onCharacterSelect={handleCharacterSelect}
          onUseAbility={handleUseAbility}
        />

        {/* Action Cards */}
        <ActionCards 
          selectedTeam={state.players.find(p => p.wallet_address === 'demo')?.team || null}
          onUseCard={handleUseActionCard}
        />
      </div>

      {/* Right Column - Game HUD */}
      <div className="space-y-6">
        <GameHUD />
      </div>
    </div>
  );
};

const Game = () => {
  console.log('Game component rendering');
  
  return (
    <GameProvider>
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
              KryptoMurat – Jagd auf den Bitcoin
            </h1>
            
            <div className="mb-6">
              <p className="text-xl text-muted-foreground mb-2">
                Rundenbasierte Strategie • Team Murat vs. Team Jäger
              </p>
              <p className="text-lg text-accent">
                Erreiche als Murat das Ziel oder fang ihn als Jäger ab!
              </p>
            </div>
          </div>

          <GameContent />
        </div>
      </div>
    </GameProvider>
  );
};

export default Game;
