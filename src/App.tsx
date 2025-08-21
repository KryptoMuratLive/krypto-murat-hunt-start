import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Serie from "./pages/Serie";
import Game from "./pages/Game";
import NFT from "./pages/NFT";
import Live from "./pages/Live";
import Vote from "./pages/Vote";
import Episode from "./pages/Episode";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/serie" element={<Serie />} />
          <Route path="/game" element={<Game />} />
          <Route path="/nft" element={<NFT />} />
          <Route path="/live" element={<Live />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/folge/:id" element={<Episode />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
