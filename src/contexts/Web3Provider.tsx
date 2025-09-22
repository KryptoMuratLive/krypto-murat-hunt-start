import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet, sepolia, polygon } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { metaMask, walletConnect, coinbaseWallet, injected } from '@wagmi/connectors';
import { ReactNode } from 'react';

const projectId = 'c4f79cc821944d9680842e34466bfbd4'; // Demo WalletConnect Project ID (32 characters)

const config = createConfig({
  chains: [polygon, mainnet, sepolia],
  connectors: [
    metaMask(),
    walletConnect({ 
      projectId,
      metadata: {
        name: 'KryptoMurat Live',
        description: 'MURAT Token Trading Platform',
        url: 'https://kryptomurat.live',
        icons: ['https://kryptomurat.live/favicon.ico']
      }
    }),
    coinbaseWallet({ appName: 'KryptoMurat Live' }),
    injected(),
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