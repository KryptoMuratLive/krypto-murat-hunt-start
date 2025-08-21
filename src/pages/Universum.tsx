import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Search, Filter, Zap, Brain, Sword, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletWidget } from "@/components/WalletWidget";

interface Character {
  id: number;
  name: string;
  team: "murat" | "jäger";
  geschicklichkeit: number;
  intelligenz: number;
  stärke: number;
  fähigkeit: string;
  seltenheit: "legendary" | "epic" | "rare" | "common";
  image: string;
  lore: string;
  backstory: string;
}

const characters: Character[] = [
  {
    id: 1,
    name: "KryptoMurat",
    team: "murat",
    geschicklichkeit: 95,
    intelligenz: 88,
    stärke: 75,
    fähigkeit: "Bitcoin-Radar: Findet versteckte Krypto-Hinweise",
    seltenheit: "legendary",
    image: "/placeholder.svg",
    lore: "Der Protagonist unserer Geschichte. Ein ehemaliger Finanzexperte, der alles verlor und nun auf der Suche nach dem ultimativen Bitcoin ist.",
    backstory: "Geboren in den Ruinen des traditionellen Finanzsystems, wurde Murat zum Meister der digitalen Währungen. Seine Obsession begann mit einem verlorenen Wallet mit 10.000 Bitcoin. Seitdem jagt er den perfekten Trade, den einen Fund, der alles ändern wird. Seine Fähigkeiten im Aufspüren versteckter Krypto-Schätze sind legendär - manche sagen, er kann Bitcoin riechen."
  },
  {
    id: 2,
    name: "Blockchain-Hacker",
    team: "murat",
    geschicklichkeit: 80,
    intelligenz: 92,
    stärke: 60,
    fähigkeit: "Code-Breaker: Hackt gegnerische Systeme",
    seltenheit: "epic",
    image: "/placeholder.svg",
    lore: "Murats rechte Hand in der digitalen Welt. Ein Genie im Brechen von Codes und Systemen.",
    backstory: "Einst ein White-Hat-Hacker für große Konzerne, wandte er sich der dunklen Seite zu, als er die Korruption im System erkannte. Seine Finger tanzen über die Tastatur wie ein Pianist über die Tasten. Er kann in Sekunden Systeme knacken, für die andere Stunden brauchen. Seine Loyalität zu Murat entstand, als dieser ihm half, aus einem Gefängnis für Cyberkriminelle zu entkommen."
  },
  {
    id: 3,
    name: "Krypto-Analyst",
    team: "murat",
    geschicklichkeit: 70,
    intelligenz: 85,
    stärke: 55,
    fähigkeit: "Market-Vision: Vorhersage von Krypto-Bewegungen",
    seltenheit: "rare",
    image: "/placeholder.svg",
    lore: "Der Stratege des Teams. Seine Marktanalysen sind so präzise, als könnte er die Zukunft sehen.",
    backstory: "Früher ein erfolgreicher Hedge-Fund-Manager, verlor er alles beim großen Crypto-Crash von 2022. Doch aus der Asche erhob er sich mit einer fast übernatürlichen Fähigkeit, Marktbewegungen vorherzusagen. Seine Charts sind wie Kunstwerke - komplex, schön und tödlich genau. Murat fand ihn in einer verlassenen Börse, umgeben von hunderten von Bildschirmen."
  },
  {
    id: 4,
    name: "Wallet-Wächter",
    team: "murat",
    geschicklichkeit: 75,
    intelligenz: 70,
    stärke: 80,
    fähigkeit: "Sicherheits-Schild: Schutz vor Angriffen",
    seltenheit: "rare",
    image: "/placeholder.svg",
    lore: "Der Beschützer der Gruppe. Niemand kommt an den Schätzen von Team Murat vorbei, solange er wacht.",
    backstory: "Ein ehemaliger Bankensicherheitsexperte, der die Grenzen zwischen physischer und digitaler Sicherheit verwischte. Nach einem Überfall auf seine Bank, bei dem Kryptowährungen gestohlen wurden, schwor er, nie wieder zuzulassen, dass jemand das verliert, was ihm anvertraut wird. Seine Hardware-Wallets sind wie Festungen - undurchdringlich und absolut sicher."
  },
  {
    id: 5,
    name: "DeFi-Ninja",
    team: "murat",
    geschicklichkeit: 85,
    intelligenz: 75,
    stärke: 65,
    fähigkeit: "Schnell-Tausch: Blitzschnelle Transaktionen",
    seltenheit: "common",
    image: "/placeholder.svg",
    lore: "Jung, schnell und hungrig nach Erfolg. Seine Geschwindigkeit bei Transaktionen ist unübertroffen.",
    backstory: "Der jüngste im Team, aber mit Reflexen wie ein Raubtier. Aufgewachsen in der DeFi-Welt, kennt er jeden Trick, jeden Pool, jeden Arbitrage-Vorteil. Seine Finger bewegen sich so schnell über das Interface, dass andere nur Unschärfe sehen. Murat erkannte sein Talent, als er in einer einzigen Nacht 1000% Gewinn machte - und das dreimal hintereinander."
  },
  {
    id: 6,
    name: "Der Schatten-Jäger",
    team: "jäger",
    geschicklichkeit: 90,
    intelligenz: 80,
    stärke: 85,
    fähigkeit: "Unsichtbarkeit: Kann unentdeckt angreifen",
    seltenheit: "legendary",
    image: "/placeholder.svg",
    lore: "Der mysteriöse Anführer der Jäger. Niemand weiß, wer er wirklich ist oder warum er Murat jagt.",
    backstory: "Eine Legende in der Unterwelt der Kryptowährungen. Manche sagen, er sei ein ehemaliger Regierungsagent. Andere behaupten, er sei ein KI-Programm, das Bewusstsein erlangt hat. Was sicher ist: Er ist unaufhaltbar, unsichtbar und absolut entschlossen, Murat zu finden. Seine Identität ist das bestgehütete Geheimnis der Krypto-Welt. Wenn er kommt, merkst du es erst, wenn es zu spät ist."
  },
  {
    id: 7,
    name: "Cyber-Verfolger",
    team: "jäger",
    geschicklichkeit: 75,
    intelligenz: 88,
    stärke: 70,
    fähigkeit: "Tracking: Verfolgt digitale Spuren",
    seltenheit: "epic",
    image: "/placeholder.svg",
    lore: "Ein Meister der digitalen Forensik. Keine Spur ist zu klein, keine Verschleierung zu clever.",
    backstory: "Früher ein Ermittler bei der Cyber-Polizei, wurde er vom Schatten-Jäger rekrutiert, nachdem er zu nah an die Wahrheit über eine große Krypto-Verschwörung gekommen war. Seine Fähigkeit, digitale Fußabdrücke zu verfolgen, grenzt an das Übernatürliche. Er kann eine Bitcoin-Transaktion durch hunderte von Mixern verfolgen und am Ende immer den wahren Absender finden."
  },
  {
    id: 8,
    name: "Netzwerk-Saboteur",
    team: "jäger",
    geschicklichkeit: 80,
    intelligenz: 82,
    stärke: 65,
    fähigkeit: "System-Crash: Legt Netzwerke lahm",
    seltenheit: "rare",
    image: "/placeholder.svg",
    lore: "Spezialist für Chaos und Zerstörung in digitalen Netzwerken. Wo er auftaucht, folgen Stromausfälle.",
    backstory: "Ein ehemaliger Systemadministrator, der zu tief in die dunklen Ecken des Internets vorgedrungen ist. Nachdem er Zeuge einer massiven Manipulation der Blockchain wurde und niemand ihm glaubte, beschloss er, das System von innen zu zerstören. Seine Malware ist wie ein Virus - sie breitet sich aus, lernt und passt sich an, bis das gesamte Netzwerk zusammenbricht."
  },
  {
    id: 9,
    name: "Daten-Dieb",
    team: "jäger",
    geschicklichkeit: 85,
    intelligenz: 75,
    stärke: 60,
    fähigkeit: "Info-Steal: Stiehlt wichtige Informationen",
    seltenheit: "rare",
    image: "/placeholder.svg",
    lore: "Ein Phantom in der digitalen Welt. Er nimmt, was er braucht, ohne je gesehen zu werden.",
    backstory: "Aufgewachsen in den Slums der Krypto-Welt, lernte er früh, dass Information Macht ist. Seine erste große Beute waren die privaten Schlüssel eines Millionärs - seitdem sammelt er Geheimnisse wie andere Briefmarken. Er kann in jedes System eindringen, jede Verschlüsselung knacken und jeden Gedanken stehlen, der jemals digital gespeichert wurde."
  },
  {
    id: 10,
    name: "Blockchain-Brecher",
    team: "jäger",
    geschicklichkeit: 70,
    intelligenz: 90,
    stärke: 55,
    fähigkeit: "Chain-Break: Unterbricht Blockchain-Verbindungen",
    seltenheit: "common",
    image: "/placeholder.svg",
    lore: "Ein Theoretiker des Chaos. Er versteht die Blockchain besser als ihre Erschaffer - nur um sie zu zerstören.",
    backstory: "Ein brillanter Kryptograf, der die fundamentalen Schwächen der Blockchain-Technologie entdeckte. Als seine Warnungen ignoriert wurden, beschloss er, seine Theorien in die Praxis umzusetzen. Seine Algorithmen können selbst die sichersten Chains zum Erliegen bringen. Er sieht sich nicht als Zerstörer, sondern als Chirurg, der das kranke System von seinen Fehlern befreit."
  }
];

