import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Unlink, Shield, AlertTriangle } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { Badge } from "@/components/ui/badge";

export const WalletConnect = () => {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    hasRequiredNFT, 
    isCheckingNFT,
    connectWallet, 
    disconnect, 
    formatAddress 
  } = useWallet();

  if (isConnected && address) {
    return (
      <Card className="comic-card">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-4">
            <Wallet className="w-8 h-8 text-secondary" />
          </div>
          <CardTitle className="text-xl">Wallet verbunden</CardTitle>
          <CardDescription className="font-mono text-sm">
            {formatAddress}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5 text-secondary" />
            <Badge variant={hasRequiredNFT ? "default" : "destructive"}>
              {isCheckingNFT ? "Überprüfe NFT..." : hasRequiredNFT ? "NFT verifiziert" : "Kein NFT"}
            </Badge>
          </div>
          
          {hasRequiredNFT ? (
            <p className="text-center text-sm text-secondary">
              ✨ Du hast Zugang zu allen geschützten Bereichen!
            </p>
          ) : (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 text-destructive">
                <AlertTriangle className="w-4 h-4" />
                <p className="text-sm">NFT erforderlich für geschützte Bereiche</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href="/nft">NFT kaufen</a>
              </Button>
            </div>
          )}
          
          <Button 
            variant="outline" 
            onClick={() => disconnect()}
            className="w-full"
          >
            <Unlink className="w-4 h-4 mr-2" />
            Wallet trennen
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="comic-card">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
          <Wallet className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-xl">Wallet verbinden</CardTitle>
        <CardDescription>
          Verbinde deine Wallet für Zugang zu exklusiven Inhalten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={connectWallet}
          disabled={isConnecting}
          className="w-full neon-glow"
          size="lg"
        >
          {isConnecting ? (
            <>Verbinde...</>
          ) : (
            <>
              <Wallet className="w-5 h-5 mr-2" />
              Wallet verbinden
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Unterstützt MetaMask, WalletConnect, Coinbase Wallet und mehr
        </p>
      </CardContent>
    </Card>
  );
};