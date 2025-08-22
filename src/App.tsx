import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Web3Provider } from "@/contexts/Web3Provider";
import { CustomThirdwebProvider } from "@/contexts/ThirdwebProvider";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Serie from "./pages/Serie";
import Game from "./pages/Game";
import NFT from "./pages/NFT";
import Live from "./pages/Live";
import Vote from "./pages/Vote";
import Episode from "./pages/Episode";
import Universum from "./pages/Universum";
import Analyse from "./pages/Analyse";
import Chat from "./pages/Chat";
import Whitepaper from "./pages/Whitepaper";
import Token from "./pages/Token";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Web3Provider>
      <CustomThirdwebProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/nft" element={<NFT />} />
          <Route path="/universum" element={<Universum />} />
          <Route path="/analyse" element={<Analyse />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/token" element={<Token />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
            <Route 
              path="/serie" 
              element={
                <ProtectedRoute requiredAccessLevel="standard">
                  <Serie />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/game" 
              element={
                <ProtectedRoute requiredAccessLevel="standard">
                  <Game />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/live" 
              element={
                <ProtectedRoute allowedLevels={['standard', 'premium', 'jaeger']}>
                  <Live />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vote" 
              element={
                <ProtectedRoute requiredAccessLevel="premium">
                  <Vote />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/folge/:id" 
              element={
                <ProtectedRoute requiredAccessLevel="standard">
                  <Episode />
                </ProtectedRoute>
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CustomThirdwebProvider>
  </Web3Provider>
</QueryClientProvider>
);

export default App;
