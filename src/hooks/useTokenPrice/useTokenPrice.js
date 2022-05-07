import { useEffect, useState } from 'react';
import { useEthConverter } from './useConverter';
import { formatTokenName } from '../utils/format';
import { usePromise } from './usePromise/usePromise';
import { getCoinConverterRequest } from '../services/generalService';
import { handleVerySmallNumbers } from '../components/Common/SliderTokensList/SliderToken/TokenPrice/TokenPrice';
import { tokenSymbolToId } from '../constants/coingeko';

export const useTokenPrice = (token) => {
  const [, usdToEth] = useEthConverter();
  const tokenName = formatTokenName(token);
  const tokenId = tokenSymbolToId(token);

  const [getUsdPrice, inUsdPrice] = usePromise(() => getCoinConverterRequest(tokenId));
  const rawUsdEqValue = inUsdPrice?.payload?.[tokenName]?.usd || '';
  const usdEqValue = handleVerySmallNumbers(rawUsdEqValue);
  useEffect(() => {
    if (tokenId) getUsdPrice();
  }, [tokenId]);

  return usdEqValue;
};
