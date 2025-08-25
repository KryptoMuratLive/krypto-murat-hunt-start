import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { CHARACTERS } from '@/types/game';
import { Zap, Shield, Eye } from 'lucide-react';

interface CharacterHandProps {
  selectedCharacterId?: number;
  onCharacterSelect?: (characterId: number) => void;
  onUseAbility?: (characterId: number) => void;
}

const CharacterHand = ({ 
  selectedCharacterId, 
  onCharacterSelect, 
  onUseAbility 
}: CharacterHandProps) => {
  const { state, takeAction } = useGame();
  const { myDeck, isMyTurn } = state;

  const handleUseAbility = (characterId: number) => {
    const character = CHARACTERS.find(c => c.id === characterId);
    if (character) {
      takeAction('use_character_ability', { characterId, ability: character.ability });
      onUseAbility?.(characterId);
    }
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'geschwindigkeit': return '⚡';
      case 'intelligenz': return '🧠';
      case 'staerke': return '💪';
      default: return '●';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-primary" />
          <span>Deine Charaktere</span>
          <Badge variant="outline">{myDeck.length}/3</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {myDeck.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Keine Charaktere im Deck</p>
            <p className="text-xs">Wähle 3 Charaktere für dein Team</p>
          </div>
        ) : (
          myDeck.map((character) => {
            const fullCharacter = CHARACTERS.find(c => c.id === character.id) || character;
            const isSelected = selectedCharacterId === character.id;
            
            return (
              <Card 
                key={character.id}
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 ring-muted'
                }`}
                onClick={() => onCharacterSelect?.(character.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-sm">{fullCharacter.name}</h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          fullCharacter.team === 'murat' ? 'text-blue-500' : 'text-red-500'
                        }`}
                      >
                        {fullCharacter.team === 'murat' ? 'Team Murat' : 'Team Jäger'}
                      </Badge>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                    <div className="text-center">
                      <div className="text-muted-foreground">⚡ G</div>
                      <div className="font-semibold">{fullCharacter.geschwindigkeit}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">🧠 I</div>
                      <div className="font-semibold">{fullCharacter.intelligenz}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-muted-foreground">💪 S</div>
                      <div className="font-semibold">{fullCharacter.staerke}</div>
                    </div>
                  </div>

                  {/* Ability */}
                  <div className="mb-3">
                    <div className="text-xs font-medium text-accent mb-1">
                      🎯 {fullCharacter.ability}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {fullCharacter.description}
                    </p>
                  </div>

                  {/* Use Ability Button */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    disabled={!isMyTurn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUseAbility(character.id);
                    }}
                  >
                    <Zap className="w-3 h-3 mr-1" />
                    Fähigkeit nutzen
                  </Button>
                </CardContent>
              </Card>
            );
          })
        )}

        {/* Demo Deck Builder */}
        {myDeck.length < 3 && (
          <Card className="border-dashed">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Demo-Modus: Automatisches Deck
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  // Auto-fill demo deck
                  console.log('Auto-filling demo deck...');
                }}
              >
                Demo-Deck laden
              </Button>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default CharacterHand;