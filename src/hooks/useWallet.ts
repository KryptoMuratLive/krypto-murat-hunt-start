import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useReadContract } from 'wagmi';
import { Address, parseAbi } from 'viem';

// NFT Contract Configuration for different access levels
export const NFT_CONTRACTS = {
  STANDARD: '0x1234567890ABCDEF1234567890ABCDEF12345678' as Address, // Standard Access NFT
  PREMIUM: '0x2234567890ABCDEF1234567890ABCDEF12345678' as Address,  // Premium Access NFT  
  JAEGER: '0x3234567890ABCDEF1234567890ABCDEF12345678' as Address,   // Jäger Access NFT
} as const;

const NFT_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
]);

export type AccessLevel = 'none' | 'standard' | 'premium' | 'jaeger';

export const useWallet = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // Check NFT balance for Standard NFT
  const { data: standardBalance, isLoading: isCheckingStandard } = useReadContract({
    address: NFT_CONTRACTS.STANDARD,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Check NFT balance for Premium NFT
  const { data: premiumBalance, isLoading: isCheckingPremium } = useReadContract({
    address: NFT_CONTRACTS.PREMIUM,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Check NFT balance for Jäger NFT
  const { data: jaegerBalance, isLoading: isCheckingJaeger } = useReadContract({
    address: NFT_CONTRACTS.JAEGER,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const isCheckingNFT = isCheckingStandard || isCheckingPremium || isCheckingJaeger;

  // Determine access level based on NFT ownership (highest level wins)
  const getAccessLevel = (): AccessLevel => {
    if (jaegerBalance && Number(jaegerBalance) > 0) return 'jaeger';
    if (premiumBalance && Number(premiumBalance) > 0) return 'premium';
    if (standardBalance && Number(standardBalance) > 0) return 'standard';
    return 'none';
  };

  const accessLevel = getAccessLevel();
  const hasAnyNFT = accessLevel !== 'none';

  // Legacy compatibility
  const hasRequiredNFT = hasAnyNFT;

  const connectWallet = () => {
    const preferredConnector = connectors.find(
      (connector) => connector.name === 'MetaMask'
    ) || connectors[0];
    
    if (preferredConnector) {
      connect({ connector: preferredConnector });
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getAccessLevelLabel = (level: AccessLevel): string => {
    switch (level) {
      case 'jaeger': return 'Jäger-Zugang';
      case 'premium': return 'Premium-Zugang';
      case 'standard': return 'Standard-Zugang';
      default: return 'Kein Zugang';
    }
  };

  const getAccessLevelColor = (level: AccessLevel): string => {
    switch (level) {
      case 'jaeger': return 'text-accent';
      case 'premium': return 'text-primary';
      case 'standard': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  return {
    address,
    isConnected,
    isConnecting: isConnecting || isPending,
    hasRequiredNFT, // Legacy compatibility
    hasAnyNFT,
    accessLevel,
    isCheckingNFT,
    connectWallet,
    disconnect,
    formatAddress: address ? formatAddress(address) : '',
    connectors,
    getAccessLevelLabel,
    getAccessLevelColor,
  };
};