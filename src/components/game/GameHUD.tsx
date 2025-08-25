import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGame } from '@/contexts/GameContext';
import { Clock, Play, Pause, User, Target } from 'lucide-react';

const GameHUD = () => {
  const { state, forfeitMatch } = useGame();
  const { currentMatch, players, turnTimeLeft, isMyTurn, gameLog } = state;

  const myPlayer = players.find(p => p.wallet_address === 'demo'); // Demo mode
  const opponent = players.find(p => p.wallet_address !== 'demo');

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Turn Timer & Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>Runde {currentMatch?.current_turn || 1}</span>
            </div>
            <Badge variant={isMyTurn ? "default" : "secondary"}>
              {isMyTurn ? "Dein Zug" : "Gegner am Zug"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Zugzeit:</span>
            <span className="font-mono text-lg">
              {formatTime(turnTimeLeft)}
            </span>
          </div>
          <Progress 
            value={(turnTimeLeft / 60) * 100} 
            className="h-2"
          />
          {isMyTurn && turnTimeLeft <= 10 && (
            <div className="text-red-500 text-sm font-medium animate-pulse">
              ⚠️ Zeit läuft ab!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Player Status */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Spieler Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Badge className={myPlayer?.team === 'murat' ? 'bg-blue-500' : 'bg-red-500'}>
                Du ({myPlayer?.team === 'murat' ? 'Murat' : 'Jäger'})
              </Badge>
              {myPlayer?.ready && <span className="text-green-500">✓</span>}
            </div>
            <div className="text-sm text-muted-foreground">
              Deck: {myPlayer?.deck.length || 0}/3
            </div>
          </div>

          {opponent && (
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Badge className={opponent.team === 'murat' ? 'bg-blue-500' : 'bg-red-500'}>
                  Gegner ({opponent.team === 'murat' ? 'Murat' : 'Jäger'})
                </Badge>
                {opponent.ready && <span className="text-green-500">✓</span>}
              </div>
              <div className="text-sm text-muted-foreground">
                Deck: {opponent.deck.length}/3
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Game Objectives */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Ziele</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500">🛡️</span>
            <span><strong>Team Murat:</strong> Erreiche Zone I</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-red-500">⚔️</span>
            <span><strong>Team Jäger:</strong> Erreiche Murats Zone</span>
          </div>
          <div className="mt-3 p-2 bg-muted/50 rounded">
            <strong>Aktuelle Positionen:</strong>
            <div className="mt-1 space-y-1">
              <div>Murat: Zone {currentMatch?.murat_position}</div>
              <div>Jäger: Zone {currentMatch?.jaeger_position}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Log */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Spielprotokoll</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-40 px-4">
            {gameLog.length === 0 ? (
              <div className="text-sm text-muted-foreground p-4 text-center">
                Noch keine Aktionen...
              </div>
            ) : (
              <div className="space-y-2 pb-4">
                {gameLog.map((entry, index) => (
                  <div key={index} className="text-xs border-l-2 border-primary/20 pl-3 py-1">
                    <div className="font-medium">Runde {entry.turn}</div>
                    <div className="text-muted-foreground">
                      {entry.player}: {entry.action}
                    </div>
                    {entry.details && (
                      <div className="text-muted-foreground/80">
                        {entry.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Game Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={forfeitMatch}
            >
              Spiel aufgeben
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameHUD;