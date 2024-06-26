// import { ChainId } from "udonswap-smart-order-router-v3";
import { ChainId } from "udonswap-core";
import { PortfolioLogo } from "components/AccountDrawer/MiniPortfolio/PortfolioLogo";
import { SearchToken } from "graphql/data/SearchTokens";
import { TokenQueryData } from "graphql/data/Token";
import { TopToken } from "graphql/data/TopTokens";
import { gqlToCurrency, supportedChainIdFromGQLChain } from "graphql/data/util";
import { useMemo } from "react";

import { AssetLogoBaseProps } from "./AssetLogo";

export default function QueryTokenLogo(
  props: AssetLogoBaseProps & {
    token?: TopToken | TokenQueryData | SearchToken;
  },
) {
  const chainId =
    (props.token?.chain
      ? supportedChainIdFromGQLChain(props.token?.chain)
      : ChainId.MODE) ?? ChainId.MODE;
  const currency = props.token ? gqlToCurrency(props.token) : undefined;
  const logoUrl = props.token?.project?.logoUrl;

  return (
    <PortfolioLogo
      currencies={useMemo(() => [currency], [currency])}
      chainId={chainId}
      images={[logoUrl]}
      {...props}
    />
  );
}
