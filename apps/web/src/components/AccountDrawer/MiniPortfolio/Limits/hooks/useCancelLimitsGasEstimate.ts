import { useCreateCancelTransactionRequest } from 'components/AccountDrawer/MiniPortfolio/Activity/utils'
import { GasFeeResult, GasSpeed, useTransactionGasFee } from 'hooks/useTransactionGasFee'
import { useMemo } from 'react'
import { SignatureType, UniswapXOrderDetails } from 'state/signatures/types'

export function useCancelLimitsGasEstimate(orders?: UniswapXOrderDetails[]): GasFeeResult {
  const cancelTransactionParams = useMemo(
    () =>
      orders && orders.length > 0
        ? {
            orders: orders.map((order) => {
              return {
                encodedOrder: order.encodedOrder as string,
                type: order.type as SignatureType,
              }
            }),
            chainId: orders[0].chainId,
          }
        : undefined,
    [orders]
  )
  const cancelTransaction = useCreateCancelTransactionRequest(cancelTransactionParams)
  const gasEstimate = useTransactionGasFee(cancelTransaction, GasSpeed.Fast)
  return gasEstimate
}
