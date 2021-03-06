export const UNIV3_FACTORY_ADDRESS: string = "0x1F98431c8aD98523631AE4a59f267346ea31F984";

export const UNIV3_FACTORY_ABI: string =
  "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)";

export const SWAP_EVENT: string =
  "event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick )";

export const TOKEN_POOL_ABI: string[] = [
  "function factory() external view returns (address)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
  "function fee() external view returns (uint24)",
  "event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)",
];
