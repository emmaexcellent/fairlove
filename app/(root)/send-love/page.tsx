"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sparkles,
  Send,
  Wand2,
  Gift,
  Sticker,
  Heart,
  Loader2,
  Save,
  Trash2,
} from "lucide-react";

// Components & Types
import { GiftAttachmentModal } from "@/components/gifts/send/gift-attachment-modal";
import { GiftPreviewCard } from "@/components/gifts/send/gift-preview-card";
import { SendModal } from "@/components/gifts/send/send-modal";
import type { Gift as GiftType } from "@/lib/gift-data";
import { refineMessage } from "@/lib/ai/message";

const themes = [
  {
    id: "rose",
    name: "Rose Dawn",
    gradient: "from-rose-200 via-fuchsia-100 to-amber-100",
    badge: "Poetic & Warm",
  },
  {
    id: "lavender",
    name: "Lavender Haze",
    gradient: "from-violet-200 via-sky-100 to-white",
    badge: "Dreamy & Calm",
  },
  {
    id: "blue",
    name: "Moonlit Blue",
    gradient: "from-sky-200 via-indigo-100 to-white",
    badge: "Serene & Reflective",
  },
];

const stickers = ["🌸", "💌", "🕯️", "✨", "🌙", "🎀", "🪄"];

export default function ComposerPage() {
  // State
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [message, setMessage] = useState(
    "Dear love, I hope this note feels like warm sunlight after the rain..."
  );
  const [chosenSticker, setChosenSticker] = useState(stickers[0]);
  const [selectedGifts, setSelectedGifts] = useState<GiftType[]>([]);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);

  // UX State
  const [isRefining, setIsRefining] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [userCoins] = useState(500); // Mock state
  const [ownedGifts, setOwnedGifts] = useState<string[]>([
    "rose",
    "chocolate",
    "heart",
  ]);

  // AI Logic: Call Gemini API
  const handleAIRefine = async () => {
    if (!message.trim() || message.length < 5) return;
    setIsRefining(true);
    try {
      const response = await refineMessage(message, selectedTheme.badge)
      if (response?.text) setMessage(response.text);
    } catch (error) {
      console.error("AI Refinement failed", error);
    } finally {
      setIsRefining(false);
    }
  };

  const handleInsert = (text: string) => {
    setMessage((prev) => `${prev.trim()} ${text}`.trim());
  };

  const handlePurchaseGift = (gift: GiftType) => {
    if (userCoins >= gift.coinCost && !ownedGifts.includes(gift.id)) {
      setOwnedGifts((prev) => [...prev, gift.id]);
    }
  };

  const handleSend = async () => {
    setIsSending(true);
    // Simulate network delay for "Smooth" feel
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setSendModalOpen(true);
    setIsSending(false);
  };

  return (
    <div className="max-w-6xl mx-auto relative space-y-8 pt-20 px-4 md:px-6 pb-20">
      {/* Dynamic Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className={`absolute inset-x-0 top-6 mx-auto h-64 max-w-4xl bg-gradient-to-r ${selectedTheme.gradient} blur-3xl rounded-full -z-10`}
      />

      <header className="space-y-3">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.25em] text-foreground/60"
        >
          Message Composer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-semibold tracking-tight text-foreground"
        >
          Craft your heartbeat into words.
        </motion.h1>
      </header>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
        {/* LEFT: Writing Area */}
        <div className="space-y-6">
          <section className="rounded-3xl bg-white/60 border border-white/80 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Wand2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium">Editor</span>
              </div>
              <span className="text-[10px] bg-white/80 px-2 py-1 rounded-full border border-black/5 shadow-sm">
                {message.length} chars
              </span>
            </div>

            <div className="relative group overflow-hidden rounded-2xl">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isRefining}
                className={`min-h-[250px] text-lg leading-relaxed border-none bg-white/40 focus-visible:ring-0 rounded-2xl p-4 resize-none transition-all duration-700 ${
                  isRefining
                    ? "blur-[2px] opacity-50 scale-[0.99]"
                    : "focus:bg-white/80"
                }`}
                placeholder="Write your love letter..."
              />

              {/* Over-the-input Loading State */}
              <AnimatePresence>
                {isRefining && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/10 backdrop-blur-[4px]"
                  >
                    {/* Animated Glow Ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute w-32 h-32 border-t-2 border-b-2 border-primary/30 rounded-full"
                    />

                    {/* Floating Sparkles & Text */}
                    <div className="relative flex flex-col items-center gap-3">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Heart className="w-8 h-8 text-primary fill-primary/20" />
                      </motion.div>
                      <div className="flex flex-col items-center">
                        <div className="flex gap-1 mt-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                              className="w-1 h-1 bg-primary rounded-full"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI Button - Hidden during refinement to keep UI clean */}
              {!isRefining && (
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleAIRefine}
                    className="rounded-full shadow-lg border border-primary/20 bg-white/90 hover:bg-white transition-all hover:scale-105"
                  >
                    <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
                    Polish with AI
                  </Button>
                </div>
              )}
            </div>

            {/* Sticker Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-black/5 pt-6">
              {stickers.map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setChosenSticker(s)}
                  className={`text-2xl p-2 rounded-xl transition-colors ${
                    chosenSticker === s
                      ? "bg-primary/10 shadow-inner"
                      : "hover:bg-black/5"
                  }`}
                >
                  {s}
                </motion.button>
              ))}
              <div className="h-8 w-[1px] bg-black/5 mx-2" />
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-dashed"
                onClick={() => handleInsert(chosenSticker)}
              >
                <Sticker className="w-4 h-4 mr-2" /> Insert
              </Button>
            </div>
          </section>

          {/* Theme Selector */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={`relative overflow-hidden rounded-2xl border-2 p-4 text-left transition-all ${
                  selectedTheme.id === theme.id
                    ? "border-primary shadow-lg scale-[1.02]"
                    : "border-white/80 grayscale-[40%]"
                } bg-gradient-to-br ${theme.gradient}`}
              >
                <p className="font-bold text-sm">{theme.name}</p>
                <p className="text-[10px] opacity-70 italic">{theme.badge}</p>
                {selectedTheme.id === theme.id && (
                  <Heart className="absolute -bottom-2 -right-2 w-12 h-12 text-primary/10 rotate-12" />
                )}
              </button>
            ))}
          </section>
        </div>

        {/* RIGHT: Live Preview & Actions */}
        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            <motion.div
              layout
              className={`rounded-[2.5rem] p-8 shadow-2xl border border-white/50 bg-gradient-to-br ${selectedTheme.gradient} min-h-[400px] flex flex-col`}
            >
              <div className="flex-1">
                <Heart className="w-6 h-6 text-primary mb-6 animate-pulse" />
                <p className="serif text-xl text-foreground/90 leading-relaxed italic whitespace-pre-wrap">
                  {message} {chosenSticker}
                </p>
              </div>

              <AnimatePresence>
                {selectedGifts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-black/10"
                  >
                    {selectedGifts.map((gift, idx) => (
                      <motion.div
                        key={idx}
                        layout
                        className="flex items-center gap-1 bg-white/60 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium border border-white"
                      >
                        <span>{gift.emoji}</span>
                        <button
                          onClick={() =>
                            setSelectedGifts((prev) =>
                              prev.filter((_, i) => i !== idx)
                            )
                          }
                        >
                          <Trash2 className="w-3 h-3 text-muted-foreground hover:text-destructive" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <div className="space-y-3">
              <Button
                onClick={() => setGiftModalOpen(true)}
                variant="secondary"
                className="w-full h-12 rounded-2xl bg-white/80 hover:bg-white border border-black/5"
              >
                <Gift className="w-4 h-4 mr-2 text-primary" />
                Attach Digital Gifts ({selectedGifts.length})
              </Button>

              <Button
                onClick={handleSend}
                disabled={isSending}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition-all active:scale-[0.98]"
              >
                {isSending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send with Glow
                  </>
                )}
              </Button>

              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-primary"
              >
                <Save className="w-4 h-4 mr-2" /> Save to Drafts
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <SendModal
        isOpen={sendModalOpen}
        onClose={() => setSendModalOpen(false)}
        message={message}
        selectedGifts={selectedGifts}
        selectedTheme={selectedTheme}
        chosenSticker={chosenSticker}
      />

      <GiftAttachmentModal
        isOpen={giftModalOpen}
        onClose={() => setGiftModalOpen(false)}
        onSelectGift={(gift) => setSelectedGifts([...selectedGifts, gift])}
        userCoins={userCoins}
        onPurchaseGift={handlePurchaseGift}
        ownedGifts={ownedGifts}
        selectedGiftIds={selectedGifts.map((g) => g.id)}
      />
    </div>
  );
}
