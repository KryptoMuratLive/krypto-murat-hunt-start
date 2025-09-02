
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
    image: "/lovable-uploads/c6facd2d-9500-464b-bcfc-610eefb2daf2.png"
  },
  {
    id: 2,
    name: "Blockchain-Hacker",
    team: "murat",
    skills: { geschicklichkeit: 80, intelligenz: 92, staerke: 60 },
    ability: "Code-Breaker: Hackt gegnerische Systeme",
    rarity: "sehr-selten",
    image: "/lovable-uploads/5c45d27f-11a9-467e-8831-108b1acec5bb.png"
  },
  {
    id: 3,
    name: "Krypto-Analyst",
    team: "murat",
    skills: { geschicklichkeit: 70, intelligenz: 85, staerke: 55 },
    ability: "Market-Vision: Vorhersage von Krypto-Bewegungen",
    rarity: "selten",
    image: "/lovable-uploads/28c2d5ea-2a2e-4931-8f5c-944e67d4c27d.png"
  },
  {
    id: 4,
    name: "Wallet-Wächter",
    team: "murat",
    skills: { geschicklichkeit: 75, intelligenz: 70, staerke: 80 },
    ability: "Sicherheits-Schild: Schutz vor Angriffen",
    rarity: "selten",
    image: "/lovable-uploads/626ae0ce-f709-4817-b15e-0e6eb1377771.png"
  },
  {
    id: 5,
    name: "DeFi-Ninja",
    team: "murat",
    skills: { geschicklichkeit: 85, intelligenz: 75, staerke: 65 },
    ability: "Schnell-Tausch: Blitzschnelle Transaktionen",
    rarity: "haeufig",
    image: "/lovable-uploads/20addb9a-1408-4a33-bbd0-4f7592ded7fe.png"
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
    image: "/lovable-uploads/727a6b18-de51-4104-9f42-f3e4c8b4b555.png"
  },
  {
    id: 7,
    name: "Cyber-Verfolger",
    team: "jaeger",
    skills: { geschicklichkeit: 75, intelligenz: 88, staerke: 70 },
    ability: "Tracking: Verfolgt digitale Spuren",
    rarity: "sehr-selten",
    image: "/lovable-uploads/9c6a0171-a3bd-472b-afe2-a3bc8fd65379.png"
  },
  {
    id: 8,
    name: "Netzwerk-Saboteur",
    team: "jaeger",
    skills: { geschicklichkeit: 80, intelligenz: 82, staerke: 65 },
    ability: "System-Crash: Legt Netzwerke lahm",
    rarity: "selten",
    image: "/lovable-uploads/969ce4eb-64aa-4b96-8591-b64de4f5d785.png"
  },
  {
    id: 9,
    name: "Daten-Dieb",
    team: "jaeger",
    skills: { geschicklichkeit: 85, intelligenz: 75, staerke: 60 },
    ability: "Info-Steal: Stiehlt wichtige Informationen",
    rarity: "selten",
    image: "/lovable-uploads/2fafcaee-f583-4c56-a67c-cb1331683762.png"
  },
  {
    id: 10,
    name: "Blockchain-Brecher",
    team: "jaeger",
    skills: { geschicklichkeit: 70, intelligenz: 90, staerke: 55 },
    ability: "Chain-Break: Unterbricht Blockchain-Verbindungen",
    rarity: "haeufig",
    image: "/lovable-uploads/756162d4-9d05-4cb0-9b2f-10325d326d99.png"
  }
];

// All cards combined
export const allNFTCards: NFTCard[] = [...muratCards, ...jaegerCards];
