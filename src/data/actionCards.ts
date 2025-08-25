// Action cards for gameplay (not NFTs)
export interface ActionCard {
  id: string;
  name: string;
  team: "murat" | "jaeger" | "both";
  effect: string;
  description: string;
  icon: string;
  cooldown: number; // rounds
}

export const actionCards: ActionCard[] = [
  {
    id: "verstecken",
    name: "Verstecken",
    team: "murat",
    effect: "unsichtbar für 1 Runde",
    description: "Murat wird für eine Runde unsichtbar und kann nicht verfolgt werden",
    icon: "EyeOff",
    cooldown: 3
  },
  {
    id: "polizei-rufen",
    name: "Polizei rufen",
    team: "both",
    effect: "blockiert 1 Runde",
    description: "Beide Teams werden für eine Runde blockiert - taktische Pause",
    icon: "Shield",
    cooldown: 4
  },
  {
    id: "falle-stellen",
    name: "Falle stellen",
    team: "jaeger",
    effect: "reduziert Murats Geschwindigkeit",
    description: "Reduziert Murats Bewegungsgeschwindigkeit für 2 Runden",
    icon: "Trap",
    cooldown: 3
  },
  {
    id: "bitcoin-transaktion",
    name: "Bitcoin-Transaktion",
    team: "jaeger",
    effect: "Wallet sichtbar",
    description: "Macht Murats Wallet-Position für 2 Runden sichtbar",
    icon: "Bitcoin",
    cooldown: 4
  },
  {
    id: "crowdsourcing-hinweis",
    name: "Crowdsourcing-Hinweis",
    team: "murat",
    effect: "geheimer Pfad",
    description: "Community gibt Hinweis auf einen geheimen Fluchtweg",
    icon: "Users",
    cooldown: 5
  },
  {
    id: "live-spender",
    name: "Live-Spender",
    team: "murat",
    effect: "Taxi/Shortcut durch Spenden",
    description: "Zuschauer spenden für ein Taxi - sofortiger Ortswechsel möglich",
    icon: "Car",
    cooldown: 6
  }
];

// Helper functions
export const getMuratActionCards = () => actionCards.filter(card => card.team === "murat" || card.team === "both");
export const getJaegerActionCards = () => actionCards.filter(card => card.team === "jaeger" || card.team === "both");
export const getActionCardsByTeam = (team: "murat" | "jaeger") => 
  actionCards.filter(card => card.team === team || card.team === "both");