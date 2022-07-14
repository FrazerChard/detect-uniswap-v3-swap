import { Finding, FindingSeverity, FindingType, getEthersProvider, ethers } from "forta-agent";
import { UNIV3_FACTORY_ADDRESS, UNIV3_FACTORY_ABI, TOKEN_POOL_ABI } from "./constants";

export const validateUniswapPair = async (tokenPoolAddress: string) => {
  try {
    const provider = getEthersProvider();
    //interface for the uniswap factory contract
    const uniV3Factory = new ethers.Contract(UNIV3_FACTORY_ADDRESS, UNIV3_FACTORY_ABI, provider);
    //interface for the token pair pool contract
    const pairPool = new ethers.Contract(tokenPoolAddress, TOKEN_POOL_ABI, provider);
    //checks if the pool address found in the UniswapV3 factory is equal to the pool address of the Swap event
    //AND checks the factory address for the pair pool contract is the same as the UniswapV3 factory address
    if (
      uniV3Factory.getPool(pairPool.token0(), pairPool.token1(), pairPool.fee()) == tokenPoolAddress.toLowerCase() &&
      pairPool.factory() == UNIV3_FACTORY_ADDRESS.toLowerCase()
    ) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export const generateFinding = (
  sender: string,
  recipient: string,
  amount0: number,
  amount1: number,
  tokenPoolAddress: string
): Finding => {
  return Finding.fromObject({
    name: `UniswapV3 Swap Event Detected`,
    description: `Agent has detected a Swap event for the Uniswap V3 Protocol`,
    alertId: "UNIV3-SWAP-EVENT",
    severity: FindingSeverity.Info,
    type: FindingType.Info,
    protocol: "UniswapV3",
    metadata: {
      sender: sender,
      recipient: recipient,
      amount0: amount0.toString(),
      amount1: amount1.toString(),
    },
    addresses: [tokenPoolAddress],
  });
};
