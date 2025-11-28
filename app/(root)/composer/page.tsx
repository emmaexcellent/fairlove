"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Wand2, Gift, Sticker, Heart } from "lucide-react";

const themes = [
  {
    id: "rose",
    name: "Rose Dawn",
    gradient: "from-rose-200 via-fuchsia-100 to-amber-100",
    badge: "Warm & poetic",
  },
  {
    id: "lavender",
    name: "Lavender Haze",
    gradient: "from-violet-200 via-sky-100 to-white",
    badge: "Dreamy & calm",
  },
  {
    id: "blue",
    name: "Moonlit Blue",
    gradient: "from-sky-200 via-indigo-100 to-white",
    badge: "Serene & reflective",
  },
];

const prompts = [
  "Write a gentle check-in for someone who had a long day.",
  "Craft a nostalgic memory about your favorite shared moment.",
  "Send a soft affirmation with gratitude and care.",
];

const stickers = ["🌸", "💌", "🕯️", "✨", "🌙", "🎀", "🪄"];

export default function ComposerPage() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [message, setMessage] = useState(
    "Dear love, I hope this note feels like warm sunlight after the rain..."
  );
  const [chosenSticker, setChosenSticker] = useState(stickers[0]);

  const handleInsert = (text: string) => {
    setMessage((prev) => `${prev.trim()} ${text}`.trim());
  };

  return (
    <div className="relative space-y-8">
      <div className="absolute inset-x-0 top-6 mx-auto h-56 max-w-4xl bg-gradient-to-r from-rose-200/40 via-purple-100/40 to-amber-100/40 blur-3xl rounded-full -z-10" />
      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
          Message Composer
        </p>
        <h1 className="text-4xl font-semibold serif text-foreground">
          Write beautiful notes with AI assist and romantic themes.
        </h1>
        <p className="text-foreground/70 text-lg max-w-3xl">
          Choose a vibe, sprinkle stickers and digital gifts, and let FairLove
          help you express what the heart feels but words sometimes miss.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="space-y-4 rounded-3xl bg-white/70 border border-white/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Writing</p>
              <p className="text-xs text-foreground/60">
                Smooth micro-interactions, live character count, and soft glow.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-200 to-amber-100 px-4 py-2 text-xs text-foreground shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              {message.length} chars
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-white via-rose-50/60 to-sky-50/60 border border-white/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Wand2 className="w-4 h-4 text-primary" />
                AI assist on
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full bg-white/80 text-sm"
                onClick={() =>
                  handleInsert("Let me hold space for your feelings tonight.")
                }
              >
                Insert warmth
              </Button>
            </div>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[200px] border-white/70 bg-white/80 text-foreground focus-visible:ring-primary/40"
              placeholder="Write your love letter..."
            />
            <div className="flex flex-wrap gap-2 text-sm text-foreground/70">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleInsert(prompt)}
                  className="rounded-full border border-white/60 bg-white/70 px-3 py-2 shadow-sm hover:shadow-md transition"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={`rounded-2xl border ${
                  selectedTheme.id === theme.id
                    ? "border-primary shadow-lg"
                    : "border-white/70"
                } bg-gradient-to-br ${theme.gradient} p-4 text-left transition hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{theme.name}</p>
                  {selectedTheme.id === theme.id && (
                    <Heart className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="text-xs text-foreground/70 mt-2">{theme.badge}</p>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {stickers.map((sticker) => (
              <button
                key={sticker}
                onClick={() => setChosenSticker(sticker)}
                className={`h-10 w-10 rounded-2xl border border-white/60 bg-white/80 text-lg shadow-sm transition hover:shadow-lg ${
                  chosenSticker === sticker ? "ring-2 ring-primary/50" : ""
                }`}
              >
                {sticker}
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 rounded-full bg-white/70"
              onClick={() => handleInsert(chosenSticker)}
            >
              <Sticker className="w-4 h-4 text-primary" />
              Add sticker
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 rounded-full bg-white/70"
              onClick={() => handleInsert("Sending you a tiny digital gift 🎁")}
            >
              <Gift className="w-4 h-4 text-primary" />
              Add digital gift
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300 text-white shadow-lg">
              <Send className="w-4 h-4 mr-2" />
              Send with glow
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/70 bg-white/80 text-foreground"
            >
              Save to LoveVault
            </Button>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl bg-gradient-to-br from-sky-50/90 via-white to-rose-50/90 border border-white/60 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">
              Preview with {selectedTheme.name}
            </p>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div
            className={`rounded-2xl border border-white/70 bg-gradient-to-br ${selectedTheme.gradient} p-4 space-y-3 shadow-md`}
          >
            <div className="flex items-center gap-2 text-sm text-foreground/70">
              <Heart className="w-4 h-4 text-primary" />
              Nostalgic romance preview
            </div>
            <div className="rounded-xl bg-white/80 border border-white/60 p-3 text-sm text-foreground/80 min-h-[140px]">
              {message} {chosenSticker}
            </div>
            <div className="flex items-center justify-between text-xs text-foreground/60">
              <span>AI assist ready</span>
              <span>Ambient glow + faint sparkles</span>
            </div>
          </div>
          <div className="rounded-2xl bg-white/80 border border-white/60 p-4 space-y-3">
            <p className="text-sm font-semibold text-foreground">
              Emotional layers
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-rose-100 px-3 py-2 text-primary">
                Kindness
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-2 text-purple-700">
                Nostalgia
              </span>
              <span className="rounded-full bg-sky-100 px-3 py-2 text-sky-700">
                Safety
              </span>
            </div>
            <p className="text-sm text-foreground/70">
              Layer themes, stickers, and gifts to create a mobile-ready
              experience that feels intimate and safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
