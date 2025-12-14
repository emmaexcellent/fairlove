"use client";

import { giftCatalog } from "@/lib/gift-data";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Sparkles } from "lucide-react";

interface GiftVaultProps {
  ownedGifts: string[];
}

export function GiftVault({ ownedGifts }: GiftVaultProps) {
  const ownedGiftDetails = giftCatalog.filter((gift) =>
    ownedGifts.includes(gift.id)
  );

  if (ownedGifts.length === 0) {
    return (
      <Card className="p-12 bg-white/60 backdrop-blur-sm border-rose-200/50">
        <div className="text-center space-y-4">
          <Package className="w-16 h-16 mx-auto text-muted-foreground/50" />
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Your Vault is Empty
            </h3>
            <p className="text-muted-foreground">
              Start collecting gifts to send love to your special someone!
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-gradient-to-r from-rose-100 to-purple-100 border-rose-200/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-6 h-6 text-rose-600" />
            <div>
              <h3 className="font-bold text-foreground">
                Your Gift Collection
              </h3>
              <p className="text-sm text-muted-foreground">
                {ownedGifts.length} gifts owned
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {ownedGiftDetails.map((gift) => (
          <Card
            key={gift.id}
            className="p-6 hover:shadow-lg transition-all duration-300 animate-in fade-in-50 zoom-in-95 bg-white/80 backdrop-blur-sm border-2 border-rose-200/50"
          >
            <div className="text-center space-y-3">
              <div className="text-5xl animate-in zoom-in-50 duration-500">
                {gift.emoji}
              </div>
              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h4 className="font-bold text-foreground">{gift.name}</h4>
                  {gift.rare && (
                    <Badge
                      variant="secondary"
                      className="bg-purple-100 text-purple-700"
                    >
                      <Sparkles className="w-3 h-3 mr-1" />
                      Rare
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground capitalize">
                  {gift.category}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
