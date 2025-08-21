import { ReactNode } from 'react';
import { useWallet, AccessLevel } from '@/hooks/useWallet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WalletConnect } from '@/components/WalletConnect';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Coins, Crown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredAccessLevel?: AccessLevel;
  allowedLevels?: AccessLevel[];
}

const getAccessIcon = (level: AccessLevel) => {
  switch (level) {
    case 'jaeger': return <Zap className="w-6 h-6" />;
    case 'premium': return <Crown className="w-6 h-6" />;
    case 'standard': return <Shield className="w-6 h-6" />;
    default: return <Lock className="w-6 h-6" />;
  }
};

const getAccessDescription = (level: AccessLevel): string => {
  switch (level) {
    case 'jaeger': 
      return 'Höchste Zugangsebene mit exklusiven Jäger-Features und Live-Streams';
    case 'premium': 
      return 'Premium-Zugang mit erweiterten Features und frühem Content-Zugang';
    case 'standard': 
      return 'Standard-Zugang zu grundlegenden Features der Serie und dem Spiel';
    default: 
      return 'Kein NFT-Zugang vorhanden';
  }
};

export const ProtectedRoute = ({ 
  children, 
  requiredAccessLevel = 'standard',
  allowedLevels 
}: ProtectedRouteProps) => {
  const { 
    isConnected, 
    accessLevel, 
    isCheckingNFT, 
    getAccessLevelLabel,
    getAccessLevelColor 
  } = useWallet();

  // Determine if access is granted
  const hasAccess = () => {
    if (allowedLevels) {
      return allowedLevels.includes(accessLevel);
    }
    
    // Check hierarchy: jaeger > premium > standard > none
    const levels: AccessLevel[] = ['none', 'standard', 'premium', 'jaeger'];
    const userLevelIndex = levels.indexOf(accessLevel);
    const requiredLevelIndex = levels.indexOf(requiredAccessLevel);
    
    return userLevelIndex >= requiredLevelIndex;
  };

  // Show wallet connection if not connected
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Geschützter Bereich</h1>
            <p className="text-muted-foreground">
              Verbinde deine Wallet, um fortzufahren
            </p>
          </div>
          
          <WalletConnect />
          
          <div className="text-center">
            <Link to="/">
              <Button variant="ghost">← Zurück zur Startseite</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking NFT
  if (isCheckingNFT) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <p className="text-lg font-medium">Überprüfe NFT-Berechtigung...</p>
        </div>
      </div>
    );
  }

  // Show access denied if insufficient NFT level
  if (!hasAccess()) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-lg w-full space-y-8">
          <Card className="comic-card">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-4">
                {getAccessIcon(requiredAccessLevel)}
              </div>
              <CardTitle className="text-2xl">NFT erforderlich</CardTitle>
              <CardDescription>
                Du benötigst ein NFT, um diesen Bereich zu betreten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Access Level */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Dein aktueller Zugang:</p>
                <Badge 
                  variant={accessLevel === 'none' ? 'destructive' : 'default'}
                  className={`${getAccessLevelColor(accessLevel)} font-medium`}
                >
                  {getAccessLevelLabel(accessLevel)}
                </Badge>
              </div>

              {/* Required Access Level */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Erforderlicher Zugang:</p>
                <Badge 
                  variant="outline"
                  className={`${getAccessLevelColor(requiredAccessLevel)} font-medium border-current`}
                >
                  {getAccessLevelLabel(requiredAccessLevel)}
                </Badge>
                <p className="text-xs text-muted-foreground mt-2">
                  {getAccessDescription(requiredAccessLevel)}
                </p>
              </div>

              {/* NFT Options */}
              <div className="space-y-3 border-t pt-4">
                <h4 className="font-medium text-center">Verfügbare NFTs:</h4>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Jäger NFT</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Höchster Zugang</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <Crown className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Premium NFT</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Premium Zugang</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-medium">Standard NFT</span>
                    </div>
                    <Badge variant="outline" className="text-xs">Basis Zugang</Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Link to="/nft" className="w-full">
                  <Button className="w-full neon-glow">
                    <Coins className="w-4 h-4 mr-2" />
                    NFT Collection ansehen
                  </Button>
                </Link>
                
                <Link to="/" className="w-full">
                  <Button variant="outline" className="w-full">
                    ← Zurück zur Startseite
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Render protected content
  return <>{children}</>;
};