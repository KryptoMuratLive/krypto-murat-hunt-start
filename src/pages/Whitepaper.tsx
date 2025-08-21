import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, Users, Coins, Target, Zap, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletWidget } from "@/components/WalletWidget";

const tokenomicsData = [
  {
    category: "Community (Airdrops, Belohnung)",
    percentage: "30%",
    purpose: "Für aktive User, Spieler & Unterstützer",
    amount: "300 Millionen",
    color: "bg-secondary"
  },
  {
    category: "Staking/Rewards",
    percentage: "20%", 
    purpose: "Für Langzeitbindung",
    amount: "200 Millionen",
    color: "bg-primary"
  },
  {
    category: "Team & Entwicklung",
    percentage: "15%",
    purpose: "Für Aufbau, Kosten, Creator",
    amount: "150 Millionen", 
    color: "bg-accent"
  },
  {
    category: "Partnerschaften & Events",
    percentage: "10%",
    purpose: "Für neue Reichweite",
    amount: "100 Millionen",
    color: "bg-muted"
  },
  {
    category: "Treasury (Reserve)", 
    percentage: "15%",
    purpose: "Für Flexibilität",
    amount: "150 Millionen",
    color: "bg-destructive"
  },
  {
    category: "Liquidity Pool",
    percentage: "10%",
    purpose: "Für Handel & Exchanges", 
    amount: "100 Millionen",
    color: "bg-muted-foreground"
  }
];

const tokenUseCases = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Zugang zur Serie & exklusiven Cams",
    description: "Mit MURAT-Token erhältst du Zugang zu Premium-Content und Live-Streams"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Extra-Stimmen beim Voting",
    description: "Mehr Token = mehr Einfluss bei Community-Entscheidungen"
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Airdrops & Belohnungen",
    description: "Aktive Community-Mitglieder werden regelmäßig belohnt"
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Ingame-Shop & Trading",
    description: "Später: Upgrades kaufen, Items handeln und Charaktere verbessern"
  }
];

export default function Whitepaper() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Whitepaper</h1>
          </div>
          <WalletWidget />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 hero-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background/80" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="comic-title mb-6">
            Das Herz des Projekts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Verstehe KryptoMurat Live – von der Vision bis zur Umsetzung. 
            Alles erklärt, ohne Krypto-Blabla.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
        
        {/* Vision Section */}
        <section>
          <Card className="comic-card">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-3xl">Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg leading-relaxed space-y-4">
                <p>
                  <strong>KryptoMurat Live</strong> ist mehr als ein Spiel oder eine Serie. 
                  Es ist eine neue Art, Geschichten zu erleben – gemeinsam mit der Community.
                </p>
                <p>
                  Du bestimmst, was passiert. Mit deiner NFT-Karte, deiner Stimme und deiner Entscheidung.
                </p>
                <p className="text-primary font-semibold">
                  Web3 ist nicht das Ziel – es ist das Werkzeug.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* MURAT Token Section */}
        <section>
          <Card className="comic-card">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Coins className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="text-3xl">Was ist der MURAT-Token?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-lg leading-relaxed space-y-4">
                <p>
                  Der <strong className="text-secondary">MURAT</strong> ist der offizielle Utility-Token unseres Universums.
                </p>
                <p>
                  Er dient als <span className="text-primary">Belohnung</span>, 
                  <span className="text-accent"> Zugangsschlüssel</span> und 
                  <span className="text-secondary"> Stimme</span> in dieser Welt.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg mt-6">
                  <p className="font-semibold text-center">
                    🚀 Kein spekulativer Coin – ein echtes Werkzeug für echte Teilhabe
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Tokenomics Section */}
        <section>
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="text-3xl">Tokenomics</CardTitle>
              <p className="text-xl text-muted-foreground">
                1 Milliarde Token – fair verteilt
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tokenomicsData.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={`${item.color} text-white font-bold`}>
                          {item.percentage}
                        </Badge>
                        <h4 className="font-semibold">{item.category}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.purpose}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{item.amount}</p>
                      <p className="text-xs text-muted-foreground">Token</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                <h4 className="font-bold mb-3 text-center">Warum diese Aufteilung?</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Community First:</strong> 50% gehen direkt an die Community (30% Airdrops + 20% Staking)
                  </div>
                  <div>
                    <strong>Transparenz:</strong> Team erhält nur 15% und das über Zeit verteilt
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Token Use Cases */}
        <section>
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="text-3xl">Wie wird der Token verwendet?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {tokenUseCases.map((useCase, index) => (
                  <div key={index} className="flex space-x-4 p-4 rounded-lg bg-muted/30">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      {useCase.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">{useCase.title}</h4>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Why Web3 Section */}
        <section>
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="text-3xl">Warum Web3?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg leading-relaxed space-y-6">
                <p className="text-center text-2xl font-bold text-primary">
                  "Du sollst nicht nur zusehen. Du sollst mitbestimmen."
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl">Traditionelle Medien:</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>❌ Du schaust passiv zu</li>
                      <li>❌ Entscheidungen werden für dich getroffen</li>
                      <li>❌ Kein Einfluss auf die Story</li>
                      <li>❌ Keine Belohnungen für Engagement</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-bold text-xl">KryptoMurat Live:</h4>
                    <ul className="space-y-2 text-secondary">
                      <li>✅ Du bestimmst den Verlauf mit</li>
                      <li>✅ Deine Stimme zählt wirklich</li>
                      <li>✅ Sammle NFTs mit echtem Nutzen</li>
                      <li>✅ Werde für Aktivität belohnt</li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-accent/10 p-6 rounded-lg border-l-4 border-accent">
                  <p className="font-semibold">
                    NFTs & Token sind bei uns keine Spekulation – sie sind dein digitaler Einfluss.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Security & Transparency */}
        <section>
          <Card className="comic-card">
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-3xl">Sicherheit & Transparenz</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Shield className="w-12 h-12 mx-auto mb-4 text-secondary" />
                  <h4 className="font-bold mb-2">Öffentliche Verträge</h4>
                  <p className="text-sm text-muted-foreground">
                    Alle Smart Contracts sind öffentlich auf Polygon einsehbar
                  </p>
                </div>
                
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Coins className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h4 className="font-bold mb-2">On-Chain Daten</h4>
                  <p className="text-sm text-muted-foreground">
                    NFT-Daten und Eigenschaften sind unveränderlich gespeichert
                  </p>
                </div>
                
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h4 className="font-bold mb-2">Community First</h4>
                  <p className="text-sm text-muted-foreground">
                    Kein verstecktes Team – die Community sieht alles
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section>
          <Card className="comic-card">
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                <h2 className="text-3xl font-bold">Bereit für die Jagd?</h2>
                <p className="text-lg text-muted-foreground">
                  Werde Teil der Community und erlebe eine neue Art des Storytellings
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <Link to="/nft">
                    <Button size="lg" className="neon-glow">
                      <Coins className="w-5 h-5 mr-2" />
                      NFTs ansehen
                    </Button>
                  </Link>
                  
                  <Link to="/universum">
                    <Button size="lg" variant="outline">
                      <Target className="w-5 h-5 mr-2" />
                      Universum entdecken
                    </Button>
                  </Link>
                  
                  <Link to="/serie">
                    <Button size="lg" variant="secondary">
                      🎬 Serie starten
                    </Button>
                  </Link>
                </div>
                
                <div className="pt-6 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Fragen? Diskutiere mit der Community oder kontaktiere das Team.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

      </div>
    </div>
  );
}