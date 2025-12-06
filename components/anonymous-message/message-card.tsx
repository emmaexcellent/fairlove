"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Coins,
  Instagram,
  Loader2,
  Share2,
  Sparkles,
  Trash2,
  Twitter,
} from "lucide-react";
import html2canvas from "html2canvas";
import { BackgroundTheme, LoveMessage, ReactionKey } from "./types";
import { triggerEmojiConfetti } from "@/lib/helpers/confetti-shape";

interface ReactionOption {
  key: ReactionKey;
  label: string;
  emoji: string;
}

interface MessageCardProps {
  msg: LoveMessage;
  theme: BackgroundTheme;
  backgrounds: BackgroundTheme[];
  createdLabel: string;
  reactionOptions: ReactionOption[];
  action: { id: string; type: "reaction" | "share" | "delete" } | null;
  onReaction: (id: string, reaction: ReactionKey) => void;
  // onShare is no longer needed to build the image, but you can still use it
  // for analytics if you want (optional)
  onShare?: (msg: LoveMessage, platform: string) => void;
  onDelete: (id: string) => void;
  onBackgroundChange: (id: string, themeId: string) => void;
}

// 🔗 your watermark text (can be your website)
const WATERMARK_TEXT = "fectlove.com";

export function MessageCard({
  msg,
  theme,
  backgrounds,
  createdLabel,
  reactionOptions,
  action,
  onReaction,
  onShare,
  onDelete,
  onBackgroundChange,
}: MessageCardProps) {
  // This ref will be used to capture the card as an image
  const cardRef = useRef<HTMLDivElement | null>(null);

  // 🖼️ Turn the card into an image and share/download
  const handleShareAsImage = async (
    platform: "instagram" | "whatsapp" | "x"
  ) => {
    if (!cardRef.current) return;

    try {
      // Slight delay to ensure fonts/backgrounds/render finish
      await new Promise((r) => setTimeout(r, 50));

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // nicer quality
        useCORS: true,
      });

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/png")
      );

      if (!blob) return;

      const file = new File([blob], "paper-hearts-note.png", {
        type: "image/png",
      });

      // Prefer native share sheet on mobile
      if (
        typeof navigator !== "undefined" &&
        (navigator as any).canShare &&
        (navigator as any).canShare({ files: [file] })
      ) {
        await (navigator as any).share({
          files: [file],
          title: "Daily Love Note",
          text: `${msg?.message || "From Paper Hearts"}\n\n${WATERMARK_TEXT}`,
        });
      } else {
        // Fallback: download the image
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "paper-hearts-note.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      }

      // Optional: call your onShare for analytics/tracking
      if (onShare) {
        onShare(msg, platform);
      }
    } catch (error) {
      console.error("Error sharing card as image:", error);
    }
  };

  return (
    <div className="space-y-4 border border-primary/30 hover:border-primary/50 p-3 rounded-2xl shadow-sm hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-rose-200/80 border border-white/70 flex items-center justify-center text-sm font-semibold text-rose-700">
            ✦
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-foreground text-xs">Daily Love Note</p>
            </div>
            <p className="text-xs text-foreground/60">Dropped {createdLabel}</p>
          </div>
        </div>
        {/* <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(msg?.$id)}
          className="h-8 w-8 text-foreground/50 hover:text-rose-700"
        >
          {action?.id === msg?.$id && action?.type === "delete" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </Button> */}
      </div>

      {/* Inner card with background + emojis + message */}
      <div
        ref={cardRef}
        style={{ backgroundImage: theme.css }}
        className="relative overflow-hidden rounded-3xl border border-primary/10 p-4 bg-cover bg-center min-h-52 flex items-center justify-center"
      >
        {/* Floating emojis */}
        {theme.emojis?.length ? (
          <div className="pointer-events-none absolute inset-0 space-y-20">
            {theme.emojis.map((emoji, i) => (
              <span
                key={`${emoji}-${i}`}
                className="absolute text-xl opacity-50 animate-bounce"
                style={{
                  top: `${10 + ((i * 25) % 70)}%`,
                  left: `${50 + ((i * 30) % 70)}%`,
                  transform: `rotate(${i * 8}deg)`,
                }}
              >
                {emoji}
              </span>
            ))}
          </div>
        ) : null}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/70 pointer-events-none" />

        {/* Soft glow */}
        <div className="absolute -left-6 -bottom-6 h-28 w-28 rounded-full bg-rose-100/50 blur-3xl" />

        {/* Watermark (this will appear in the shared image) */}
        <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.2em] text-foreground/60">
          {WATERMARK_TEXT}
        </div>

        {/* Message content */}
        <div className="relative px-4">
          <p className="text-xl font-semibold text-foreground leading-relaxed text-center font-courgette">
            {msg?.message}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-3">
        {/* Stats */}
        <div className="flex items-center justify-end gap-5 text-xs text-foreground/60">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 border border-white/70">
            <Sparkles className="h-3 w-3 text-amber-500" />
            {msg?.shares ?? 0} shares
          </div>
          <div className="inline-flex items-center gap-1 text-foreground/70">
            <Coins className="h-3 w-3 text-amber-500" />
            +8 react
          </div>
        </div>

        {/* Backgrounds */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">
            Backgrounds
          </p>
          <div className="flex flex-wrap gap-2">
            {backgrounds.map((themeOption) => {
              const isActive = themeOption.id === theme.id;
              return (
                <button
                  key={themeOption.id}
                  onClick={() => onBackgroundChange(msg?.$id, themeOption.id)}
                  className={`h-8 w-16 rounded-xl border text-[11px] font-semibold transition hover:-translate-y-0.5 ${
                    isActive
                      ? "border-rose-400 shadow-md"
                      : "border-white/70 shadow-sm"
                  }`}
                  style={{ backgroundImage: themeOption.css }}
                >
                  {themeOption.label.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reactions */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border px-3 py-2">
          {reactionOptions.map((option) => {
            const isActive = msg?.reaction === option.key;
            const isLoading =
              action?.id === msg?.$id &&
              action?.type === "reaction" &&
              isActive;

            return (
              <Button
                key={option.key}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  onReaction(msg?.$id, option.key);
                  triggerEmojiConfetti(option.emoji);
                }}
                className={`h-10 px-3 text-sm ${
                  isActive
                    ? "bg-rose-500/20 text-white hover:bg-rose-600/20"
                    : "text-foreground/70 hover:text-rose-700"
                }`}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <span className="mr-1 text-xl">{option.emoji}</span>
                )}
              </Button>
            );
          })}
        </div>

        {/* Share buttons */}
        <div className="flex items-center justify-end gap-2 overflow-x-auto">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 text-foreground/70 hover:text-rose-700"
            onClick={() => handleShareAsImage("instagram")}
          >
            <Instagram className="mr-2 h-4 w-4" /> Instagram
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 text-foreground/70 hover:text-rose-700"
            onClick={() => handleShareAsImage("whatsapp")}
          >
            <Share2 className="mr-2 h-4 w-4" /> WhatsApp
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 text-foreground/70 hover:text-rose-700"
            onClick={() => handleShareAsImage("x")}
          >
            <Twitter className="mr-2 h-4 w-4" /> X
          </Button>
        </div>
      </div>
    </div>
  );
}
