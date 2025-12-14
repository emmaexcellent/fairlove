"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { giftCatalog } from "@/lib/gift-data";
import { GiftCard } from "./gift-card";

interface GiftStoreSectionProps {
  userCoins: number;
  ownedGifts: string[];
  onPurchase: (giftId: string, cost: number) => boolean;
}

export function GiftStoreSection({
  userCoins,
  ownedGifts,
  onPurchase,
}: GiftStoreSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const virtualGifts = giftCatalog.filter(
    (gift) => gift.category !== "physical"
  );
  const filteredGifts =
    selectedCategory === "all"
      ? virtualGifts
      : virtualGifts.filter((gift) => gift.category === selectedCategory);

  const categories = [
    { id: "all", label: "All Gifts", emoji: "🎁" },
    { id: "flowers", label: "Flowers", emoji: "🌹" },
    { id: "treats", label: "Treats", emoji: "🍫" },
    { id: "experiences", label: "Experiences", emoji: "✨" },
    { id: "affirmations", label: "Affirmations", emoji: "💪" },
  ];

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <Card className="p-4 bg-white/60 backdrop-blur-sm border-rose-200/50">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className={`cursor-pointer transition-all hover:scale-105 text-nowrap py-2 ${
                selectedCategory === cat.id
                  ? "bg-rose-500 hover:bg-rose-600"
                  : "hover:bg-rose-50"
              }`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="mr-1">{cat.emoji}</span>
              {cat.label}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Gift Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredGifts.map((gift) => (
          <GiftCard
            key={gift.id}
            gift={gift}
            userCoins={userCoins}
            isOwned={ownedGifts.includes(gift.id)}
            onPurchase={onPurchase}
          />
        ))}
      </div>

      {filteredGifts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No gifts in this category yet
          </p>
        </div>
      )}
    </div>
  );
}
