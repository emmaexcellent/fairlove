"use client";

import { Zap, Gift, Share2, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CoinDisplayProps {
  coins: number;
  streak: number;
}

export function CoinDisplay({ coins, streak }: CoinDisplayProps) {
  return (
    <Card className="rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-amber-900/70 uppercase tracking-wide">
            Your Coins
          </p>
          <p className="text-3xl font-bold text-amber-900 flex items-center gap-2">
            <Zap className="w-7 h-7 text-amber-700" />
            {coins}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-amber-900/70 uppercase">
            Current Streak
          </p>
          <p className="text-2xl font-bold text-amber-900 flex items-center gap-1 justify-end">
            <Flame className="w-5 h-5 text-orange-600" />
            {streak}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="rounded-lg bg-white/60 p-2 text-center">
          <Share2 className="w-4 h-4 mx-auto mb-1 text-rose-600" />
          <p className="font-medium text-foreground/80">Share +10</p>
        </div>
        <div className="rounded-lg bg-white/60 p-2 text-center">
          <Gift className="w-4 h-4 mx-auto mb-1 text-purple-600" />
          <p className="font-medium text-foreground/80">Daily +5</p>
        </div>
        <div className="rounded-lg bg-white/60 p-2 text-center">
          <Flame className="w-4 h-4 mx-auto mb-1 text-orange-600" />
          <p className="font-medium text-foreground/80">Streak x2</p>
        </div>
      </div>
    </Card>
  );
}
