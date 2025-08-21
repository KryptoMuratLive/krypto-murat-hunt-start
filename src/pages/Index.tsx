import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Play, Gamepad2, Coins } from "lucide-react";
import { WalletWidget } from "@/components/WalletWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-pulse"
          style={{
            backgroundImage: `url('/lovable-uploads/1945b2dd-4535-4341-8070-a9c7428358a3.png')`,
            animation: 'subtle-float 6s ease-in-out infinite'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.15),transparent_70%)]" />
        
        {/* Wallet Widget in top right */}
        <div className="absolute top-8 right-8 z-20">
          <WalletWidget />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="comic-title mb-6">
              Die Jagd hat begonnen
            </h1>
            
            <div className="text-xl md:text-2xl font-bold text-foreground/90 mb-8">
              KryptoMurat Live – Jagd auf den Bitcoin
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Eine Web3-Serie, ein Spiel, eine Entscheidung.
            </p>
            
            <Link to="/serie">
              <Button 
                size="lg" 
                className="neon-glow text-lg px-8 py-6 font-bold uppercase tracking-wide hover:scale-105 transition-all duration-300"
              >
                Jetzt starten
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-4 border-primary/30 rounded-full animate-pulse" />
        <div className="absolute bottom-32 right-16 w-16 h-16 border-4 border-secondary/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-20 w-12 h-12 border-4 border-accent/30 rounded-full animate-pulse delay-500" />
      </section>

            {/* Main Content Cards */}
            <section className="py-20 px-4">
              <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {/* Serie Card */}
                  <Link to="/serie" className="group">
                    <Card className="comic-card h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <Play className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Serie ansehen</h3>
                        <p className="text-sm text-muted-foreground">
                          Folge KryptoMurat auf seiner epischen Jagd nach dem Bitcoin.
                        </p>
                        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Zur Serie →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* Game Card */}
                  <Link to="/game" className="group">
                    <Card className="comic-card h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center group-hover:bg-secondary/30 transition-colors">
                          <Gamepad2 className="w-8 h-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Spiel spielen</h3>
                        <p className="text-sm text-muted-foreground">
                          Werde selbst zum Jäger! Sammle Bitcoins und treffe Entscheidungen.
                        </p>
                        <Button variant="outline" size="sm" className="group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                          Spiel starten →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                  {/* NFT Card */}
                  <Link to="/nft" className="group">
                    <Card className="comic-card h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                          <Coins className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">NFTs entdecken</h3>
                        <p className="text-sm text-muted-foreground">
                          Sichere dir exklusive KryptoMurat NFTs und Sammelkarten.
                        </p>
                        <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          NFTs ansehen →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                   {/* Universum Card */}
                  <Link to="/universum" className="group">
                    <Card className="comic-card h-full">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-muted/20 rounded-full flex items-center justify-center group-hover:bg-muted/30 transition-colors">
                          <span className="text-2xl">🌌</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Universum</h3>
                        <p className="text-sm text-muted-foreground">
                          Entdecke die Lore, Charaktere und Geheimnisse der Welt.
                        </p>
                        <Button variant="outline" size="sm" className="group-hover:bg-muted group-hover:text-muted-foreground transition-colors">
                          Entdecken →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
                
                {/* Secondary Navigation Row */}
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <Link to="/analyse" className="group">
                    <Card className="comic-card">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <span className="text-2xl">🧠</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">KI-Analyse</h3>
                        <p className="text-sm text-muted-foreground">
                          Verstehe Community-Entscheidungen mit KI-Power.
                        </p>
                        <Button variant="outline" size="sm" className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                          Analysieren →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/chat" className="group">
                    <Card className="comic-card">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                          <span className="text-2xl">💬</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Community Chat</h3>
                        <p className="text-sm text-muted-foreground">
                          Chatte mit der Community - der Jäger hört mit!
                        </p>
                        <Button variant="outline" size="sm" className="group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                          Chatten →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/whitepaper" className="group">
                    <Card className="comic-card">
                      <CardContent className="p-6 text-center space-y-4">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <span className="text-2xl">📜</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground">Whitepaper</h3>
                        <p className="text-sm text-muted-foreground">
                          Das Herz des Projekts – Vision, Token und Roadmap erklärt.
                        </p>
                        <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          Mehr erfahren →
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              KryptoMurat Live
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Folge der Jagd auf den sozialen Medien und verpasse keine Updates!
            </p>
            
            <div className="flex justify-center space-x-6">
              <a 
                href="https://www.tiktok.com/@kryptomuratlive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">T</span>
                </div>
                <span>TikTok</span>
              </a>
              
              <a 
                href="https://www.instagram.com/kryptomurat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">I</span>
                </div>
                <span>Instagram</span>
              </a>
              
              <a 
                href="https://x.com/kryptomurat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-secondary transition-colors"
              >
                <div className="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">X</span>
                </div>
                <span>X (Twitter)</span>
              </a>
            </div>
            
            {/* Legal Links */}
            <div className="flex justify-center space-x-6 pt-6">
              <Link 
                to="/impressum" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
              >
                Impressum
              </Link>
              <Link 
                to="/datenschutz" 
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline"
              >
                Datenschutz
              </Link>
            </div>
            
            <div className="pt-8 border-t border-border text-sm text-muted-foreground">
              © 2024 KryptoMurat Live. Die Jagd geht weiter.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;