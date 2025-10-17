import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { metaMask, coinbaseWallet, injected } from '@wagmi/connectors';
import { ReactNode } from 'react';

// Removed WalletConnect to fix DataCloneError - can be re-added with proper configuration if needed
const config = createConfig({
  chains: [polygon, mainnet, sepolia],
  connectors: [
    injected({ target: 'metaMask' }),
    metaMask({
      dappMetadata: {
        name: 'KryptoMurat Live',
        url: typeof window !== 'undefined' ? window.location.origin : 'https://kryptomurat.live',
        iconUrl: 'https://kryptomurat.live/favicon.ico'
      }
    }),
    coinbaseWallet({ 
      appName: 'KryptoMurat Live',
      appLogoUrl: 'https://kryptomurat.live/favicon.ico'
    }),
  ],
  transports: {
    [polygon.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider = ({ children }: Web3ProviderProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};