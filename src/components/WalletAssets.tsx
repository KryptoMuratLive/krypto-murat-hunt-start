import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMuratToken } from "@/hooks/useMuratToken";
import { useWallet } from "@/hooks/useWallet";
import { 
  Wallet, 
  Coins, 
  Image as ImageIcon,
  ExternalLink,
  ArrowUpRight,
  TrendingUp
} from "lucide-react";

export const WalletAssets = () => {
  const { address } = useWallet();
  const { muratBalance, usdtBalance, maticBalance, tokenPrice } = useMuratToken();

  const formatBalance = (balance: string, decimals: number = 6) => {
    const num = parseFloat(balance);
    return num.toLocaleString('de-DE', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals 
    });
  };

  const calculateUSDValue = (balance: string, price: number) => {
    const value = parseFloat(balance) * price;
    return value.toLocaleString('de-DE', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2 
    });
  };

  // Mock NFT data - in real app, this would come from blockchain
  const nfts = [
    {
      id: 1,
      name: "Bitcoin Hunter #001",
      collection: "KryptoMurat Cards",
      image: "/lovable-uploads/1945b2dd-4535-4341-8070-a9c7428358a3.png",
      rarity: "Legendary"
    },
    {
      id: 2,
      name: "MURAT Access Pass",
      collection: "Platform Access",
      image: "/lovable-uploads/1945b2dd-4535-4341-8070-a9c7428358a3.png",
      rarity: "Exclusive"
    }
  ];

  if (!address) {
    return (
      <Card className="comic-card">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Wallet className="w-12 h-12 text-muted-foreground mx-auto" />
            <p className="text-muted-foreground">Verbinde dein Wallet um deine Assets zu sehen</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Token Balances */}
      <Card className="comic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-primary" />
            Meine Token
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* MURAT Token */}
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="font-bold text-primary">M</span>
              </div>
              <div>
                <h3 className="font-semibold">MURAT</h3>
                <p className="text-sm text-muted-foreground">KryptoMurat Token</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{formatBalance(muratBalance, 2)}</p>
              <p className="text-sm text-muted-foreground">
                {calculateUSDValue(muratBalance, tokenPrice)}
              </p>
            </div>
          </div>

          {/* USDT */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="font-bold text-green-600">$</span>
              </div>
              <div>
                <h3 className="font-semibold">USDT</h3>
                <p className="text-sm text-muted-foreground">Tether USD</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{formatBalance(usdtBalance, 2)}</p>
              <p className="text-sm text-muted-foreground">
                {calculateUSDValue(usdtBalance, 1)}
              </p>
            </div>
          </div>

          {/* MATIC */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600">⬟</span>
              </div>
              <div>
                <h3 className="font-semibold">MATIC</h3>
                <p className="text-sm text-muted-foreground">Polygon</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg">{formatBalance(maticBalance, 2)}</p>
              <p className="text-sm text-muted-foreground">
                {calculateUSDValue(maticBalance, 0.45)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4">
            <Button 
              onClick={() => window.open('https://dapp.quickswap.exchange/swap/best/ETH/0x75B670775bCd4198eB0b030Fd22c7AafF8d8C266?chainId=137', '_blank')}
              className="flex-1"
              variant="default"
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />
              MURAT kaufen
            </Button>
            <Button 
              onClick={() => window.open(`https://polygonscan.com/address/${address}`, '_blank')}
              variant="outline"
              className="flex-1"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Auf Polygonscan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* NFT Collection */}
      <Card className="comic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-primary" />
            Meine NFTs
            <Badge variant="secondary">{nfts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {nfts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nfts.map((nft) => (
                <div key={nft.id} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground">{nft.collection}</p>
                    <Badge variant="outline" className="text-xs">
                      {nft.rarity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Noch keine NFTs vorhanden</p>
              <p className="text-sm text-muted-foreground mt-2">
                Kaufe MURAT Token um Zugang zu exklusiven NFTs zu erhalten
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Portfolio Value */}
      <Card className="comic-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Portfolio Übersicht
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-6 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Gesamtwert</p>
              <p className="text-3xl font-bold text-primary">
                {calculateUSDValue(
                  (parseFloat(muratBalance) * tokenPrice + 
                   parseFloat(usdtBalance) * 1 + 
                   parseFloat(maticBalance) * 0.45).toString(),
                  1
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">MURAT Anteil</p>
                <p className="font-bold text-lg text-primary">
                  {((parseFloat(muratBalance) * tokenPrice) / 
                    (parseFloat(muratBalance) * tokenPrice + parseFloat(usdtBalance) + parseFloat(maticBalance) * 0.45) * 100
                  ).toFixed(1)}%
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">NFTs</p>
                <p className="font-bold text-lg">{nfts.length} Stück</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};