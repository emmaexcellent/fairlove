"use client";

import { useState } from "react";
import { X, Zap, Package, ShoppingBag, Sparkles, Check } from "lucide-react";
import {
  giftCatalog,
  giftCategories,
  type Gift as GiftType,
} from "@/lib/gift-data";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GiftCard } from "../gift-card";

interface GiftAttachmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGift: (gift: GiftType) => void;
  userCoins: number;
  onPurchaseGift: (gift: GiftType) => void;
  ownedGifts: string[];
  selectedGiftIds: string[];
}

const categoryLabels: Record<string, string> = {
  flowers: "🌸 Flowers",
  treats: "🍰 Treats",
  experiences: "💫 Experiences",
  affirmations: "👑 Affirmations",
  physical: "🎁 Physical",
};

export function GiftAttachmentModal({
  isOpen,
  onClose,
  onSelectGift,
  userCoins,
  onPurchaseGift,
  ownedGifts,
  selectedGiftIds,
}: GiftAttachmentModalProps) {
  const [activeTab, setActiveTab] = useState<"vault" | "store">("vault");
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof giftCategories)[number]>("flowers");
  const [purchasingGiftId, setPurchasingGiftId] = useState<string | null>(null);

  const ownedGiftDetails = giftCatalog.filter((gift) =>
    ownedGifts.includes(gift.id)
  );
  const storeGifts = giftCatalog.filter(
    (gift) => gift.category === selectedCategory
  );

  const handlePurchaseAndAttach = (gift: GiftType) => {
    if (userCoins >= gift.coinCost) {
      setPurchasingGiftId(gift.id);
      setTimeout(() => {
        onPurchaseGift(gift);
        onSelectGift(gift);
        setPurchasingGiftId(null);
      }, 800);
    }
  };

  // const handlePurchase = (giftId: string, cost: number) => {
  //   if (userCoins >= cost) {
  //     setUserCoins((prev) => prev - cost);
  //     setOwnedGifts((prev) => [...prev, giftId]);
  //     return true;
  //   }
  //   return false;
  // };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="md:max-w-3xl max-h-[85vh] max-w-[95%] overflow-hidden flex flex-col p-0 gap-0 rounded">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-rose-100/90 via-purple-100/90 to-amber-100/90 border-b border-white/60 p-6">
          <div className="flex items-start justify-between">
            <div>
              <Badge variant="outline" className="mb-2 bg-white/50">
                Gift Selection
              </Badge>
              <DialogTitle className="text-xl text-left">
                Attach a Gift to Your Message
              </DialogTitle>
              <DialogDescription className="text-sm text-left mt-1">
                Choose from your vault or purchase new gifts to send
              </DialogDescription>
            </div>
            <div className="flex flex-col items-end gap-3">
              {/* <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-200 to-yellow-200 shadow-md">
                <Zap className="w-4 h-4 text-amber-700" />
                <span className="font-bold text-amber-900">{userCoins}</span>
              </div> */}
            </div>
          </div>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="border-b bg-white/60 p-4">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "vault" | "store")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-transparent p-0">
              <TabsTrigger
                value="vault"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-200 data-[state=active]:to-pink-200 data-[state=active]:shadow-md data-[state=active]:border-0 border border-white/60"
              >
                <Package className="w-4 h-4" />
                My Vault ({ownedGifts.length})
              </TabsTrigger>
              <TabsTrigger
                value="store"
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-200 data-[state=active]:to-indigo-200 data-[state=active]:shadow-md data-[state=active]:border-0 border border-white/60"
              >
                <ShoppingBag className="w-4 h-4" />
                Gift Store
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto flex-1 bg-gradient-to-br from-rose-50/30 to-purple-50/30">
          <Tabs value={activeTab} className="h-full">
            <TabsContent value="vault" className="h-full m-0 p-6">
              {ownedGiftDetails.length === 0 ? (
                <Card className="border-dashed border-2 bg-transparent border-foreground/20">
                  <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                    <Package className="w-20 h-20 text-foreground/20 mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Your Vault is Empty
                    </h3>
                    <p className="text-foreground/60 mb-6 max-w-md">
                      Purchase gifts from the Gift Store to add them to your
                      vault and attach them to messages
                    </p>
                    <Button
                      onClick={() => setActiveTab("store")}
                      className="rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Browse Gift Store
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  <Card className="bg-white/80 border-rose-200/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-rose-500" />
                        <p className="text-sm">
                          Click any gift to attach it to your message - no cost!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {ownedGiftDetails.map((gift) => {
                      const isSelected = selectedGiftIds.includes(gift.id);
                      return (
                        <Card
                          key={gift.id}
                          className={`group relative transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "border-rose-400 bg-gradient-to-br from-rose-100 to-pink-100 shadow-lg ring-2 ring-rose-300/50"
                              : "border-white/70 bg-white/90 hover:bg-gradient-to-br hover:from-white hover:to-rose-50/40 hover:shadow-md hover:border-rose-200"
                          } ${gift.rare ? "ring-1 ring-purple-300/50" : ""}`}
                          onClick={() => onSelectGift(gift)}
                        >
                          <CardContent className="p-4 text-center">
                            {isSelected && (
                              <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-rose-500 p-0 flex items-center justify-center shadow-md">
                                <Check className="w-4 h-4 text-white" />
                              </Badge>
                            )}
                            <div className="text-4xl mb-2 transition-transform group-hover:scale-110">
                              {gift.emoji}
                            </div>
                            <p className="font-semibold text-foreground text-xs">
                              {gift.name}
                            </p>
                            {gift.rare && (
                              <Badge
                                variant="secondary"
                                className="mt-2 bg-purple-100 text-purple-700 text-xs"
                              >
                                <Sparkles className="w-3 h-3 mr-1" />
                                Rare
                              </Badge>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="store" className="h-full m-0 p-6">
              <div className="space-y-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {giftCategories.map((category) => (
                    <Button
                      key={category}
                      variant={
                        selectedCategory === category ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-purple-300 to-indigo-300"
                          : ""
                      }`}
                    >
                      {categoryLabels[category]}
                    </Button>
                  ))}
                </div>

                {/* Store Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {storeGifts.map((gift) => {
                    const isOwned = ownedGifts.includes(gift.id);
                    const canAfford = userCoins >= gift.coinCost;
                    const isPurchasing = purchasingGiftId === gift.id;

                    return (
                      <GiftCard
                        key={gift.id}
                        gift={gift}
                        userCoins={userCoins}
                        isOwned={ownedGifts.includes(gift.id)}
                        onPurchase={undefined}
                      />
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <DialogFooter className="border-t border-border bg-white/80 p-4 rounded-b-3xl">
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">
              {activeTab === "vault"
                ? "Select gifts to attach"
                : "Purchase gifts to add to your vault"}
            </p>
            <Button
              onClick={onClose}
              variant="outline"
              className="rounded-full"
            >
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
