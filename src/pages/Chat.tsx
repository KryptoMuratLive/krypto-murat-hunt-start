import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, MessageCircle, Eye, Crown, Shield, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { WalletWidget } from "@/components/WalletWidget";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useWallet } from "@/hooks/useWallet";

interface Message {
  id: string;
  message: string;
  username: string | null;
  user_address: string;
  created_at: string;
  isHunter?: boolean;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCheckingHunter, setIsCheckingHunter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { address, isConnected } = useWallet();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load messages from database
  const loadMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('live_chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;

      const formattedMessages: Message[] = data?.map(msg => ({
        id: msg.id,
        message: msg.message,
        username: msg.username,
        user_address: msg.user_address,
        created_at: msg.created_at,
        isHunter: msg.username === 'Der Jäger'
      })) || [];

      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast({
        title: "Fehler beim Laden",
        description: "Nachrichten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'live_chat_messages'
        },
        (payload) => {
          const newMsg = payload.new as any;
          const formattedMessage: Message = {
            id: newMsg.id,
            message: newMsg.message,
            username: newMsg.username,
            user_address: newMsg.user_address,
            created_at: newMsg.created_at,
            isHunter: newMsg.username === 'Der Jäger'
          };
          setMessages(prev => [...prev, formattedMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
        // Add hunter response to database with a slight delay for dramatic effect
        setTimeout(async () => {
          try {
            await supabase
              .from('live_chat_messages')
              .insert({
                message: data.hunter_response,
                username: 'Der Jäger',
                user_address: 'system'
              });
          } catch (error) {
            console.error('Error saving hunter response:', error);
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Error checking hunter response:', error);
      // Don't show error to user for hunter responses - it should be seamless
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !isConnected || !address) {
      if (!isConnected) {
        toast({
          title: "Wallet nicht verbunden",
          description: "Bitte verbinde deine Wallet, um Nachrichten zu senden.",
          variant: "destructive",
        });
      }
      return;
    }

    setIsSending(true);
    const messageToCheck = newMessage;
    setNewMessage('');

    try {
      // Save message to database
      const { error } = await supabase
        .from('live_chat_messages')
        .insert({
          message: messageToCheck,
          username: address.slice(0, 6) + '...' + address.slice(-4),
          user_address: address
        });

      if (error) throw error;

      // Check if the hunter should respond
      setIsCheckingHunter(true);
      await checkHunterResponse(messageToCheck, '');
      setIsCheckingHunter(false);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Fehler beim Senden",
        description: "Nachricht konnte nicht gesendet werden.",
        variant: "destructive",
      });
      setNewMessage(messageToCheck); // Restore message on error
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('de-DE', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Simulate some community activity
  const simulateActivity = async () => {
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
    
    try {
      // Save simulated message to database
      await supabase
        .from('live_chat_messages')
        .insert({
          message: randomMessage,
          username: randomAuthor,
          user_address: 'simulated_' + randomAuthor.toLowerCase()
        });
      
      // Check for hunter response on simulated messages too
      checkHunterResponse(randomMessage, '');
    } catch (error) {
      console.error('Error sending simulated message:', error);
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
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="ml-2">Nachrichten werden geladen...</span>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <MessageCircle className="w-8 h-8 mr-2" />
                    <span>Noch keine Nachrichten. Sei der Erste!</span>
                  </div>
                ) : (
                  messages.map((message) => {
                    const isOwnMessage = message.user_address === address;
                    const displayName = message.username || (message.user_address.slice(0, 6) + '...' + message.user_address.slice(-4));
                    
                    return (
                      <div 
                        key={message.id} 
                        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.isHunter 
                            ? 'bg-destructive/20 border border-destructive/40 text-destructive-foreground' 
                            : isOwnMessage
                            ? 'bg-primary text-primary-foreground'
                            : message.user_address === 'system'
                            ? 'bg-muted text-muted-foreground text-center'
                            : 'bg-card border'
                        }`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-xs font-medium flex items-center space-x-1 ${
                              message.isHunter ? 'text-destructive' : ''
                            }`}>
                              {message.isHunter && <Eye className="w-3 h-3" />}
                              {isOwnMessage && <Crown className="w-3 h-3" />}
                              {message.user_address === 'system' && <Shield className="w-3 h-3" />}
                              <span>{isOwnMessage ? 'Du' : displayName}</span>
                            </span>
                            <span className="text-xs opacity-70">
                              {formatTime(message.created_at)}
                            </span>
                          </div>
                          <p className="text-sm">{message.message}</p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  placeholder={
                    !isConnected 
                      ? "Verbinde deine Wallet, um zu chatten..." 
                      : "Schreibe eine Nachricht... (erwähne Murat, um den Jäger zu triggern)"
                  }
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected || isSending}
                  className="flex-1"
                />
                <Button 
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || !isConnected || isSending}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                >
                  {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
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
                  Dies ist ein echter Community-Chat! Alle Nachrichten werden gespeichert und sind für alle Nutzer sichtbar. 
                  Der mysteriöse Jäger reagiert automatisch auf bestimmte Nachrichten und macht die Unterhaltung spannender.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">💾 Persistent Chat</h4>
                    <p className="text-xs text-muted-foreground">Alle Nachrichten werden in der Datenbank gespeichert</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">⚡ Real-time Updates</h4>
                    <p className="text-xs text-muted-foreground">Nachrichten erscheinen sofort bei allen Nutzern</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-1">🎭 KI-Jäger Integration</h4>
                    <p className="text-xs text-muted-foreground">Der mysteriöse Jäger reagiert auf deine Nachrichten</p>
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