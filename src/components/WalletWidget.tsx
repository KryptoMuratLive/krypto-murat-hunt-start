import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Unlink, Shield } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useState } from "react";

export const WalletWidget = () => {
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
  
  const [showDetails, setShowDetails] = useState(false);

  if (!isConnected) {
    return (
      <Button 
        onClick={connectWallet}
        disabled={isConnecting}
        variant="outline"
        size="sm"
        className="relative"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {isConnecting ? "Verbinde..." : "Wallet"}
      </Button>
    );
  }

  return (
    <div className="relative">
      <Button 
        variant="outline"
        size="sm"
        onClick={() => setShowDetails(!showDetails)}
        className="relative"
      >
        <Wallet className="w-4 h-4 mr-2" />
        {formatAddress}
        {hasRequiredNFT && (
          <Badge variant="secondary" className="ml-2 text-xs">
            NFT ✓
          </Badge>
        )}
      </Button>
      
      {showDetails && (
        <Card className="absolute right-0 top-full mt-2 w-80 z-50 comic-card">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Wallet verbunden</p>
                <p className="text-xs text-muted-foreground font-mono">{address}</p>
              </div>
              <Shield className={`w-5 h-5 ${hasRequiredNFT ? 'text-secondary' : 'text-muted-foreground'}`} />
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant={hasRequiredNFT ? "default" : "destructive"}>
                {isCheckingNFT ? "Überprüfe..." : hasRequiredNFT ? "NFT verifiziert" : "Kein NFT"}
              </Badge>
            </div>
            
            {!hasRequiredNFT && (
              <p className="text-xs text-muted-foreground">
                Kaufe ein NFT für Zugang zu geschützten Bereichen
              </p>
            )}
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => disconnect()}
                className="flex-1"
              >
                <Unlink className="w-3 h-3 mr-1" />
                Trennen
              </Button>
              {!hasRequiredNFT && (
                <Button size="sm" variant="secondary" asChild className="flex-1">
                  <a href="/nft">NFT kaufen</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};