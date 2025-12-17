"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CoinDisplay } from "@/components/coins/coin-display";
import { PhysicalGiftsSection } from "@/components/gifts/physical-gifts-section";
import { GiftVault } from "@/components/gifts/gift-vault";
import { GiftStoreSection } from "@/components/gifts/gift-store-section";
import { useSearchParams } from "next/navigation";


const tabs = [
  {
    value: "store",
    label: "Virtual Gifts"
  },
  {
    value: "physical",
    label: "Physical Gifts"
  },
  {
    value: "vault",
    label: "My Vault"
  }
]

export default function GiftsPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("type");
  const [activeTab, setActiveTab] = useState(defaultTab || "store");
  const [userCoins, setUserCoins] = useState(500);
  const [userStreak] = useState(7);
  const [ownedGifts, setOwnedGifts] = useState<string[]>([]);


  const handlePurchase = (giftId: string, cost: number) => {
    if (userCoins >= cost) {
      setUserCoins((prev) => prev - cost);
      setOwnedGifts((prev) => [...prev, giftId]);
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-600">
            <Sparkles className="w-5 h-5" />
            <h1 className="text-xl font-bold">Gift Store</h1>
          </div>
        </div>

        {/* Coin Display */}
        <CoinDisplay coins={userCoins} streak={userStreak} />

        {/* Main Content */}
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 max-w-3xl mx-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} className={`py-2 ${tab.value === activeTab && "border border-primary"}`} value={tab.value} onClick={() => setActiveTab(tab.value)}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="store" className="mt-6">
            <GiftStoreSection
              userCoins={userCoins}
              ownedGifts={ownedGifts}
              onPurchase={handlePurchase}
            />
          </TabsContent>

          <TabsContent value="physical" className="mt-6">
            <PhysicalGiftsSection
              userCoins={userCoins}
              onPurchase={handlePurchase}
            />
          </TabsContent>

          <TabsContent value="vault" className="mt-6">
            <GiftVault ownedGifts={ownedGifts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