const locations = [
  {
    id: 1,
    name: "Checkpoint Bielefeld",
    description: "Der Ort, an dem alles begann. Ein verlassener Krypto-Mining-Komplex am Stadtrand.",
    significance: "Hier entdeckte Murat die ersten Hinweise auf den legendären Bitcoin-Schatz."
  },
  {
    id: 2,
    name: "Drohnenbunker",
    description: "Ein unterirdischer Komplex, geschützt von autonomen Drohnen und KI-Systemen.",
    significance: "Das Versteck der Jäger und ihr Hauptquartier für die Verfolgung."
  },
  {
    id: 3,
    name: "Das Dark Web Café",
    description: "Ein geheimer Treffpunkt für Krypto-Enthusiasten und Hacker in den Tiefen des Darknets.",
    significance: "Hier werden Informationen gehandelt und Allianzen geschmiedet."
  },
  {
    id: 4,
    name: "Die Blockchain-Bibliothek",
    description: "Ein mystischer Ort, wo alle jemals getätigten Transaktionen als physische Bücher existieren.",
    significance: "Hier liegt das Wissen über die wahre Geschichte der Kryptowährungen verborgen."
  }
];

const timeline = [
  {
    episode: "Prolog",
    title: "Der große Verlust",
    description: "Murat verliert seine komplette Krypto-Sammlung durch einen Hack.",
    significance: "Der Auslöser für seine obsessive Jagd nach dem perfekten Bitcoin."
  },
  {
    episode: "Folge 1",
    title: "Die Entdeckung",
    description: "Ein geheimnisvoller Hinweis führt Murat nach Bielefeld.",
    significance: "Der Beginn der eigentlichen Jagd und erste Begegnung mit den Jägern."
  },
  {
    episode: "Folge 2",
    title: "Die Verfolgung beginnt",
    description: "Die Jäger nehmen Murats Spur auf und die Hetzjagd beginnt.",
    significance: "Das Katz-und-Maus-Spiel zwischen Murat und den Jägern eskaliert."
  },
  {
    episode: "Folge 3",
    title: "Verbündete und Verräter",
    description: "Murat sammelt sein Team, aber nicht alle sind vertrauenswürdig.",
    significance: "Die Charaktere werden eingeführt und erste Allianzen gebildet."
  }
];

