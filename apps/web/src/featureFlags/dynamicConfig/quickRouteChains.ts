import { ChainId } from "udonswap-core";
import { DynamicConfigs } from "uniswap/src/features/experiments/configs";
import { useDynamicConfig } from "uniswap/src/features/experiments/hooks";

export const QUICK_ROUTE_CONFIG_KEY = "quick_route_chains";

export function useQuickRouteChains(): ChainId[] {
  const statsigConfig = useDynamicConfig(DynamicConfigs.QuickRouteChains);
  const chains = statsigConfig.get(QUICK_ROUTE_CONFIG_KEY, []) as ChainId[];
  if (ChainId.MODE) {
    return chains;
  } else {
    console.error("dynamic config chains contain invalid ChainId");
    return [];
  }
}
