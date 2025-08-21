import { ThirdwebProvider, metamaskWallet, coinbaseWallet, walletConnect } from '@thirdweb-dev/react';
import { Ethereum, Polygon } from '@thirdweb-dev/chains';
import { ReactNode } from 'react';

const clientId = 'demo-client-id'; // Demo client ID for testing

interface CustomThirdwebProviderProps {
  children: ReactNode;
}

export const CustomThirdwebProvider = ({ children }: CustomThirdwebProviderProps) => {
  return (
    <ThirdwebProvider
      clientId={clientId}
      activeChain={Ethereum}
      supportedChains={[Ethereum, Polygon]}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
      ]}
      dAppMeta={{
        name: "KryptoMurat Live",
        description: "Jagd auf den Bitcoin - Erlebe die Krypto-Spannung live",
        logoUrl: "https://example.com/logo.png",
        url: "https://kryptomurat.live",
        isDarkMode: true,
      }}
    >
      {children}
    </ThirdwebProvider>
  );
};