"use client";

import { giftCatalog } from "@/lib/gift-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Truck, Zap, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PhysicalGiftsSectionProps {
  userCoins: number;
  onPurchase: (giftId: string, cost: number) => boolean;
}

export function PhysicalGiftsSection({
  userCoins,
  onPurchase,
}: PhysicalGiftsSectionProps) {
  
  const [purchasing, setPurchasing] = useState<string | null>(null);

  const physicalGifts = giftCatalog.filter(
    (gift) => gift.category === "physical"
  );

  const handlePurchase = (giftId: string, cost: number, name: string) => {
    setPurchasing(giftId);
    setTimeout(() => {
      const success = onPurchase(giftId, cost);
      if (success) {
        toast(`Purchase Successful!. ${name} will be delivered soon!`);
      } else {
        toast(`Insufficient Coins. You need ${cost - userCoins} more coins`);
      }
      setPurchasing(null);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200/50">
        <div className="flex items-start gap-4">
          <ShoppingBag className="w-8 h-8 text-purple-600 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-purple-900 mb-2">
              Physical Gifts
            </h3>
            <p className="text-sm text-purple-800/80 leading-relaxed">
              Curated premium gifts delivered to your loved one&apos;s doorstep.
              All items are sourced from trusted partners and shipped with care.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {physicalGifts.map((gift) => {
          const canAfford = userCoins >= gift.coinCost;
          const isPurchasing = purchasing === gift.id;

          return (
            <Card
              key={gift.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-purple-300"
            >
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{gift.emoji}</div>
                  {gift.rare && (
                    <Badge className="bg-purple-600 hover:bg-purple-700">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>

                <h4 className="text-xl font-bold text-foreground mb-2">
                  {gift.name}
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {gift.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-purple-700 mb-4">
                  <Truck className="w-4 h-4" />
                  <span>Ships in 2-3 business days</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-600" />
                    <span className="text-2xl font-bold text-foreground">
                      {gift.coinCost}
                    </span>
                  </div>

                  <Button
                    onClick={() =>
                      handlePurchase(gift.id, gift.coinCost, gift.name)
                    }
                    disabled={!canAfford || isPurchasing}
                    className={
                      canAfford
                        ? "bg-purple-600 hover:bg-purple-700"
                        : "bg-gray-300 cursor-not-allowed"
                    }
                  >
                    {isPurchasing
                      ? "Processing..."
                      : canAfford
                      ? "Purchase"
                      : "Not Enough Coins"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
