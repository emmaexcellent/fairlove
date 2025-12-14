"use client";

import { X } from "lucide-react";
import type { Gift as GiftType } from "@/lib/gift-data";

interface GiftPreviewCardProps {
  gift: GiftType;
  onRemove: () => void;
  isSelfGift?: boolean;
}

export function GiftPreviewCard({
  gift,
  onRemove,
  isSelfGift,
}: GiftPreviewCardProps) {
  return (
    <div className="rounded-2xl border border-white/70 bg-gradient-to-br from-rose-50/80 to-amber-50/80 p-4 shadow-sm animate-pop hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl animate-float">{gift.emoji}</span>
            <div>
              <p className="font-semibold text-foreground text-sm">
                {gift.name}
              </p>
              {isSelfGift && (
                <span className="inline-block mt-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                  💜 Self-Love Gift
                </span>
              )}
              {gift.rare && (
                <span className="inline-block mt-1 ml-2 px-2 py-1 rounded-full bg-purple-200/60 text-purple-700 text-xs font-medium">
                  ✨ Rare Gift
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-foreground/70 italic">{gift.message}</p>
        </div>
        <button
          onClick={onRemove}
          className="p-1.5 hover:bg-white/60 rounded-lg transition flex-shrink-0"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>
      </div>
    </div>
  );
}
