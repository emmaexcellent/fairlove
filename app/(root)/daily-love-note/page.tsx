"use client";

import React, { useEffect, useState } from "react";
import MessageList from "@/components/anonymous-message/message-list";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function DailyLoveNotePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    const res = localStorage.getItem("love-note-collapsible");
    let collapsibleStatus = false;

    if (res !== null) {
      try {
        collapsibleStatus = JSON.parse(res);
      } catch (err) {
        console.log("error: ", err)
        collapsibleStatus = false;
      }
    }

    if (!collapsibleStatus) {
      setCollapsed(false);
      localStorage.setItem("love-note-collapsible", JSON.stringify(true));
    }
  }, []);


  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login?redirect=/daily-love-note");
      return;
    }
    // getMessageList(user.$id).then((data) => setMessages(data));
  }, [user, loading, router]);

  const toggleCollapsed = () => setCollapsed((prev) => !prev);

  return (
    <div className="min-h-screen py-8 pt-28">
      <div className="max-w-6xl mx-auto space-y-6">
        <section
          className={`relative overflow-hidden rounded-3xl border border-white/70 shadow transition-all duration-300 ${
            collapsed
              ? "sticky top-16 z-20 bg-white/80 p-3"
              : "bg-gradient-to-br from-amber-50/90 via-white to-rose-50/80 p-6"
          }`}
        >
          <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-rose-200/70 to-sky-200/70 blur-3xl" />
          <div className="absolute -left-12 bottom-0 h-40 w-40 rounded-full bg-gradient-to-tr from-amber-200/60 to-purple-100/70 blur-3xl" />
          <div className="relative">
            {collapsed ? (
              <button
                type="button"
                onClick={toggleCollapsed}
                className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white/90 px-3 py-2 text-left shadow-sm"
              >
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-foreground/60">
                    Daily Love Note
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    Love drops, coins, shares, vault.
                  </p>
                </div>
                <ChevronUp className="h-4 w-4 text-foreground/60" />
              </button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                    Daily Love Note
                  </p>
                  <button
                    type="button"
                    onClick={toggleCollapsed}
                    className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs text-foreground/70 border border-white/60 hover:text-foreground"
                  >
                    Collapse
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>
                <h1 className="text-3xl md:text-4xl font-semibold serif text-foreground">
                  Daily love drops, fresh every day.
                </h1>
                <p className="text-foreground/70 max-w-3xl">
                  React with emojis, share, and stack coins to redeem gifts in
                  the vault.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm text-foreground border border-white/70">
                    <Heart className="w-4 h-4 text-rose-500" />
                    Emoji reactions earn coins
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm text-foreground border border-white/70">
                    <Share2 className="w-4 h-4 text-amber-500" />
                    Share to unlock extra rewards
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm text-foreground border border-white/70">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Redeem in vault anytime
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/60 bg-white/80 p-4 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                Daily feed
              </p>
              <h2 className="text-2xl font-semibold serif text-foreground">
                Today&apos;s love notes
              </h2>
            </div>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <MessageList />
        </section>
      </div>
    </div>
  );
}
