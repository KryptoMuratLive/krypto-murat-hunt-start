import { TokenDashboard } from "@/components/TokenDashboard";
import { WalletWidget } from "@/components/WalletWidget";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Token = () => {
  return (
    <div className="min-h-screen hero-bg">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Zurück zur Startseite
            </Link>
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="comic-title text-4xl mb-2">MURAT Token</h1>
            <p className="text-muted-foreground text-lg">
              Das native Token der KryptoMurat Live Plattform
            </p>
          </div>
          <WalletWidget />
        </div>
        
        {/* Token Dashboard */}
        <TokenDashboard />
      </div>
    </div>
  );
};

export default Token;