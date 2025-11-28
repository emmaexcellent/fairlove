"use client";
import React, { useEffect, useState } from "react";
import MessageList from "@/components/anonymous-message/message-list";
import { useAuth } from "@/context/auth";
import { getMessageList } from "@/lib/appwrite/crud";
import { useRouter } from "next/navigation";
import { Models } from "node-appwrite";
import { Heart, Inbox, ShieldCheck, Sparkles } from "lucide-react";

export default function MessagesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Models.Document[] | []>([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login?redirect=/messages");
      return;
    }
    getMessageList(user.$id).then((data) => setMessages(data));
  }, [user, loading, router]);

  const lovedCount = messages.filter((m) => m.like).length;
  const dislikedCount = messages.filter((m) => m.dislike).length;

  return (
    <div className="min-h-screen py-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-6">
        <section className="relative overflow-hidden rounded-3xl bg-white/70 border border-white/60 p-6 shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-rose-200/60 to-sky-200/60 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-gradient-to-tr from-amber-200/50 to-purple-100/60 blur-3xl" />
          <div className="relative space-y-3">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              LoveVault
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold serif text-foreground">
              Saved whispers, notes, and secret admirations.
            </h1>
            <p className="text-foreground/70 max-w-3xl">
              A cozy gallery of anonymous love notes and memories. Glide through
              the gentle cards, react softly, and keep what resonates forever.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-rose-50/80 to-white/80 p-4 border border-white/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-rose-300 to-amber-200 flex items-center justify-center text-white shadow">
                  <Inbox className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Total whispers</p>
                  <p className="text-lg font-semibold text-foreground">
                    {messages.length}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-sky-50/80 to-white/80 p-4 border border-white/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-300 to-indigo-200 flex items-center justify-center text-white shadow">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Loved</p>
                  <p className="text-lg font-semibold text-foreground">
                    {lovedCount}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-purple-50/80 to-white/80 p-4 border border-white/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-300 to-rose-200 flex items-center justify-center text-white shadow">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-foreground/60">Saved</p>
                  <p className="text-lg font-semibold text-foreground">
                    {messages.length - dislikedCount}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-rose-50/70 to-sky-50/70 p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                Memory gallery
              </p>
              <h2 className="text-2xl font-semibold serif text-foreground">
                LoveVault feed
              </h2>
            </div>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <MessageList initialMessages={messages} />
        </section>
      </div>
    </div>
  );
}
