import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useReadContract } from 'wagmi';
import { Address, parseAbi } from 'viem';
import { useMuratToken } from './useMuratToken';

// NFT Contract Configuration for different access levels
export const NFT_CONTRACTS = {
  STANDARD: '0x1234567890ABCDEF1234567890ABCDEF12345678' as Address, // Standard Access NFT
  PREMIUM: '0x2234567890ABCDEF1234567890ABCDEF12345678' as Address,  // Premium Access NFT  
  JAEGER: '0x3234567890ABCDEF1234567890ABCDEF12345678' as Address,   // Jäger Access NFT
} as const;

const NFT_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
]);

export type AccessLevel = 'none' | 'standard' | 'premium' | 'jaeger' | 'token';

export const useWallet = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { hasMinimumTokens } = useMuratToken();

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

  // Determine access level based on NFT ownership and token holding (Beta: Any MURAT holder gets access)
  const getAccessLevel = (): AccessLevel => {
    if (jaegerBalance && Number(jaegerBalance) > 0) return 'jaeger';
    if (premiumBalance && Number(premiumBalance) > 0) return 'premium';
    if (standardBalance && Number(standardBalance) > 0) return 'standard';
    // Beta: Any MURAT token holder gets "token" access level
    if (hasMinimumTokens && hasMinimumTokens(0.1)) return 'token';
    return 'none';
  };

  const accessLevel = getAccessLevel();
  const hasAnyNFT = accessLevel !== 'none';

  // Legacy compatibility
  const hasRequiredNFT = hasAnyNFT;

  const connectWallet = async () => {
    // Try MetaMask first, then Coinbase, then fallback to first available
    const byName = (n: string) => connectors.find((c) => c.name?.toLowerCase().includes(n));
    try {
      const mm = byName('metamask') || connectors.find((c) => (c as any).id === 'metaMask');
      if (mm) {
        await connectAsync({ connector: mm });
        return;
      }
    } catch (err) {
      console.warn('MetaMask connect failed', err);
    }
    try {
      const cb = byName('coinbase') || connectors.find((c) => (c as any).id === 'coinbaseWallet');
      if (cb) {
        await connectAsync({ connector: cb });
        return;
      }
    } catch (err) {
      console.warn('Coinbase connect failed', err);
    }
    // Fallback
    if (connectors[0]) {
      connect({ connector: connectors[0] });
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
      case 'token': return 'Token-Zugang';
      default: return 'Kein Zugang';
    }
  };

  const getAccessLevelColor = (level: AccessLevel): string => {
    switch (level) {
      case 'jaeger': return 'text-accent';
      case 'premium': return 'text-primary';
      case 'standard': return 'text-secondary';
      case 'token': return 'text-primary';
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