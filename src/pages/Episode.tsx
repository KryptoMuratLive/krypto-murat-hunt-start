import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Play, Clock, Eye } from "lucide-react";

const episodes = {
  1: {
    title: "Die Entscheidung",
    description: "KryptoMurat steht vor der größten Entscheidung seines Lebens. Die Jagd auf den legendären Bitcoin beginnt in den dunklen Gassen der Krypto-Welt.",
    duration: "25 Min",
    views: "12.5K",
    unlocked: true,
  },
  2: {
    title: "Verfolgung",
    description: "Die ersten Hinweise führen KryptoMurat in gefährliche Gebiete. Wer verfolgt wen in diesem Katz-und-Maus-Spiel?",
    duration: "28 Min",
    views: "8.2K",
    unlocked: false,
  },
  3: {
    title: "Täuschung",
    description: "Nichts ist wie es scheint. Premium-Enthüllungen und versteckte Wahrheiten warten auf die tapfersten NFT-Besitzer.",
    duration: "32 Min",
    views: "5.1K",
    unlocked: false,
  },
  4: {
    title: "Der Showdown",
    description: "Das finale Duell um den Bitcoin. Deine Stimme und dein NFT entscheiden, wie diese epische Geschichte endet.",
    duration: "35 Min",
    views: "?",
    unlocked: false,
  },
};

const Episode = () => {
  const { id } = useParams<{ id: string }>();
  const episodeId = parseInt(id || "1");
  const episode = episodes[episodeId as keyof typeof episodes];

  if (!episode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Episode nicht gefunden</h1>
          <Link to="/serie">
            <Button>Zurück zur Serie</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/serie">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Serie
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Folge {episodeId}: {episode.title}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="comic-card mb-6">
              <CardContent className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg flex items-center justify-center">
                  {episode.unlocked ? (
                    <div className="text-center">
                      <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                      <p className="text-foreground font-semibold">Video wird geladen...</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Play className="w-8 h-8 text-accent" />
                      </div>
                      <p className="text-muted-foreground">NFT erforderlich</p>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{episode.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>{episode.views} Aufrufe</span>
                    </div>
                  </div>
                  {episode.unlocked ? (
                    <Button className="neon-glow w-full">
                      Episode abspielen
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full" disabled>
                        NFT erforderlich zum Freischalten
                      </Button>
                      <Link to="/nft">
                        <Button className="neon-glow w-full">
                          NFT kaufen
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="comic-card">
              <CardHeader>
                <CardTitle>Über diese Episode</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {episode.description}
                </p>
              </CardContent>
            </Card>

            <Card className="comic-card">
              <CardHeader>
                <CardTitle>Nächste Episoden</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(episodes).map(([id, ep]) => {
                    const epId = parseInt(id);
                    if (epId === episodeId) return null;
                    return (
                      <Link 
                        key={id} 
                        to={`/folge/${id}`}
                        className="block p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                            <span className="text-sm font-semibold">{id}</span>
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{ep.title}</p>
                            <p className="text-xs text-muted-foreground">{ep.duration}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episode;