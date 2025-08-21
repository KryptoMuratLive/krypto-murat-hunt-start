import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wallet, Unlink, Shield, Crown, Zap } from "lucide-react";
import { useWallet, AccessLevel } from "@/hooks/useWallet";
import { useState } from "react";

const getAccessIcon = (level: AccessLevel) => {
  switch (level) {
    case 'jaeger': return <Zap className="w-4 h-4" />;
    case 'premium': return <Crown className="w-4 h-4" />;
    case 'standard': return <Shield className="w-4 h-4" />;
    default: return <Shield className="w-4 h-4 opacity-50" />;
  }
};

export const WalletWidget = () => {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    accessLevel,
    hasAnyNFT,
    isCheckingNFT,
    connectWallet, 
    disconnect, 
    formatAddress,
    getAccessLevelLabel,
    getAccessLevelColor
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
        {hasAnyNFT && (
          <Badge variant="secondary" className="ml-2 text-xs flex items-center space-x-1">
            {getAccessIcon(accessLevel)}
            <span className="ml-1">NFT</span>
          </Badge>
        )}
      </Button>
      
      {showDetails && (
        <Card className="absolute right-0 top-full mt-2 w-80 z-50 comic-card">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Wallet verbunden</p>
                <p className="text-xs text-muted-foreground font-mono">{address}</p>
              </div>
              {getAccessIcon(accessLevel)}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Zugangsebene:</span>
                <Badge 
                  variant={hasAnyNFT ? "default" : "destructive"}
                  className={`${getAccessLevelColor(accessLevel)} text-xs`}
                >
                  {isCheckingNFT ? "Überprüfe..." : getAccessLevelLabel(accessLevel)}
                </Badge>
              </div>
              
              {hasAnyNFT && (
                <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                  <div className="flex items-center space-x-2">
                    {getAccessIcon(accessLevel)}
                    <span>
                      {accessLevel === 'jaeger' && 'Vollzugang zu allen Bereichen'}
                      {accessLevel === 'premium' && 'Zugang zu Premium-Features'}
                      {accessLevel === 'standard' && 'Zugang zu Standard-Features'}
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            {!hasAnyNFT && (
              <p className="text-xs text-muted-foreground">
                Kaufe ein NFT für Zugang zu geschützten Bereichen
              </p>
            )}
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  disconnect();
                  setShowDetails(false);
                }}
                className="flex-1"
              >
                <Unlink className="w-3 h-3 mr-1" />
                Trennen
              </Button>
              {!hasAnyNFT && (
                <Button size="sm" variant="secondary" asChild className="flex-1">
                  <a href="/nft">NFTs ansehen</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};