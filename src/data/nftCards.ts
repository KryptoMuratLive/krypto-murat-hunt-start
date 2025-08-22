
// Shared NFT card data for consistency across all pages
export interface NFTCard {
  id: number;
  name: string;
  team: "murat" | "jaeger";
  skills: {
    geschicklichkeit: number;
    intelligenz: number;
    staerke: number;
  };
  ability: string;
  rarity: "haeufig" | "selten" | "sehr-selten";
  image: string;
}

// Team Murat Cards
export const muratCards: NFTCard[] = [
  {
    id: 1,
    name: "KryptoMurat",
    team: "murat",
    skills: { geschicklichkeit: 95, intelligenz: 88, staerke: 75 },
    ability: "Bitcoin-Radar: Findet versteckte Krypto-Hinweise",
    rarity: "sehr-selten",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Blockchain-Hacker",
    team: "murat",
    skills: { geschicklichkeit: 80, intelligenz: 92, staerke: 60 },
    ability: "Code-Breaker: Hackt gegnerische Systeme",
    rarity: "sehr-selten",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Krypto-Analyst",
    team: "murat",
    skills: { geschicklichkeit: 70, intelligenz: 85, staerke: 55 },
    ability: "Market-Vision: Vorhersage von Krypto-Bewegungen",
    rarity: "selten",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Wallet-Wächter",
    team: "murat",
    skills: { geschicklichkeit: 75, intelligenz: 70, staerke: 80 },
    ability: "Sicherheits-Schild: Schutz vor Angriffen",
    rarity: "selten",
    image: "/placeholder.svg"
  },
  {
    id: 5,
    name: "DeFi-Ninja",
    team: "murat",
    skills: { geschicklichkeit: 85, intelligenz: 75, staerke: 65 },
    ability: "Schnell-Tausch: Blitzschnelle Transaktionen",
    rarity: "haeufig",
    image: "/placeholder.svg"
  }
];

// Team Jäger Cards
export const jaegerCards: NFTCard[] = [
  {
    id: 6,
    name: "Der Schatten-Jäger",
    team: "jaeger",
    skills: { geschicklichkeit: 90, intelligenz: 80, staerke: 85 },
    ability: "Unsichtbarkeit: Kann unentdeckt angreifen",
    rarity: "sehr-selten",
    image: "/placeholder.svg"
  },
  {
    id: 7,
    name: "Cyber-Verfolger",
    team: "jaeger",
    skills: { geschicklichkeit: 75, intelligenz: 88, staerke: 70 },
    ability: "Tracking: Verfolgt digitale Spuren",
    rarity: "sehr-selten",
    image: "/placeholder.svg"
  },
  {
    id: 8,
    name: "Netzwerk-Saboteur",
    team: "jaeger",
    skills: { geschicklichkeit: 80, intelligenz: 82, staerke: 65 },
    ability: "System-Crash: Legt Netzwerke lahm",
    rarity: "selten",
    image: "/placeholder.svg"
  },
  {
    id: 9,
    name: "Daten-Dieb",
    team: "jaeger",
    skills: { geschicklichkeit: 85, intelligenz: 75, staerke: 60 },
    ability: "Info-Steal: Stiehlt wichtige Informationen",
    rarity: "selten",
    image: "/placeholder.svg"
  },
  {
    id: 10,
    name: "Blockchain-Brecher",
    team: "jaeger",
    skills: { geschicklichkeit: 70, intelligenz: 90, staerke: 55 },
    ability: "Chain-Break: Unterbricht Blockchain-Verbindungen",
    rarity: "haeufig",
    image: "/placeholder.svg"
  }
];

// All cards combined
export const allNFTCards: NFTCard[] = [...muratCards, ...jaegerCards];
