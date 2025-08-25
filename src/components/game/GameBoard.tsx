import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BOARD_ZONES, Zone } from '@/types/game';
import { useGame } from '@/contexts/GameContext';
import { Target, Eye, EyeOff, Lock } from 'lucide-react';

interface GameBoardProps {
  onZoneClick?: (zone: Zone) => void;
}

const GameBoard = ({ onZoneClick }: GameBoardProps) => {
  const { state } = useGame();
  const { currentMatch } = state;

  const getZoneColor = (zoneId: Zone) => {
    if (zoneId === currentMatch?.murat_position && zoneId === currentMatch?.jaeger_position) {
      return 'bg-red-500/20 border-red-500'; // Both players in same zone
    }
    if (zoneId === currentMatch?.murat_position) {
      return 'bg-blue-500/20 border-blue-500'; // Murat's position
    }
    if (zoneId === currentMatch?.jaeger_position) {
      return 'bg-red-400/20 border-red-400'; // Jäger's position
    }
    if (zoneId === 'A') {
      return 'bg-green-500/20 border-green-500'; // Start zone
    }
    if (zoneId === 'I') {
      return 'bg-yellow-500/20 border-yellow-500'; // Goal zone
    }
    return 'bg-muted border-border';
  };

  const getZoneIcon = (zoneId: Zone) => {
    if (zoneId === 'A') return <Target className="w-4 h-4 text-green-500" />;
    if (zoneId === 'I') return <Target className="w-4 h-4 text-yellow-500" />;
    if (zoneId === currentMatch?.murat_position && !currentMatch?.murat_visible) {
      return <EyeOff className="w-4 h-4 text-blue-500" />;
    }
    if (zoneId === currentMatch?.murat_position) {
      return <Eye className="w-4 h-4 text-blue-500" />;
    }
    if (zoneId === currentMatch?.jaeger_position) {
      return <Eye className="w-4 h-4 text-red-400" />;
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-foreground">Spielbrett</h3>
        <div className="flex gap-2 mt-2 text-xs">
          <Badge variant="outline" className="bg-green-500/20">
            <Target className="w-3 h-3 mr-1" />
            Start (A)
          </Badge>
          <Badge variant="outline" className="bg-yellow-500/20">
            <Target className="w-3 h-3 mr-1" />
            Ziel (I)
          </Badge>
          <Badge variant="outline" className="bg-blue-500/20">
            <Eye className="w-3 h-3 mr-1" />
            Murat
          </Badge>
          <Badge variant="outline" className="bg-red-400/20">
            <Eye className="w-3 h-3 mr-1" />
            Jäger
          </Badge>
        </div>
      </div>

      {/* 3x3 Grid Layout */}
      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
        {/* Row 1 */}
        <div /> {/* Empty */}
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'C')!} 
          color={getZoneColor('C')}
          icon={getZoneIcon('C')}
          onClick={() => onZoneClick?.('C')}
        />
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'F')!} 
          color={getZoneColor('F')}
          icon={getZoneIcon('F')}
          onClick={() => onZoneClick?.('F')}
        />

        {/* Row 2 */}
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'A')!} 
          color={getZoneColor('A')}
          icon={getZoneIcon('A')}
          onClick={() => onZoneClick?.('A')}
        />
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'B')!} 
          color={getZoneColor('B')}
          icon={getZoneIcon('B')}
          onClick={() => onZoneClick?.('B')}
        />
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'I')!} 
          color={getZoneColor('I')}
          icon={getZoneIcon('I')}
          onClick={() => onZoneClick?.('I')}
        />

        {/* Row 3 */}
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'D')!} 
          color={getZoneColor('D')}
          icon={getZoneIcon('D')}
          onClick={() => onZoneClick?.('D')}
        />
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'E')!} 
          color={getZoneColor('E')}
          icon={getZoneIcon('E')}
          onClick={() => onZoneClick?.('E')}
        />
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'H')!} 
          color={getZoneColor('H')}
          icon={getZoneIcon('H')}
          onClick={() => onZoneClick?.('H')}
        />

        {/* Row 4 */}
        <div /> {/* Empty */}
        <ZoneCard 
          zone={BOARD_ZONES.find(z => z.id === 'G')!} 
          color={getZoneColor('G')}
          icon={getZoneIcon('G')}
          onClick={() => onZoneClick?.('G')}
        />
        <div /> {/* Empty */}
      </div>

      {/* Status Info */}
      {currentMatch && (
        <div className="mt-4 text-center space-y-2">
          <div className="text-sm text-muted-foreground">
            Runde {currentMatch.current_turn} • 
            {currentMatch.murat_visible ? ' Murat sichtbar' : ' Murat versteckt'}
          </div>
          {currentMatch.murat_visible_turns > 0 && (
            <Badge variant="outline" className="text-xs">
              Murat sichtbar für {currentMatch.murat_visible_turns} Runden
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
};

const ZoneCard = ({ 
  zone, 
  color, 
  icon, 
  onClick 
}: { 
  zone: any; 
  color: string; 
  icon: React.ReactNode; 
  onClick: () => void;
}) => (
  <Card 
    className={`${color} cursor-pointer hover:opacity-80 transition-all aspect-square`}
    onClick={onClick}
  >
    <CardContent className="p-2 h-full flex flex-col items-center justify-center">
      <div className="text-lg font-bold text-foreground">{zone.id}</div>
      {icon}
      {zone.blocked && <Lock className="w-3 h-3 text-red-500 mt-1" />}
      <div className="text-xs text-center text-muted-foreground mt-1">
        {zone.name.split(' ').slice(0, 2).join(' ')}
      </div>
    </CardContent>
  </Card>
);

export default GameBoard;