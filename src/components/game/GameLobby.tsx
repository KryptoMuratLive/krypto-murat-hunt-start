import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { TeamType, DEMO_DECKS, CHARACTERS } from '@/types/game';
import TeamSelection from './TeamSelection';
import { Users, Timer, Play, Bot, Shield, Zap } from 'lucide-react';

interface GameLobbyProps {
  onStartDemo?: (team: TeamType) => void;
}

const GameLobby = ({ onStartDemo }: GameLobbyProps) => {
  console.log('GameLobby rendering');
  const { createMatch, startDemo, loading, state } = useGame();
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
  const [selectedDeck, setSelectedDeck] = useState<number[]>([]);
  const [searchingMatch, setSearchingMatch] = useState(false);
  const [matchTimer, setMatchTimer] = useState(60);

  const handleQuickMatch = async () => {
    if (!selectedTeam) return;
    
    setSearchingMatch(true);
    try {
      const deck = DEMO_DECKS[selectedTeam];
      await createMatch(selectedTeam, deck);
      
      // Simulate matchmaking timer
      const timer = setInterval(() => {
        setMatchTimer(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setSearchingMatch(false);
            // Auto-start vs bot
            console.log('Starting vs bot...');
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimeout(() => {
        clearInterval(timer);
        setSearchingMatch(false);
        setMatchTimer(60);
      }, 5000); // Demo: find match after 5s
      
    } catch (error) {
      console.error('Error in quick match:', error);
      setSearchingMatch(false);
      setMatchTimer(60);
    }
  };

  const handleStartDemo = () => {
    if (!selectedTeam) return;
    const deck = selectedDeck.length === 3 ? selectedDeck : DEMO_DECKS[selectedTeam];
    startDemo(selectedTeam, deck);
    onStartDemo?.(selectedTeam);
  };

  const handleTeamSelect = (team: TeamType) => {
    setSelectedTeam(team);
    // Auto-load demo deck for this team
    setSelectedDeck(DEMO_DECKS[team]);
  };

  if (searchingMatch) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Users className="w-6 h-6 animate-pulse" />
            <span>Suche Gegenspieler...</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold">
              {Math.floor(matchTimer / 60)}:{(matchTimer % 60).toString().padStart(2, '0')}
            </div>
            <p className="text-sm text-muted-foreground">
              Verbleibende Zeit bis Bot-Match
            </p>
          </div>
          
          <Progress value={((60 - matchTimer) / 60) * 100} className="h-2" />
          
          <div className="text-center space-y-2">
            <Badge variant="outline" className="bg-blue-500/20">
              Team {selectedTeam === 'murat' ? 'Murat' : 'Jäger'}
            </Badge>
            <p className="text-xs text-muted-foreground">
              Suche nach {selectedTeam === 'murat' ? 'Jäger' : 'Murat'}-Spieler...
            </p>
          </div>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setSearchingMatch(false);
              setMatchTimer(60);
            }}
          >
            Suche abbrechen
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Lobby Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Game Lobby</CardTitle>
          <p className="text-muted-foreground">
            Wähle dein Team und starte das Spiel
          </p>
        </CardHeader>
      </Card>

      {/* Team Selection */}
      <TeamSelection
        selectedTeam={selectedTeam}
        onTeamSelection={handleTeamSelect}
      />

      {/* Character Deck Selection */}
      {selectedTeam && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Wähle dein Deck (3 Charaktere)</span>
              <Badge variant="outline">{selectedDeck.length}/3</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CharacterDeckBuilder 
              team={selectedTeam}
              selectedDeck={selectedDeck}
              onDeckChange={setSelectedDeck}
            />
          </CardContent>
        </Card>
      )}

      {/* Game Modes */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Quick Match */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Quick Match</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 mb-2">
                <Timer className="w-4 h-4" />
                <span>60s Suche, dann vs Bot</span>
              </div>
              <div>• Ranglisten-Match</div>
              <div>• NFT-Verifizierung erforderlich</div>
              <div>• Beste Gegner</div>
            </div>
            
            <Button
              className="w-full"
              disabled={!selectedTeam || loading}
              onClick={handleQuickMatch}
            >
              <Play className="w-4 h-4 mr-2" />
              {loading ? 'Suche...' : 'Quick Match starten'}
            </Button>
          </CardContent>
        </Card>

        {/* Demo Mode */}
        <Card className="border-green-500/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-green-500" />
              <span>Demo Modus</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 mb-2 text-green-500">
                <Play className="w-4 h-4" />
                <span>Sofort spielbar</span>
              </div>
              <div>• Kein Wallet erforderlich</div>
              <div>• Lerne die Mechaniken</div>
              <div>• Lokaler Bot-Gegner</div>
            </div>
            
            <Button
              variant="outline"
              className="w-full border-green-500/50 hover:bg-green-500/10"
              disabled={!selectedTeam}
              onClick={handleStartDemo}
            >
              <Bot className="w-4 h-4 mr-2" />
              Demo starten
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Game Rules */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Spielregeln</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-blue-500 mb-2">🛡️ Team Murat</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Startposition: Zone A</li>
                <li>• Ziel: Erreiche Zone I</li>
                <li>• Strategie: Verstecken & Ausweichen</li>
                <li>• Spezial: Täuschungsmanöver</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-500 mb-2">⚔️ Team Jäger</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Startposition: Zone E</li>
                <li>• Ziel: Erreiche Murats Zone</li>
                <li>• Strategie: Verfolgen & Blockieren</li>
                <li>• Spezial: Überwachung</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <h4 className="font-semibold mb-2">⏱️ Rundenbasiert</h4>
            <div className="text-muted-foreground">
              • 60 Sekunden pro Zug • 1 Bewegung + 1 Aktion • Charakterfähigkeiten + Aktionskarten
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Character Deck Builder Component
const CharacterDeckBuilder = ({ 
  team, 
  selectedDeck, 
  onDeckChange 
}: { 
  team: TeamType; 
  selectedDeck: number[]; 
  onDeckChange: (deck: number[]) => void; 
}) => {
  const availableCharacters = CHARACTERS.filter(c => c.team === team);

  const toggleCharacter = (characterId: number) => {
    if (selectedDeck.includes(characterId)) {
      onDeckChange(selectedDeck.filter(id => id !== characterId));
    } else if (selectedDeck.length < 3) {
      onDeckChange([...selectedDeck, characterId]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {availableCharacters.map(character => {
          const isSelected = selectedDeck.includes(character.id);
          const canSelect = selectedDeck.length < 3 || isSelected;
          
          return (
            <Card 
              key={character.id}
              className={`cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-primary bg-primary/5' : 
                canSelect ? 'hover:ring-1 ring-muted hover:bg-muted/5' : 
                'opacity-50 cursor-not-allowed'
              }`}
              onClick={() => canSelect && toggleCharacter(character.id)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-sm">{character.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        character.team === 'murat' ? 'text-blue-500' : 'text-red-500'
                      }`}
                    >
                      {character.team === 'murat' ? 'Team Murat' : 'Team Jäger'}
                    </Badge>
                  </div>
                  {isSelected && (
                    <Badge className="bg-green-500 text-white text-xs">
                      ✓ Gewählt
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-2 text-xs">
                  <div className="text-center">
                    <div className="text-muted-foreground">⚡ G</div>
                    <div className="font-semibold">{character.geschwindigkeit}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">🧠 I</div>
                    <div className="font-semibold">{character.intelligenz}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-muted-foreground">💪 S</div>
                    <div className="font-semibold">{character.staerke}</div>
                  </div>
                </div>

                {/* Ability */}
                <div className="space-y-1">
                  <div className="text-xs font-medium text-accent">
                    <Zap className="w-3 h-3 inline mr-1" />
                    {character.ability}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {character.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {selectedDeck.length === 3 && (
        <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <div className="text-green-600 font-medium text-sm">
            ✅ Deck vollständig! Bereit zum Spielen.
          </div>
        </div>
      )}
      
      {selectedDeck.length === 0 && (
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-muted-foreground text-sm">
            Wähle 3 Charaktere für dein Deck
          </div>
        </div>
      )}
    </div>
  );
};

export default GameLobby;