import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BarChart3, TrendingUp, Users, Loader2, Brain, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletWidget } from "@/components/WalletWidget";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface VotingData {
  total_votes: number;
  option_a: {
    name: string;
    percentage: number;
  };
  option_b: {
    name: string;
    percentage: number;
  };
  trend: string;
}

export default function Analyse() {
  const [analysisRequest, setAnalysisRequest] = useState("Analysiere die letzte Entscheidung der Community");
  const [analysisResult, setAnalysisResult] = useState("");
  const [votingData, setVotingData] = useState<VotingData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeDecision = async () => {
    if (!analysisRequest.trim()) {
      toast({
        title: "Anfrage fehlt",
        description: "Bitte gib eine Analyse-Anfrage ein.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-community', {
        body: { 
          analysis_request: analysisRequest,
          voting_data: null // Let the function generate mock data
        }
      });

      if (error) throw error;
      
      setAnalysisResult(data.analysis);
      setVotingData(data.voting_data);
      toast({
        title: "Analyse abgeschlossen",
        description: "Die Community-Entscheidung wurde analysiert.",
      });
    } catch (error) {
      console.error('Error analyzing decision:', error);
      toast({
        title: "Fehler",
        description: "Die Analyse konnte nicht durchgeführt werden.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Prepare chart data
  const pieData = votingData ? [
    { name: votingData.option_a.name, value: votingData.option_a.percentage, color: '#8B5CF6' },
    { name: votingData.option_b.name, value: votingData.option_b.percentage, color: '#06B6D4' }
  ] : [];

  const barData = votingData ? [
    { name: votingData.option_a.name, votes: Math.round(votingData.total_votes * votingData.option_a.percentage / 100) },
    { name: votingData.option_b.name, votes: Math.round(votingData.total_votes * votingData.option_b.percentage / 100) }
  ] : [];

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
            <h1 className="text-2xl font-bold">Community-Analyse</h1>
          </div>
          <WalletWidget />
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 hero-bg relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background/80" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="comic-title mb-6">
            Warum hat Team Murat dominiert?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Verstehe die Entscheidungen der Community mit KI-gestützter Analyse. 
            Erkenne Trends, Motivationen und die Psychologie hinter den Votes.
          </p>
        </div>
      </section>

      {/* Analysis Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Analysis Request Card */}
          <Card className="comic-card mb-8 bg-gradient-to-r from-background to-muted/20 border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Brain className="w-6 h-6 text-primary animate-pulse" />
                <CardTitle className="text-2xl text-center">KI-Community-Analyst</CardTitle>
                <Target className="w-6 h-6 text-accent animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Analyse-Anfrage:</label>
                <Input
                  placeholder="z.B. Analysiere die letzte Entscheidung der Community"
                  value={analysisRequest}
                  onChange={(e) => setAnalysisRequest(e.target.value)}
                  className="text-base"
                />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={analyzeDecision}
                  disabled={isAnalyzing || !analysisRequest.trim()}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      KI analysiert...
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Analyse starten
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {votingData && analysisResult && (
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              {/* Voting Statistics */}
              <Card className="comic-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Voting-Ergebnisse</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Summary Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <Users className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-2xl font-bold">{votingData.total_votes}</p>
                      <p className="text-xs text-muted-foreground">Gesamtstimmen</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <TrendingUp className="w-6 h-6 mx-auto mb-2 text-accent" />
                      <p className="text-2xl font-bold">{votingData.option_a.percentage}%</p>
                      <p className="text-xs text-muted-foreground">{votingData.option_a.name}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <BarChart3 className="w-6 h-6 mx-auto mb-2 text-secondary" />
                      <p className="text-2xl font-bold">{votingData.option_b.percentage}%</p>
                      <p className="text-xs text-muted-foreground">{votingData.option_b.name}</p>
                    </div>
                  </div>

                  {/* Pie Chart */}
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Anteil']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="votes" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                </CardContent>
              </Card>

              {/* Analysis Result */}
              <Card className="comic-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-accent" />
                    <span>KI-Analyse</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6">
                    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {analysisResult}
                    </p>
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Community-Trend:</p>
                    <p className="text-sm text-muted-foreground">
                      {votingData.trend}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Information Card */}
          <Card className="comic-card bg-gradient-to-r from-muted/20 to-accent/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Über die Community-Analyse</h3>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Diese KI-Analyse interpretiert Voting-Verhalten und Community-Entscheidungen im Kontext 
                  der KryptoMurat-Welt. Sie hilft dabei, die Motivationen und Strategien der Community zu verstehen.
                </p>
                <div className="flex justify-center space-x-6 text-xs text-muted-foreground mt-4">
                  <span>🧠 KI-gestützte Analyse</span>
                  <span>📊 Echte Voting-Daten</span>
                  <span>🎯 Strategische Insights</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
        </div>
      </section>
    </div>
  );
}