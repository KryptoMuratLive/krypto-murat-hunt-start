
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { ArrowLeft, Camera, Users, Play, Lock, Eye, Wallet, AlertCircle } from "lucide-react";
import LivestreamSubtitles from "@/components/LivestreamSubtitles";
import { useStreamStatus } from "@/hooks/useStreamStatus";
import { toast } from "sonner";
import { SocialShare } from "@/components/SocialShare";

// NFT Gate Configuration (Dummy for testing)
const NFT_GATE_CONTRACT = "0x0000000000000000000000000000000000000000"; // Dummy contract for testing
const REQUIRED_NFT_ID = "1"; // Dummy NFT ID for testing

type CameraType = "murat" | "jaeger";

const Live = () => {
  const [selectedCamera, setSelectedCamera] = useState<CameraType>("murat");
  const [showDemo, setShowDemo] = useState(true);

  // Livepeer Stream Configuration
  const streamKeys = {
    murat: "029feh9xp563f1nv",
    jaeger: "029feh9xp563f1nv"
  };

  const streamUrls = {
    murat: "https://livepeercdn.studio/hls/029feh9xp563f1nv/index.m3u8",
    jaeger: "https://livepeercdn.studio/hls/029feh9xp563f1nv/index.m3u8"
  };

  // Stream status monitoring
  const streamStatus = useStreamStatus(streamUrls[selectedCamera]);

  useEffect(() => {
    if (streamStatus.isLive && !streamStatus.isLoading) {
      toast.success("Stream ist live!", {
        description: `${streamStatus.viewerCount} Zuschauer sind dabei`,
        duration: 3000,
      });
    } else if (streamStatus.error) {
      toast.error("Stream offline", {
        description: "Der Stream ist momentan nicht verfügbar",
      });
    }
  }, [streamStatus.isLive, streamStatus.error]);

  const handleCameraSwitch = (camera: CameraType) => {
    setSelectedCamera(camera);
    toast.info("Kamera gewechselt", {
      description: `Zu ${camera === "murat" ? "Murat-Cam" : "Jäger-Cam"} gewechselt`,
    });
  };

  const StreamPlayer = ({ camera }: { camera: CameraType }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
      const loadHLS = async () => {
        if (videoRef.current) {
          const video = videoRef.current;
          const streamUrl = streamUrls[camera];
          
          console.log('Loading HLS stream:', streamUrl);
          
          // Dynamically import hls.js
          const Hls = (await import('hls.js')).default;
          
          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
              backBufferLength: 90
            });
            
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log('HLS manifest loaded, starting playback');
              video.play().catch(console.error);
            });
            
            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error('HLS error:', data);
              if (data.fatal) {
                hls.destroy();
              }
            });
            
            return () => hls.destroy();
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Safari native HLS support
            video.src = streamUrl;
            video.play().catch(console.error);
          } else {
            console.error('HLS not supported in this browser');
          }
        }
      };
      
      loadHLS();
    }, [camera]);
    
    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        {/* HLS Video Player mit hls.js */}
        <video 
          ref={videoRef}
          autoPlay
          muted
          controls
          className="w-full h-full object-cover"
          poster="/lovable-uploads/1945b2dd-4535-4341-8070-a9c7428358a3.png"
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
          onError={(e) => console.error('Video error:', e)}
        />
        
        {/* Live indicator */}
        <div className="absolute top-4 left-4 z-10">
          <Badge className={`${streamStatus.isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500'} text-white`}>
            {streamStatus.isLive ? '🔴 LIVE' : '⚫ OFFLINE'}
          </Badge>
        </div>

        {/* Viewer count */}
        <div className="absolute top-4 right-4 z-10">
          {streamStatus.isLive && (
            <Badge variant="secondary" className="bg-black/50 text-white">
              <Users className="w-3 h-3 mr-1" />
              {streamStatus.viewerCount.toLocaleString()} Zuschauer
            </Badge>
          )}
        </div>

        {/* Camera info overlay */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">
                  {camera === "murat" ? "Murat's Perspektive" : "Jäger-Perspektive"}
                </h4>
                <p className="text-xs text-gray-300">
                  Stream ID: {streamKeys[camera]}
                </p>
              </div>
              <Badge className={camera === "murat" ? "bg-blue-600" : "bg-red-600"}>
                {camera === "murat" ? "Team Murat" : "Team Jäger"}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    );
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
          
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-foreground">
              🎥 KryptoMurat Live Stream
            </h1>
            <SocialShare 
              title="KryptoMurat Live Stream" 
              description="Erlebe die Bitcoin-Jagd in Echtzeit!"
            />
          </div>
          <p className="text-xl text-muted-foreground mb-8">
            Erlebe die Bitcoin-Jagd in Echtzeit! Stream läuft direkt ohne Wallet-Verbindung.
          </p>
        </div>

        {/* Camera Selection */}
        <div className="flex gap-4 mb-8 justify-center">
          <Button
            variant={selectedCamera === "murat" ? "default" : "outline"}
            onClick={() => handleCameraSwitch("murat")}
            className={`min-w-40 ${selectedCamera === "murat" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"}`}
          >
            <Camera className="w-4 h-4 mr-2" />
            Murat-Cam
          </Button>
          <Button
            variant={selectedCamera === "jaeger" ? "default" : "outline"}
            onClick={() => handleCameraSwitch("jaeger")}
            className={`min-w-40 ${selectedCamera === "jaeger" ? "bg-red-600 hover:bg-red-700" : "border-red-600 text-red-600 hover:bg-red-600 hover:text-white"}`}
          >
            <Camera className="w-4 h-4 mr-2" />
            Jäger-Cam
          </Button>
        </div>

        {/* Stream Player */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="comic-card">
            <CardContent className="p-6">
              <StreamPlayer camera={selectedCamera} />
            </CardContent>
          </Card>
        </div>

        {/* Stream Info */}
        <Card className="max-w-2xl mx-auto mb-8 comic-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              Live Stream Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p><strong>Aktive Kamera:</strong> {selectedCamera === "murat" ? "Murat-Cam" : "Jäger-Cam"}</p>
              <p><strong>Stream ID:</strong> <code className="bg-muted px-2 py-1 rounded text-sm">{streamKeys[selectedCamera]}</code></p>
              <p><strong>Status:</strong> 
                <Badge className={streamStatus.isLive ? "bg-green-600 ml-2" : "bg-gray-500 ml-2"}>
                  {streamStatus.isLoading ? '⏳ Lädt...' : streamStatus.isLive ? '🔴 Live' : '⚫ Offline'}
                </Badge>
              </p>
              {streamStatus.isLive && (
                <p><strong>Zuschauer:</strong> {streamStatus.viewerCount.toLocaleString()}</p>
              )}
              <p className="text-sm text-muted-foreground mt-4">
                💡 Falls der Stream nicht lädt, liegt es möglicherweise an deiner Internetverbindung oder der Browser unterstützt HLS nicht.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Live Subtitles Overlay */}
      <LivestreamSubtitles />
    </div>
  );
};

export default Live;