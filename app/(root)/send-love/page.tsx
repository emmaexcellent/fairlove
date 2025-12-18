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
  Star,
  Heart,
  Loader2,
  Save,
  Trash2,
  Snowflake,
  Trees,
  CandyCane,
  Bell,
} from "lucide-react";

// Components & Types
import { GiftAttachmentModal } from "@/components/gifts/send/gift-attachment-modal";
import { SendModal } from "@/components/gifts/send/send-modal";
import type { Gift as GiftType } from "@/lib/gift-data";
import { refineMessage } from "@/lib/ai/message";

const themes = [
  {
    id: "nordic",
    name: "Nordic Winter",
    gradient: "from-blue-50 via-white to-emerald-50",
    badge: "Elegant & Crisp",
    icon: <Snowflake className="w-4 h-4" />,
    color: "text-blue-600",
  },
  {
    id: "hearth",
    name: "Hearth Glow",
    gradient: "from-amber-50 via-orange-50 to-red-50",
    badge: "Warm & Cozy",
    icon: <Trees className="w-4 h-4" />,
    color: "text-amber-600",
  },
  {
    id: "velvet",
    name: "Velvet Night",
    gradient: "from-indigo-50 via-purple-50 to-rose-50",
    badge: "Luxurious & Magical",
    icon: <Star className="w-4 h-4" />,
    color: "text-purple-600",
  },
];

const stickers = ["🎄", "❄️", "🎁", "✨", "🦌", "🌟", "🕯️"];

