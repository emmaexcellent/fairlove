"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Coins, Gift, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { MessageCard } from "./message-card";
import { BackgroundTheme, LoveMessage, ReactionKey } from "./types";

interface MessageListProps {
  initialMessages?: LoveMessage[];
}

const mockMessages: LoveMessage[] = [
  {
    $id: "msg1",
    $createdAt: new Date().toISOString(),
    message:
      "The stars look brighter when you smile, even when it's just a text on my screen.",
    reaction: null,
    shares: 2,
  },
  {
    $id: "msg2",
    $createdAt: new Date(Date.now() - 86400000).toISOString(),
    message:
      "Tiny love-note drop: you are the soft place my heart lands, every single day.",
    reaction: "heart",
    shares: 5,
  },
  {
    $id: "msg3",
    $createdAt: new Date(Date.now() - 172800000).toISOString(),
    message:
      "Reminder for today: we are built of whispers, courage, and a thousand paper hearts.",
    reaction: "spark",
    shares: 1,
  },
];

export default function MessageList({
  initialMessages = mockMessages,
}: MessageListProps) {
  const [messages, setMessages] = useState<LoveMessage[]>(initialMessages);
  const [coins, setCoins] = useState(320);
  const [backgroundChoice, setBackgroundChoice] = useState<Record<string, string>>(
    {}
  );
  const [action, setAction] = useState<{
    id: string;
    type: "reaction" | "share" | "delete";
  } | null>(null);

  const backgroundThemes: BackgroundTheme[] = useMemo(
    () => [
      {
        id: "rose-dawn",
        label: "Rose dawn",
        css: "radial-gradient(circle at 12% 20%, rgba(255,182,193,0.4), transparent 25%), radial-gradient(circle at 85% 25%, rgba(255,240,245,0.55), transparent 30%), linear-gradient(135deg, #fff7f9 0%, #ffe1ec 50%, #fff7f2 100%)",
        emojis: ["✨", "💖"],
      },
      {
        id: "sky-lilac",
        label: "Sky lilac",
        css: "radial-gradient(circle at 18% 30%, rgba(186,230,253,0.45), transparent 26%), radial-gradient(circle at 82% 20%, rgba(216,180,254,0.4), transparent 28%), linear-gradient(135deg, #f5fbff 0%, #e4f2ff 55%, #f5f0ff 100%)",
        emojis: ["🌸", "🌙"],
      },
      {
        id: "peach-fizz",
        label: "Peach fizz",
        css: "radial-gradient(circle at 15% 15%, rgba(248,200,220,0.5), transparent 22%), radial-gradient(circle at 85% 12%, rgba(255,214,165,0.5), transparent 25%), linear-gradient(135deg, #fff8f3 0%, #ffe8f0 50%, #fdf2ff 100%)",
        emojis: ["🌹", "⭐"],
      },
      {
        id: "aurora",
        label: "Aurora glow",
        css: "radial-gradient(circle at 20% 30%, rgba(125,211,252,0.4), transparent 24%), radial-gradient(circle at 80% 25%, rgba(167,139,250,0.45), transparent 28%), linear-gradient(135deg, #f7fbff 0%, #eaf3ff 40%, #f4ecff 100%)",
        emojis: ["💫", "❤️"],
      },
    ],
    []
  );

  const reactionOptions: { key: ReactionKey; label: string; emoji: string }[] =
    [
      { key: "heart", label: "Heart", emoji: "❤️" },
      { key: "inLove", label: "In love", emoji: "😍" },
      { key: "spark", label: "Stardust", emoji: "💫" },
      { key: "rose", label: "Rose", emoji: "🌹" },
    ];

  const addCoins = (amount: number, reason: string) => {
    setCoins((prev) => prev + amount);
    toast.success(`+${amount} coins for ${reason}`);
  };

  const handleReaction = (messageId: string, reaction: ReactionKey) => {
    setAction({ id: messageId, type: "reaction" });
    const currentMessage = messages.find((msg) => msg?.$id === messageId);
    const isSameReaction = currentMessage?.reaction === reaction;

    setMessages((prev) =>
      prev.map((msg) => (msg?.$id === messageId ? { ...msg, reaction } : msg))
    );

    if (!isSameReaction) {
      addCoins(8, "reacting to a love note");
    }
    setAction(null);
  };

  const handleShare = async (message: LoveMessage, platform: string) => {
    setAction({ id: message.$id, type: "share" });
    const shareText = `${message.message} — Daily Love Note`;
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/love-notes`
        : "https://fairlove.app";

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Daily Love Note",
          text: shareText,
          url: shareUrl,
        });
      } else {
        const encoded = encodeURIComponent(`${shareText} ${shareUrl}`);
        if (platform === "whatsapp") {
          window.open(`https://wa.me/?text=${encoded}`, "_blank");
        } else if (platform === "x") {
          window.open(
            `https://twitter.com/intent/tweet?text=${encoded}`,
            "_blank"
          );
        } else if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
          toast.info("Copied note for Instagram — paste to share your vibe.");
        }
      }
      addCoins(12, "sharing outside the app");
      setMessages((prev) =>
        prev.map((msg) =>
          msg?.$id === message.$id
            ? { ...msg, shares: (msg.shares ?? 0) + 1 }
            : msg
        )
      );
    } catch (error) {
      toast.error("Could not share right now. Try again?");
    } finally {
      setAction(null);
    }
  };

  const handleDelete = async (messageId: string) => {
    setAction({ id: messageId, type: "delete" });
    const deleted = true;
    if (deleted) {
      setMessages((prev) => prev.filter((msg) => msg?.$id !== messageId));
      toast.success("Love note removed.");
    }
    setAction(null);
  };

  const handleRedeem = () => {
    toast.success("Opening vault — choose a gift to redeem.");
  };

  const handleBackgroundChange = (messageId: string, themeId: string) => {
    setBackgroundChoice((prev) => ({ ...prev, [messageId]: themeId }));
  };

  const pickTheme = (msg: LoveMessage, idx: number) => {
    const chosenId =
      backgroundChoice[msg.$id] ||
      msg.background ||
      backgroundThemes[idx % backgroundThemes.length].id;
    return (
      backgroundThemes.find((theme) => theme.id === chosenId) ||
      backgroundThemes[0]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-3xl border border-white/80 bg-gradient-to-r from-amber-50/90 via-white to-rose-50/80 p-3 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-inner shadow-rose-100">
              <Coins className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-foreground/50">
                Daily Love Note coins
              </p>
              <p className="text-2xl font-semibold text-foreground">
                {coins} coins
              </p>
              <p className="text-xs text-foreground/60">
                React or share to keep the streak glowing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="border-rose-200 bg-white/80 text-rose-700 hover:bg-rose-50"
              onClick={handleRedeem}
            >
              <Gift className="mr-2 h-4 w-4" />
              Redeem for gifts
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {messages.length === 0 && (
          <p className="col-span-full text-center text-foreground/60 bg-white/70 border border-white/60 rounded-2xl py-6">
            No love notes yet. Share a whisper to earn coins and unlock drops.
          </p>
        )}
        {messages.map((msg, idx) => {
          const createdDate = new Date(msg?.$createdAt).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "2-digit",
            }
          );
          const theme = pickTheme(msg, idx);

          return (
            <MessageCard
              key={msg?.$id}
              msg={msg}
              theme={theme}
              backgrounds={backgroundThemes}
              createdLabel={createdDate}
              reactionOptions={reactionOptions}
              action={action}
              onReaction={handleReaction}
              onShare={handleShare}
              onDelete={handleDelete}
              onBackgroundChange={handleBackgroundChange}
            />
          );
        })}
      </div>
    </div>
  );
}
