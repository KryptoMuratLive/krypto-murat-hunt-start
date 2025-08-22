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
import { WalletAssets } from "./WalletAssets";

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
          Mein Wallet Dashboard
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

        <WalletAssets />
      </CardContent>
    </Card>
  );
};