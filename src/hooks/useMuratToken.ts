import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { Address, parseAbi, parseUnits, formatUnits } from 'viem';
import { polygon } from 'wagmi/chains';
import { useState, useEffect } from 'react';

// MURAT Token Configuration
export const MURAT_TOKEN = {
  address: '0x75B670775bCd4198eB0b030Fd22c7AafF8d8C266' as Address,
  symbol: 'MURAT',
  decimals: 18,
  supply: '1000000000', // 1 billion
  chainId: polygon.id,
} as const;

// QuickSwap Router V3 on Polygon
export const QUICKSWAP_ROUTER = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45' as Address;
export const USDT_POLYGON = '0xc2132D05D31c914a87C6611C10748AEb04B58e8F' as Address;

const ERC20_ABI = parseAbi([
  'function balanceOf(address account) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
]);

const QUICKSWAP_ABI = parseAbi([
  'function exactInputSingle((address tokenIn, address tokenOut, uint24 fee, address recipient, uint256 deadline, uint256 amountIn, uint256 amountOutMinimum, uint160 sqrtPriceLimitX96)) payable returns (uint256 amountOut)',
]);

export interface TokenInfo {
  price: number;
  marketCap: number;
  holders: number;
  liquidityUSD: number;
  priceChange24h: number;
}

export const useMuratToken = () => {
  const { address, isConnected, chainId } = useAccount();
  const { writeContract, data: hash, isPending: isWritePending } = useWriteContract();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(false);

  // Check MURAT balance
  const { data: muratBalance, isLoading: isLoadingBalance, refetch: refetchBalance } = useReadContract({
    address: MURAT_TOKEN.address,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: polygon.id,
    query: {
      enabled: !!address && chainId === polygon.id,
    },
  });

  // Check USDT balance
  const { data: usdtBalance, refetch: refetchUSDTBalance } = useReadContract({
    address: USDT_POLYGON,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    chainId: polygon.id,
    query: {
      enabled: !!address && chainId === polygon.id,
    },
  });

  // Mock MATIC balance for now
  const formattedMaticBalance = "0.5"; // Mock value

  // Check MURAT allowance for QuickSwap
  const { data: muratAllowance, refetch: refetchMuratAllowance } = useReadContract({
    address: MURAT_TOKEN.address,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, QUICKSWAP_ROUTER] : undefined,
    chainId: polygon.id,
    query: {
      enabled: !!address && chainId === polygon.id,
    },
  });

  // Check USDT allowance for QuickSwap
  const { data: usdtAllowance, refetch: refetchUSDTAllowance } = useReadContract({
    address: USDT_POLYGON,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, QUICKSWAP_ROUTER] : undefined,
    chainId: polygon.id,
    query: {
      enabled: !!address && chainId === polygon.id,
    },
  });

  // Transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
    chainId: polygon.id,
  });

  // Format balances
  const formattedMuratBalance = muratBalance ? formatUnits(muratBalance, MURAT_TOKEN.decimals) : '0';
  const formattedUsdtBalance = usdtBalance ? formatUnits(usdtBalance, 6) : '0'; // USDT has 6 decimals

  // Token gating - check if user has minimum MURAT tokens
  const hasMinimumTokens = (minAmount: number = 10) => {
    if (!muratBalance) return false;
    const balance = parseFloat(formattedMuratBalance);
    return balance >= minAmount;
  };

  // Approve MURAT tokens
  const approveMurat = async (amount: string) => {
    if (!address || chainId !== polygon.id) return;
    
    const amountWei = parseUnits(amount, MURAT_TOKEN.decimals);
    writeContract({
      address: MURAT_TOKEN.address,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [QUICKSWAP_ROUTER, amountWei],
      chain: polygon,
      account: address,
    });
  };

  // Approve USDT tokens
  const approveUSDT = async (amount: string) => {
    if (!address || chainId !== polygon.id) return;
    
    const amountWei = parseUnits(amount, 6); // USDT has 6 decimals
    writeContract({
      address: USDT_POLYGON,
      abi: ERC20_ABI,
      functionName: 'approve',
      args: [QUICKSWAP_ROUTER, amountWei],
      chain: polygon,
      account: address,
    });
  };

  // Fetch token info from APIs
  const fetchTokenInfo = async () => {
    setIsLoadingInfo(true);
    try {
      // This would typically fetch from QuickSwap API, DEX aggregators, or Polygonscan
      // For now, using placeholder data - you'll need to implement actual API calls
      const mockData: TokenInfo = {
        price: 0.0001, // Mock price in USD
        marketCap: 100000, // Mock market cap
        holders: 1250, // Mock holder count
        liquidityUSD: 50000, // Mock liquidity
        priceChange24h: 5.2, // Mock 24h change
      };
      
      setTokenInfo(mockData);
    } catch (error) {
      console.error('Failed to fetch token info:', error);
    } finally {
      setIsLoadingInfo(false);
    }
  };

  // Fetch token info on mount
  useEffect(() => {
    fetchTokenInfo();
  }, []);

  // Refetch balances after successful transaction
  useEffect(() => {
    if (isConfirmed) {
      refetchBalance();
      refetchUSDTBalance();
      refetchMuratAllowance();
      refetchUSDTAllowance();
    }
  }, [isConfirmed, refetchBalance, refetchUSDTBalance, refetchMuratAllowance, refetchUSDTAllowance]);

  return {
    // Balance data
    muratBalance: formattedMuratBalance,
    usdtBalance: formattedUsdtBalance,
    maticBalance: formattedMaticBalance,
    isLoadingBalance,
    
    // Token price
    tokenPrice: tokenInfo?.price || 0.0001,
    
    // Allowance data
    muratAllowance,
    usdtAllowance,
    
    // Token info
    tokenInfo,
    isLoadingInfo,
    refreshTokenInfo: fetchTokenInfo,
    
    // Token gating
    hasMinimumTokens,
    
    // Approval functions
    approveMurat,
    approveUSDT,
    
    // Transaction state
    isPending: isWritePending,
    isConfirming,
    isConfirmed,
    hash,
    
    // Chain check
    isCorrectChain: chainId === polygon.id,
    requiredChain: polygon,
  };
};