
'use client';

import { useCoins } from '@/context/coin';
import { Badge } from '@/components/ui/badge';

export function CoinBalance() {
  const { coinBalance } = useCoins();

  return <Badge variant="outline">Coins: {coinBalance}</Badge>;
}
