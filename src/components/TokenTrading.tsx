import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useMuratToken } from "@/hooks/useMuratToken";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowUpDown, 
  Settings, 
  AlertTriangle,
  Loader2,
  CheckCircle,
  ExternalLink
} from "lucide-react";
import { formatUnits, parseUnits } from "viem";

export const TokenTrading = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("buy");
  const [slippage, setSlippage] = useState([0.5]);
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  
  const {
    muratBalance,
    usdtBalance,
    muratAllowance,
    usdtAllowance,
    approveMurat,
    approveUSDT,
    isPending,
    isConfirming,
    isConfirmed,
    hash
  } = useMuratToken();

  const handleBuy = async () => {
    if (!buyAmount || parseFloat(buyAmount) <= 0) {
      toast({
        title: "Ungültiger Betrag",
        description: "Bitte gib einen gültigen USDT-Betrag ein.",
        variant: "destructive",
      });
      return;
    }

    // Check USDT allowance first
    const amountWei = parseUnits(buyAmount, 6); // USDT has 6 decimals
    
    if (!usdtAllowance || usdtAllowance < amountWei) {
      toast({
        title: "Genehmigung erforderlich",
        description: "Genehmige USDT für den Handel.",
      });
      await approveUSDT(buyAmount);
      return;
    }

    // Here you would implement the actual swap via QuickSwap
    toast({
      title: "Kauf-Feature",
      description: "QuickSwap Integration wird implementiert.",
    });
  };

  const handleSell = async () => {
    if (!sellAmount || parseFloat(sellAmount) <= 0) {
      toast({
        title: "Ungültiger Betrag",
        description: "Bitte gib einen gültigen MURAT-Betrag ein.",
        variant: "destructive",
      });
      return;
    }

    // Check MURAT allowance first
    const amountWei = parseUnits(sellAmount, 18);
    
    if (!muratAllowance || muratAllowance < amountWei) {
      toast({
        title: "Genehmigung erforderlich",
        description: "Genehmige MURAT für den Handel.",
      });
      await approveMurat(sellAmount);
      return;
    }

    // Here you would implement the actual swap via QuickSwap
    toast({
      title: "Verkauf-Feature",
      description: "QuickSwap Integration wird implementiert.",
    });
  };

  const setMaxBuy = () => {
    setBuyAmount(usdtBalance);
  };

  const setMaxSell = () => {
    setSellAmount(muratBalance);
  };

  const formatBalance = (balance: string, symbol: string) => {
    const num = parseFloat(balance);
    return `${num.toLocaleString('de-DE', { maximumFractionDigits: 6 })} ${symbol}`;
  };

  return (
    <Card className="comic-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5 text-primary" />
          MURAT kaufen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Slippage Settings */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Slippage Toleranz</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32">
              <Slider
                value={slippage}
                onValueChange={setSlippage}
                max={5}
                min={0.1}
                step={0.1}
                className="w-full"
              />
            </div>
            <Badge variant="outline">{slippage[0]}%</Badge>
          </div>
        </div>

        {/* QuickSwap Integration */}
        <div className="space-y-4">
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Direkt auf QuickSwap kaufen
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tausche ETH, MATIC oder andere Token direkt gegen MURAT auf QuickSwap DEX.
            </p>
            <Button 
              onClick={() => window.open('https://dapp.quickswap.exchange/swap/best/ETH/0x75B670775bCd4198eB0b030Fd22c7AafF8d8C266?chainId=137', '_blank')}
              className="w-full text-lg py-6"
              variant="default"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Auf QuickSwap kaufen
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">oder</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="buy-amount">USDT Betrag (experimentell)</Label>
                <button 
                  onClick={setMaxBuy}
                  className="text-xs text-primary hover:underline"
                >
                  Max: {formatBalance(usdtBalance, "USDT")}
                </button>
              </div>
              <Input
                id="buy-amount"
                type="number"
                placeholder="0.00"
                value={buyAmount}
                onChange={(e) => setBuyAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            {buyAmount && (
              <div className="p-3 bg-secondary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">Du erhältst ungefähr:</p>
                <p className="text-lg font-bold text-secondary">
                  ~{(parseFloat(buyAmount) * 10000).toLocaleString('de-DE')} MURAT
                </p>
                <p className="text-xs text-muted-foreground">
                  Geschätzter Preis (abhängig von Liquidität)
                </p>
              </div>
            )}

            <Button 
              onClick={handleBuy}
              disabled={isPending || isConfirming || !buyAmount}
              className="w-full text-lg py-6"
              variant="outline"
            >
              {isPending || isConfirming ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {isPending ? "Transaktion läuft..." : "Bestätigung..."}
                </>
              ) : (
                "Experimenteller Kauf"
              )}
            </Button>
          </div>
        </div>

        {/* Transaction Status */}
        {(isPending || isConfirming || isConfirmed) && (
          <Card className="bg-primary/10 border-primary/50">
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                {isConfirmed ? (
                  <CheckCircle className="w-5 h-5 text-secondary" />
                ) : (
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                )}
                <div className="flex-1">
                  <p className="font-medium">
                    {isPending && "Transaktion wird gesendet..."}
                    {isConfirming && "Warte auf Bestätigung..."}
                    {isConfirmed && "Transaktion erfolgreich!"}
                  </p>
                  {hash && (
                    <button
                      onClick={() => window.open(`https://polygonscan.com/tx/${hash}`, '_blank')}
                      className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                    >
                      Auf Polygonscan anzeigen <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Warning */}
        <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg border border-orange-500/50">
          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-orange-200">
            <p className="font-medium mb-1">Risiko-Hinweis:</p>
            <p>
              Der Handel erfolgt über QuickSwap DEX. Preise können sich schnell ändern. 
              Stelle sicher, dass du die Risiken verstehst.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};