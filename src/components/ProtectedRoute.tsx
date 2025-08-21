import { ReactNode } from 'react';
import { useWallet } from '@/hooks/useWallet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WalletConnect } from '@/components/WalletConnect';
import { Shield, Lock, Coins } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requireNFT?: boolean;
}

export const ProtectedRoute = ({ children, requireNFT = true }: ProtectedRouteProps) => {
  const { isConnected, hasRequiredNFT, isCheckingNFT } = useWallet();

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

  // Show NFT requirement if needed
  if (requireNFT && !hasRequiredNFT && !isCheckingNFT) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <Card className="comic-card">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-10 h-10 text-destructive" />
              </div>
              <CardTitle className="text-2xl">NFT erforderlich</CardTitle>
              <CardDescription>
                Du benötigst ein NFT, um diesen Bereich zu betreten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg text-center">
                <Coins className="w-8 h-8 mx-auto mb-2 text-accent" />
                <p className="text-sm font-medium">KryptoMurat NFT Collection</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sichere dir Zugang zu exklusiven Inhalten
                </p>
              </div>
              
              <div className="space-y-3">
                <Link to="/nft" className="w-full">
                  <Button className="w-full neon-glow">
                    <Coins className="w-4 h-4 mr-2" />
                    NFT kaufen
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
          
          <div className="text-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    );
  }

  // Show loading while checking NFT
  if (requireNFT && isCheckingNFT) {
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

  // Render protected content
  return <>{children}</>;
};