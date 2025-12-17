
'use client';

import { useState } from 'react';
import { useGift } from '@/context/gift';
import { useCoins } from '@/context/coin';
import { useAuth } from '@/context/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createGift } from '@/lib/appwrite/crud';

const gifts = [
  { id: 'mystery-box', name: 'Mystery Box', cost: 10 },
  { id: 'virtual-flower', name: 'Virtual Flower', cost: 5 },
  { id: 'love-letter', name: 'Love Letter', cost: 2 },
];

export function GiftModal({ receiverId }: { receiverId: string }) {
  const { isGiftModalOpen, closeGiftModal } = useGift();
  const { spendCoins } = useCoins();
  const { user } = useAuth();
  const [selectedGift, setSelectedGift] = useState<(typeof gifts)[0] | null>(
    null
  );

  const handleSendGift = async () => {
    if (!selectedGift) {
      toast.error('Please select a gift to send.');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to send a gift.');
      return;
    }

    try {
      await spendCoins(selectedGift.cost);
      await createGift({
        senderId: user.$id,
        receiverId,
        giftId: selectedGift.id,
      });
      toast.success(`You sent a ${selectedGift.name}!`);
      setSelectedGift(null);
      closeGiftModal();
    } catch (error) {
      console.log(error)
      // spendCoins already shows a toast on error
    }
  };

  return (
    <Dialog open={isGiftModalOpen} onOpenChange={closeGiftModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send a Gift</DialogTitle>
          <DialogDescription>
            Select a gift to send to this user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className={`border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer ${
                selectedGift?.id === gift.id ? 'border-primary' : ''
              }`}
              onClick={() => setSelectedGift(gift)}
            >
              <span className="text-2xl">🎁</span>
              <span className="mt-2">{gift.name}</span>
              <span className="text-sm text-gray-500">{gift.cost} coins</span>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeGiftModal}>
            Cancel
          </Button>
          <Button onClick={handleSendGift}>Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
