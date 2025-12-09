
'use client';

import { useGift } from '@/context/gift';
import { Button } from '@/components/ui/button';

export function GiftButton() {
  const { openGiftModal } = useGift();

  return (
    <Button variant="outline" size="sm" onClick={openGiftModal}>
      Send Gift
    </Button>
  );
}
