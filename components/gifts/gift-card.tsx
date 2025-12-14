"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Sparkles, Check } from "lucide-react";
import { Gift } from "@/lib/gift-data";
import { toast } from "sonner";

interface GiftCardProps {
  gift: Gift;
  userCoins: number;
  isOwned: boolean;
  onPurchase?: (giftId: string, cost: number, quantity: number) => boolean;
}

export function GiftCard({
  gift,
  userCoins,
  isOwned,
  onPurchase,
}: GiftCardProps) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const totalCost = gift.coinCost * quantity;
  const canAfford = userCoins >= totalCost;

  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => {
      const success = onPurchase?.(gift.id, totalCost, quantity);
      if (success) {
        setShowAnimation(true);
        toast(`${quantity} × ${gift.name} added to your vault`);
        setTimeout(() => setShowAnimation(false), 2000);
      } else {
        toast(
          `Insufficient Coins. You need ${totalCost - userCoins} more coins`
        );
      }
      setIsPurchasing(false);
    }, 800);
  };

  return (
    <Card
      className={`p-6 hover:shadow-lg transition-all duration-300 ${
        showAnimation ? "animate-in zoom-in-95 duration-500" : ""
      } bg-white/80 backdrop-blur-sm`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div
            className={`text-5xl transition-transform duration-300 ${
              showAnimation ? "animate-in zoom-in-50 duration-700" : ""
            }`}
          >
            {gift.emoji}
          </div>
          {gift.rare && (
            <Badge className="bg-purple-600 hover:bg-purple-700">
              <Sparkles className="w-3 h-3 mr-1" />
              Rare
            </Badge>
          )}
          <div className="relative">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <span className="text-xl font-bold text-foreground">
                {gift.coinCost}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-foreground mb-1">{gift.name}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {gift.description}
          </p>
        </div>

        <div className="pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>
            <span className="px-2">{quantity}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </Button>
          </div>

          <Button
            size="sm"
            onClick={handlePurchase}
            disabled={!canAfford || isPurchasing}
            className={
              canAfford
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
            }
          >
            {isPurchasing
              ? "Acquiring..."
              : canAfford
              ? "Get Gift"
              : "Need More"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
