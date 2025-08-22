import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMuratToken, MURAT_TOKEN } from "@/hooks/useMuratToken";
import { useAccount, useSwitchChain } from "wagmi";
import { polygon } from "wagmi/chains";
import { 
  Coins, 
  TrendingUp, 
  Users, 
  Droplets, 
  ExternalLink,
  AlertTriangle,
  Wallet,
  ArrowUpDown
} from "lucide-react";
import { useState } from "react";
import { TokenTrading } from "./TokenTrading";

export const TokenDashboard = () => {
  const { isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const [showTrading, setShowTrading] = useState(false);
  
  const {
    muratBalance,
    tokenInfo,
    isLoadingInfo,
    isLoadingBalance,
    hasMinimumTokens,
    isCorrectChain,
    refreshTokenInfo
  } = useMuratToken();

  const handleSwitchToPolygon = () => {
    switchChain({ chainId: polygon.id });
  };

  if (!isConnected) {
    return (
      <Card className="comic-card p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <Wallet className="w-16 h-16 text-muted-foreground" />
          <h3 className="text-xl font-bold">Wallet nicht verbunden</h3>
          <p className="text-muted-foreground">
            Verbinde dein Wallet, um MURAT Token Informationen zu sehen
          </p>
        </div>
      </Card>
    );
  }

  if (!isCorrectChain) {
    return (
      <Card className="comic-card p-8 text-center border-destructive">
        <div className="flex flex-col items-center space-y-4">
          <AlertTriangle className="w-16 h-16 text-destructive" />
          <h3 className="text-xl font-bold text-destructive">Falsches Netzwerk</h3>
          <p className="text-muted-foreground">
            Wechsle zu Polygon, um MURAT Token zu verwenden
          </p>
          <Button onClick={handleSwitchToPolygon} variant="destructive">
            Zu Polygon wechseln
          </Button>
        </div>
      </Card>
    );
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(2)}K`;
    return num.toFixed(2);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header Card with Balance */}
      <Card className="comic-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Coins className="w-8 h-8 text-primary" />
              MURAT Token
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              {MURAT_TOKEN.address}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              {isLoadingBalance ? (
                <Skeleton className="w-24 h-8" />
              ) : (
                `${parseFloat(muratBalance).toLocaleString('de-DE')} MURAT`
              )}
            </div>
            {hasMinimumTokens() && (
              <Badge variant="secondary" className="mt-2">
                ✅ Token-Zugang aktiv
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={() => setShowTrading(!showTrading)}
              className="flex-1"
              variant={showTrading ? "secondary" : "default"}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {showTrading ? "Trading schließen" : "Handeln"}
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open(`https://polygonscan.com/token/${MURAT_TOKEN.address}`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Polygonscan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trading Component (conditional) */}
      {showTrading && <TokenTrading />}

      {/* Token Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Price */}
        <Card className="comic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preis</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingInfo ? (
                <Skeleton className="w-16 h-6" />
              ) : tokenInfo ? (
                formatCurrency(tokenInfo.price)
              ) : (
                "--"
              )}
            </div>
            {tokenInfo && (
              <p className={`text-xs ${tokenInfo.priceChange24h >= 0 ? 'text-secondary' : 'text-destructive'}`}>
                {tokenInfo.priceChange24h >= 0 ? '+' : ''}
                {tokenInfo.priceChange24h.toFixed(2)}% (24h)
              </p>
            )}
          </CardContent>
        </Card>

        {/* Market Cap */}
        <Card className="comic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Marktkapitalisierung</CardTitle>
            <Coins className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingInfo ? (
                <Skeleton className="w-20 h-6" />
              ) : tokenInfo ? (
                `$${formatNumber(tokenInfo.marketCap)}`
              ) : (
                "--"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Total Supply: {parseInt(MURAT_TOKEN.supply).toLocaleString('de-DE')}
            </p>
          </CardContent>
        </Card>

        {/* Holders */}
        <Card className="comic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Holder</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingInfo ? (
                <Skeleton className="w-16 h-6" />
              ) : tokenInfo ? (
                tokenInfo.holders.toLocaleString('de-DE')
              ) : (
                "--"
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Eindeutige Wallets
            </p>
          </CardContent>
        </Card>

        {/* Liquidity */}
        <Card className="comic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Liquidität</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoadingInfo ? (
                <Skeleton className="w-20 h-6" />
              ) : tokenInfo ? (
                `$${formatNumber(tokenInfo.liquidityUSD)}`
              ) : (
                "--"
              )}
            </div>
            <Button 
              variant="link" 
              className="p-0 h-auto text-xs"
              onClick={() => window.open('https://quickswap.exchange/#/pools', '_blank')}
            >
              QuickSwap Pool <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Risk Warning */}
      <Card className="comic-card border-orange-500/50 bg-orange-500/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-orange-500 mb-1">Risiko-Hinweis</p>
              <p className="text-orange-200">
                Der Handel mit Kryptowährungen ist hochriskant. Investiere nur, was du dir leisten kannst zu verlieren. 
                Diese Plattform stellt keine Finanzberatung dar.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};