export default function Universum() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState<"all" | "murat" | "jäger">("all");
  const [activeTab, setActiveTab] = useState<"characters" | "locations" | "timeline">("characters");

  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTeam = teamFilter === "all" || character.team === teamFilter;
    return matchesSearch && matchesTeam;
  });

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'bg-gradient-to-r from-accent to-primary';
      case 'epic': return 'bg-gradient-to-r from-primary to-secondary';
      case 'rare': return 'bg-gradient-to-r from-secondary to-accent';
      default: return 'bg-muted';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'Legendär';
      case 'epic': return 'Episch';
      case 'rare': return 'Selten';
      default: return 'Gewöhnlich';
    }
  };

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
            <h1 className="text-2xl font-bold">Universum</h1>
          </div>
          <WalletWidget />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 hero-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background/80" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="comic-title mb-6">
            Die Welt hinter der Jagd
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Hier findest du die Geschichten, Hintergründe und Geheimnisse der Welt von KryptoMurat Live. 
            Tauche ein in eine Welt voller Mysterien, wo jeder Charakter seine eigene dunkle Geschichte hat 
            und jeder Ort seine Geheimnisse birgt.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-4">
            <Button
              variant={activeTab === "characters" ? "default" : "outline"}
              onClick={() => setActiveTab("characters")}
            >
              Charaktere
            </Button>
            <Button
              variant={activeTab === "locations" ? "default" : "outline"}
              onClick={() => setActiveTab("locations")}
            >
              Schauplätze
            </Button>
            <Button
              variant={activeTab === "timeline" ? "default" : "outline"}
              onClick={() => setActiveTab("timeline")}
            >
              Timeline
            </Button>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      {activeTab === "characters" && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            {/* Search and Filter Controls */}
            <div className="max-w-2xl mx-auto mb-12 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Charakter suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex justify-center space-x-2">
                <Button
                  variant={teamFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTeamFilter("all")}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Alle Teams
                </Button>
                <Button
                  variant={teamFilter === "murat" ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setTeamFilter("murat")}
                >
                  Team Murat
                </Button>
                <Button
                  variant={teamFilter === "jäger" ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setTeamFilter("jäger")}
                >
                  Team Jäger
                </Button>
              </div>
            </div>

            {/* Character Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCharacters.map((character) => (
                <Card 
                  key={character.id} 
                  className="comic-card cursor-pointer group"
                  onClick={() => setSelectedCharacter(character)}
                >
                  <CardHeader>
                    <div className="w-full h-48 bg-muted rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{character.name}</CardTitle>
                        <Badge 
                          variant={character.team === "murat" ? "secondary" : "destructive"}
                          className="text-xs"
                        >
                          {character.team === "murat" ? "Team Murat" : "Team Jäger"}
                        </Badge>
                      </div>
                      <Badge 
                        className={`${getRarityColor(character.seltenheit)} text-white text-xs`}
                      >
                        {getRarityText(character.seltenheit)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {character.lore}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-accent" />
                          <span>{character.geschicklichkeit}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Brain className="w-3 h-3 text-primary" />
                          <span>{character.intelligenz}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Sword className="w-3 h-3 text-secondary" />
                          <span>{character.stärke}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        <strong>Fähigkeit:</strong> {character.fähigkeit}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Locations Section */}
      {activeTab === "locations" && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Schauplätze</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {locations.map((location) => (
                <Card key={location.id} className="comic-card">
                  <CardHeader>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-accent" />
                      <CardTitle className="text-xl">{location.name}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{location.description}</p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Bedeutung:</p>
                      <p className="text-sm text-muted-foreground">{location.significance}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Timeline Section */}
      {activeTab === "timeline" && (
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Timeline</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {timeline.map((event, index) => (
                <Card key={index} className="comic-card">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2">{event.episode}</Badge>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium mb-1">Bedeutung:</p>
                      <p className="text-sm text-muted-foreground">{event.significance}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Character Detail Dialog */}
      <Dialog open={!!selectedCharacter} onOpenChange={() => setSelectedCharacter(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedCharacter && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedCharacter.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={selectedCharacter.team === "murat" ? "secondary" : "destructive"}
                  >
                    {selectedCharacter.team === "murat" ? "Team Murat" : "Team Jäger"}
                  </Badge>
                  <Badge 
                    className={`${getRarityColor(selectedCharacter.seltenheit)} text-white`}
                  >
                    {getRarityText(selectedCharacter.seltenheit)}
                  </Badge>
                </div>
                
                <div className="w-full h-64 bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={selectedCharacter.image} 
                    alt={selectedCharacter.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Zap className="w-6 h-6 mx-auto mb-2 text-accent" />
                    <p className="text-2xl font-bold">{selectedCharacter.geschicklichkeit}</p>
                    <p className="text-xs text-muted-foreground">Geschicklichkeit</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Brain className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{selectedCharacter.intelligenz}</p>
                    <p className="text-xs text-muted-foreground">Intelligenz</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <Sword className="w-6 h-6 mx-auto mb-2 text-secondary" />
                    <p className="text-2xl font-bold">{selectedCharacter.stärke}</p>
                    <p className="text-xs text-muted-foreground">Stärke</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Spezialfähigkeit</h4>
                  <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {selectedCharacter.fähigkeit}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Hintergrund</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCharacter.lore}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Vollständige Geschichte</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedCharacter.backstory}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}