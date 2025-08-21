import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Vote as VoteIcon, Clock, Users, Gift, BarChart3, Wallet, CheckCircle } from "lucide-react";

interface VotingOption {
  id: string;
  text: string;
  votes: number;
  color: string;
}

const Vote = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasNFT, setHasNFT] = useState(false); // This would be checked via wallet connection
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 23,
    minutes: 42,
    seconds: 15
  });

  // Mock voting data - in real app this would come from blockchain/API
  const [votingOptions, setVotingOptions] = useState<VotingOption[]>([
    { id: "bypass", text: "Die Drohne umgehen", votes: 1247, color: "bg-blue-600" },
    { id: "destroy", text: "Die Drohne zerstören", votes: 983, color: "bg-red-600" },
    { id: "hack", text: "Die Drohne hacken", votes: 456, color: "bg-green-600" }
  ]);

  const totalVotes = votingOptions.reduce((sum, option) => sum + option.votes, 0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVote = (optionId: string) => {
    if (!hasNFT) {
      setWalletDialogOpen(true);
      return;
    }

    if (hasVoted) return;

    // Update vote count
    setVotingOptions(prev => 
      prev.map(option => 
        option.id === optionId 
          ? { ...option, votes: option.votes + 1 }
          : option
      )
    );

    setSelectedOption(optionId);
    setHasVoted(true);
  };

  const getVotePercentage = (votes: number) => {
    return totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Hauptseite
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Community-Voting – Deine Stimme entscheidet
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Was als Nächstes passiert, liegt in deiner Hand. Stimme ab und beeinflusse die Serie.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Voting Status */}
          <Card className="comic-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500 text-white animate-pulse">
                    🔴 LIVE VOTING
                  </Badge>
                  <Badge variant="secondary">
                    <Users className="w-3 h-3 mr-1" />
                    {totalVotes.toLocaleString()} Stimmen
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">
                    {String(timeRemaining.hours).padStart(2, '0')}:
                    {String(timeRemaining.minutes).padStart(2, '0')}:
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Voting Card */}
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Soll Murat die Drohne umgehen oder zerstören?
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Episode 3 hängt von deiner Entscheidung ab
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Voting Options */}
              <div className="space-y-4">
                {votingOptions.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <Button
                      variant={selectedOption === option.id ? "default" : "outline"}
                      className={`w-full h-auto p-4 justify-between ${
                        hasVoted && selectedOption === option.id ? "ring-2 ring-green-500" : ""
                      }`}
                      onClick={() => handleVote(option.id)}
                      disabled={hasVoted && selectedOption !== option.id}
                    >
                      <div className="flex items-center gap-3">
                        {hasVoted && selectedOption === option.id && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <VoteIcon className="w-5 h-5" />
                        <span className="text-lg">{option.text}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{getVotePercentage(option.votes)}%</div>
                        <div className="text-sm text-muted-foreground">
                          {option.votes.toLocaleString()} Stimmen
                        </div>
                      </div>
                    </Button>
                    
                    {/* Progress Bar */}
                    <Progress 
                      value={getVotePercentage(option.votes)} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>

              {/* Voting Status Messages */}
              {hasVoted ? (
                <div className="text-center p-6 bg-green-500/10 rounded-lg border border-green-500/20">
                  <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-500 mb-2">
                    Danke, deine Stimme wurde gezählt!
                  </h3>
                  <p className="text-muted-foreground">
                    Du hast für "{votingOptions.find(o => o.id === selectedOption)?.text}" gestimmt.
                    Die Ergebnisse aktualisieren sich live.
                  </p>
                </div>
              ) : !hasNFT ? (
                <div className="text-center p-6 bg-muted rounded-lg">
                  <Wallet className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">
                    Verbinde deine Wallet, um mitzuentscheiden
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Nur NFT-Holder können an der Abstimmung teilnehmen.
                  </p>
                  <Dialog open={walletDialogOpen} onOpenChange={setWalletDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="neon-glow">
                        <Wallet className="w-4 h-4 mr-2" />
                        Wallet verbinden
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="comic-card">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <Wallet className="w-5 h-5" />
                          Wallet verbinden zum Abstimmen
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          Verbinde deine Wallet, um an der Community-Abstimmung teilzunehmen.
                        </p>
                        <div className="grid gap-3">
                          <Button 
                            className="justify-start" 
                            onClick={() => {
                              setHasNFT(true);
                              setWalletDialogOpen(false);
                            }}
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            WalletConnect
                          </Button>
                          <Button 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => {
                              setHasNFT(true);
                              setWalletDialogOpen(false);
                            }}
                          >
                            <Wallet className="w-4 h-4 mr-2" />
                            MetaMask
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <VoteIcon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-blue-500 font-medium">
                    Wähle eine Option, um abzustimmen
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Rewards Info */}
          <Card className="comic-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Belohnungen für aktive Teilnehmer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Badge className="mb-2">Voting Streak</Badge>
                  <p className="text-sm text-muted-foreground">
                    Stimme 5x ab und erhalte ein exklusives NFT
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Badge className="mb-2 bg-orange-500">Airdrop Ready</Badge>
                  <p className="text-sm text-muted-foreground">
                    Aktive Voter erhalten Priority-Zugang
                  </p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Badge className="mb-2 bg-purple-500">Early Access</Badge>
                  <p className="text-sm text-muted-foreground">
                    Frühzugang zu neuen Episoden
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Link */}
          <div className="text-center">
            <Link to="/analyse">
              <Button size="lg" variant="outline" className="neon-glow">
                <BarChart3 className="w-5 h-5 mr-2" />
                Wie entscheidet die Community?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vote;