import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useReadContract } from 'wagmi';
import { Address, parseAbi } from 'viem';

// NFT Contract Configuration
const NFT_CONTRACT_ADDRESS = '0xDEINCONTRACT' as Address; // Replace with actual contract
const NFT_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
]);

export const useWallet = () => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  // Check if user owns required NFT
  const { data: nftBalance, isLoading: isCheckingNFT } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const hasRequiredNFT = nftBalance ? Number(nftBalance) > 0 : false;

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

  return {
    address,
    isConnected,
    isConnecting: isConnecting || isPending,
    hasRequiredNFT,
    isCheckingNFT,
    connectWallet,
    disconnect,
    formatAddress: address ? formatAddress(address) : '',
    connectors,
  };
};