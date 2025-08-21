import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, MessageCircle, Eye, Crown, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletWidget } from "@/components/WalletWidget";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
  isHunter?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Willkommen im Community-Chat! Hier tauschen sich die Spieler aus...',
      author: 'System',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: '2',
      text: 'Hat jemand Murat heute schon spielen sehen? Ich glaube, er versteckt sich wieder.',
      author: 'CryptoFan42',
      timestamp: new Date(Date.now() - 240000),
    },
    {
      id: '3',
      text: 'Die Flucht-Option war definitiv die richtige Wahl gestern. Team Murat denkt strategisch!',
      author: 'HODLer_2024',
      timestamp: new Date(Date.now() - 180000),
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isCheckingHunter, setIsCheckingHunter] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const checkHunterResponse = async (messageText: string, messageId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('hunter-response', {
        body: { 
          message: messageText,
          trigger_keywords: ['murat', 'flucht', 'karten', 'bitcoin', 'jäger', 'versteck', 'jagd', 'krypto', 'spielen']
        }
      });

      if (error) throw error;

      if (data.should_respond && data.hunter_response) {
        // Add hunter response with a slight delay for dramatic effect
        setTimeout(() => {
          const hunterMessage: Message = {
            id: `hunter_${Date.now()}`,
            text: data.hunter_response,
            author: 'Der Jäger',
            timestamp: new Date(),
            isHunter: true
          };
          setMessages(prev => [...prev, hunterMessage]);
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking hunter response:', error);
      // Don't show error to user for hunter responses - it should be seamless
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      text: newMessage,
      author: 'Du',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToCheck = newMessage;
    setNewMessage('');

    // Check if the hunter should respond
    setIsCheckingHunter(true);
    await checkHunterResponse(messageToCheck, userMessage.id);
    setIsCheckingHunter(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Simulate some community activity
  const simulateActivity = () => {
    const communityMessages = [
      'Ich glaube Murat hat einen neuen Plan...',
      'Die Jäger werden immer gefährlicher!',
      'Hat jemand die neue Karte gesehen?',
      'Team Murat für immer! 🚀',
      'Die Bitcoin-Spur führt nach Bielefeld...',
      'Vorsicht, ich glaube sie hören mit...'
    ];
    
    const authors = ['CryptoNinja', 'BlockchainBro', 'DiamondHands', 'MuratFan', 'SatoshiSeeker'];
    
    const randomMessage = communityMessages[Math.floor(Math.random() * communityMessages.length)];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    
    const simulatedMessage: Message = {
      id: `sim_${Date.now()}`,
      text: randomMessage,
      author: randomAuthor,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, simulatedMessage]);
    
    // Check for hunter response on simulated messages too
    checkHunterResponse(randomMessage, simulatedMessage.id);
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
            <h1 className="text-2xl font-bold">Community Chat</h1>
            {isCheckingHunter && (
              <Badge variant="outline" className="animate-pulse">
                <Eye className="w-3 h-3 mr-1" />
                Der Jäger lauscht...
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={simulateActivity}
              className="hidden md:flex"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Community-Aktivität simulieren
            </Button>
            <WalletWidget />
          </div>
        </div>
      </header>

      {/* Chat Section */}
      <section className="py-6 px-4">
        <div className="container mx-auto max-w-4xl">
          
          {/* Info Card */}
          <Card className="mb-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold flex items-center justify-center space-x-2">
                  <Eye className="w-5 h-5 text-primary" />
                  <span>Der Jäger hört mit</span>
                  <Eye className="w-5 h-5 text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground">
                  Schreibe über Murat, die Jagd oder Krypto-Themen und der mysteriöse Jäger könnte antworten...
                </p>
                <div className="flex justify-center space-x-4 text-xs text-muted-foreground mt-3">
                  <span>🔍 Trigger: murat, flucht, jäger, bitcoin</span>
                  <span>👁️ Der Jäger lauscht</span>
                  <span>💬 Automatische Antworten</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chat Container */}
          <Card className="comic-card h-96">
            <CardHeader className="py-3">
              <CardTitle className="flex items-center space-x-2 text-lg">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span>Live Community Chat</span>
                <Badge variant="secondary" className="ml-auto">
                  {messages.length} Nachrichten
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-80">
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-2 bg-muted/20 rounded-lg">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.author === 'Du' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.isHunter 
                        ? 'bg-destructive/20 border border-destructive/40 text-destructive-foreground' 
                        : message.author === 'Du'
                        ? 'bg-primary text-primary-foreground'
                        : message.author === 'System'
                        ? 'bg-muted text-muted-foreground text-center'
                        : 'bg-card border'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium flex items-center space-x-1 ${
                          message.isHunter ? 'text-destructive' : ''
                        }`}>
                          {message.isHunter && <Eye className="w-3 h-3" />}
                          {message.author === 'Du' && <Crown className="w-3 h-3" />}
                          {message.author === 'System' && <Shield className="w-3 h-3" />}
                          <span>{message.author}</span>
                        </span>
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  placeholder="Schreibe eine Nachricht... (erwähne Murat, um den Jäger zu triggern)"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feature Info */}
          <Card className="mt-6 bg-gradient-to-r from-muted/20 to-accent/5">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Über den Chat</h3>
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  Dies ist ein Demo-Chat, der zeigt, wie der mysteriöse Jäger auf bestimmte Nachrichten reagiert. 
                  Die KI erkennt automatisch relevante Begriffe und lässt den Jäger in seiner charakteristischen Art antworten.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">🎭 Automatische Charaktere</h4>
                    <p className="text-xs text-muted-foreground">Der Jäger antwortet automatisch auf relevante Nachrichten</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">🔍 Intelligente Erkennung</h4>
                    <p className="text-xs text-muted-foreground">KI erkennt Kontext und Trigger-Wörter</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">🎯 Immersive Erfahrung</h4>
                    <p className="text-xs text-muted-foreground">Echte Interaktion mit der Story-Welt</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}