export default function ChristmasComposerPage() {
  // State
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [message, setMessage] = useState(
    "Dearest, as snow blankets the world outside, my heart warms thinking of you... May this season fill your days with joy and your nights with starlight."
  );
  const [chosenSticker, setChosenSticker] = useState(stickers[0]);
  const [selectedGifts, setSelectedGifts] = useState<GiftType[]>([]);
  const [giftModalOpen, setGiftModalOpen] = useState(false);
  const [sendModalOpen, setSendModalOpen] = useState(false);

  // UX State
  const [isRefining, setIsRefining] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [userCoins] = useState(750); // Mock state
  const [ownedGifts, setOwnedGifts] = useState<string[]>([
    "snowglobe",
    "ornament",
    "cocoa",
  ]);

  // AI Logic: Call Gemini API
  const handleAIRefine = async () => {
    if (!message.trim() || message.length < 5) return;
    setIsRefining(true);
    try {
      const response = await refineMessage(
        message,
        selectedTheme.badge,
        // "christmas"
      );
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


  return (
    <div className="max-w-6xl mx-auto relative space-y-8 pt-20 px-4 md:px-6 pb-20">
      {/* Snowfall Animation Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-200/30 rounded-full"
            initial={{ y: -20, x: Math.random() * 100 }}
            animate={{
              y: ["0vh", "100vh"],
              x: [Math.random() * 100, Math.random() * 100 + 50],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Dynamic Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className={`absolute inset-x-0 top-6 mx-auto h-64 max-w-4xl bg-gradient-to-r ${selectedTheme.gradient} blur-3xl rounded-full -z-10`}
      />

      <header className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <span className="text-xs uppercase tracking-[0.3em] text-amber-600 font-medium">
            Christmas Edition
          </span>
          <div className="w-6 h-[1px] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm uppercase tracking-[0.2em] text-foreground/70"
        >
          Festive Message Composer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-amber-700 via-red-600 to-emerald-700 bg-clip-text text-transparent"
        >
          Wrap Your Warmest Wishes
        </motion.h1>
        <p className="text-foreground/70 text-sm max-w-2xl mx-auto">
          Craft heartfelt holiday messages adorned with digital cheer. Perfect
          for spreading joy across the miles.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-8">
        {/* LEFT: Writing Area */}
        <div className="space-y-6">
          <section className="rounded-3xl bg-white/80 border border-white shadow-xl backdrop-blur-md overflow-hidden">
            {/* Editor Header */}
            <div className="px-6 pt-6 pb-4 border-b border-black/5 bg-gradient-to-r from-white to-white/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl bg-gradient-to-br ${selectedTheme.gradient} shadow-sm`}
                  >
                    <Wand2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Festive Editor</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedTheme.name} • {selectedTheme.badge}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                    {message.length} characters
                  </span>
                </div>
              </div>
            </div>

            {/* Textarea Area */}
            <div className="relative group p-6">
              <div className="relative overflow-hidden rounded-2xl border border-black/5">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isRefining}
                  className={`min-h-[280px] text-lg leading-relaxed border-none bg-white/50 focus-visible:ring-0 rounded-2xl p-6 resize-none transition-all duration-500 font-serif ${
                    isRefining
                      ? "blur-[2px] opacity-50 scale-[0.99]"
                      : "focus:bg-white/80"
                  }`}
                  placeholder="Write your holiday message... Share your warmest wishes, fond memories, and hopes for the new year."
                />

                {/* Christmas-themed Loading State */}
                <AnimatePresence>
                  {isRefining && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-md"
                    >
                      <div className="relative flex flex-col items-center justify-center">
                        {/* Rotating Ornament */}
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-20 h-20 rounded-full border-4 border-amber-200 border-t-amber-500 border-b-amber-500"
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                          </div>
                        </motion.div>

                        {/* Floating Text */}
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="mt-6 text-center"
                        >
                          <p className="font-semibold text-amber-700">
                            Sprinkling holiday magic...
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Adding festive cheer to your words
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Button */}
                {!isRefining && (
                  <div className="absolute bottom-6 right-6">
                    <Button
                      size="sm"
                      onClick={handleAIRefine}
                      className="rounded-full shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all hover:scale-105 border border-amber-400"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Add Festive Magic
                    </Button>
                  </div>
                )}
              </div>

              {/* Festive Sticker Bar */}
              <div className="mt-8 pt-6 border-t border-black/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <CandyCane className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium">
                      Festive Embellishments
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Click to select, then insert
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {stickers.map((s) => (
                    <motion.button
                      key={s}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setChosenSticker(s)}
                      className={`text-2xl p-3 rounded-xl transition-all duration-300 ${
                        chosenSticker === s
                          ? "bg-gradient-to-br from-amber-100 to-red-100 shadow-inner border border-amber-200 scale-110"
                          : "hover:bg-black/5 bg-white/50 border border-transparent"
                      }`}
                    >
                      {s}
                    </motion.button>
                  ))}
                  <div className="h-8 w-[1px] bg-gradient-to-b from-transparent via-black/10 to-transparent mx-2" />
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-dashed border-amber-300 text-amber-700 hover:text-amber-800 hover:bg-amber-50"
                    onClick={() => handleInsert(chosenSticker)}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Insert Embellishment
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Theme Selector */}
          <section>
            <h3 className="text-sm font-medium mb-4 text-foreground/80">
              Select Your Theme
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme)}
                  className={`relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all duration-300 group ${
                    selectedTheme.id === theme.id
                      ? "border-amber-500 shadow-lg scale-[1.02] ring-2 ring-amber-500/20"
                      : "border-white/80 hover:border-amber-200 hover:shadow-md"
                  } bg-gradient-to-br ${theme.gradient}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`p-2 rounded-lg bg-white/80 ${theme.color}`}
                    >
                      {theme.icon}
                    </div>
                    {selectedTheme.id === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center"
                      >
                        <Star className="w-3 h-3 text-white fill-white" />
                      </motion.div>
                    )}
                  </div>
                  <p className="font-bold text-foreground">{theme.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {theme.badge}
                  </p>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-4 -right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    {theme.id === "nordic" && (
                      <Snowflake className="w-16 h-16" />
                    )}
                    {theme.id === "hearth" && <Trees className="w-16 h-16" />}
                    {theme.id === "velvet" && <Star className="w-16 h-16" />}
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT: Live Preview & Actions */}
        <aside className="space-y-6">
          <div className="sticky top-24 space-y-6">
            {/* Preview Card */}
            <motion.div
              layout
              className={`rounded-[2.5rem] p-8 shadow-2xl border-2 border-white/80 relative overflow-hidden bg-gradient-to-br ${selectedTheme.gradient} min-h-[420px] flex flex-col`}
            >
              {/* Corner Accents */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-amber-500/30 rounded-br-2xl" />

              {/* Preview Content */}
              <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                <div className="mb-8 flex items-center gap-3">
                  <div className="p-1.5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 shadow-lg">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="text-sm font-medium text-amber-700">
                    Holiday Greetings
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl" />
                  <p className="font-courgette text-xl text-foreground/90 leading-relaxed italic whitespace-pre-wrap text-center max-w-xl relative z-10 bg-white/20 p-6 rounded-3xl backdrop-blur-sm">
                    {message} {chosenSticker}
                  </p>
                </div>

                <div className="mt-8 text-xs text-muted-foreground text-center">
                  <p>Wishing you warmth and joy this holiday season</p>
                </div>
              </div>

              {/* Attached Gifts */}
              <AnimatePresence>
                {selectedGifts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 pt-6 border-t border-white/30"
                  >
                    <p className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Attached Festive Gifts
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedGifts.map((gift, idx) => (
                        <motion.div
                          key={idx}
                          layout
                          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium border border-white shadow-sm"
                        >
                          <span className="text-lg">{gift.emoji}</span>
                          <span className="text-xs">{gift.name}</span>
                          <button
                            onClick={() =>
                              setSelectedGifts((prev) =>
                                prev.filter((_, i) => i !== idx)
                              )
                            }
                            className="ml-1 hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-3 h-3 text-muted-foreground hover:text-red-500" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={() => setGiftModalOpen(true)}
                variant="outline"
                className="w-full h-12 rounded-2xl bg-white/90 hover:bg-white border-2 border-dashed border-amber-300 text-amber-700 hover:text-amber-800 hover:border-amber-400 transition-all group"
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="p-1 rounded-lg bg-amber-100 group-hover:bg-amber-200 transition-colors">
                    <Gift className="w-4 h-4" />
                  </div>
                  <span>Attach Digital Gifts</span>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    {selectedGifts.length} selected
                  </span>
                </div>
              </Button>

              <Button
                onClick={() => setSendModalOpen(true)}
                disabled={isSending}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-600/60 via-red-500 to-primary text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="relative flex items-center justify-center gap-3">
                  {isSending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span className="font-semibold">Send Holiday Cheer</span>
                    </>
                  )}
                </div>
              </Button>

              <div className="flex gap-3">
                <Button
                  variant="ghost"
                  className="flex-1 h-11 rounded-xl text-muted-foreground hover:text-amber-600 hover:bg-amber-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 h-11 rounded-xl text-muted-foreground hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Festive Counter */}
            <div className="pt-6 border-t border-black/5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Your Festive Balance
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  <span className="font-semibold">{userCoins} Magic Coins</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Use coins to attach special holiday gifts and effects
              </p>
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
        // isChristmasEdition={true}
      />

      <GiftAttachmentModal
        isOpen={giftModalOpen}
        onClose={() => setGiftModalOpen(false)}
        onSelectGift={(gift) => setSelectedGifts([...selectedGifts, gift])}
        userCoins={userCoins}
        onPurchaseGift={handlePurchaseGift}
        ownedGifts={ownedGifts}
        selectedGiftIds={selectedGifts.map((g) => g.id)}
        // isChristmasEdition={true}
      />
    </div>
  );
}
