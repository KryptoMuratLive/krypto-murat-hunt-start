import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useGame } from '@/contexts/GameContext';
import { TeamType, DEMO_DECKS } from '@/types/game';
import TeamSelection from './TeamSelection';
import { Users, Timer, Play, Bot } from 'lucide-react';

interface GameLobbyProps {
  onStartDemo?: (team: TeamType) => void;
}

const GameLobby = ({ onStartDemo }: GameLobbyProps) => {
  const { createMatch, startDemo, loading, state } = useGame();
  const [selectedTeam, setSelectedTeam] = useState<TeamType | null>(null);
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
    startDemo(selectedTeam);
    onStartDemo?.(selectedTeam);
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
        onTeamSelection={setSelectedTeam}
      />

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

export default GameLobby;