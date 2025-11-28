import Link from "next/link";
import {
  Feather,
  Heart,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Stars,
  Wand2,
} from "lucide-react";

const reminders = [
  {
    title: "Tender Reminder",
    mood: "Gentle warmth",
    text: "Love is unhurried. Give yourself and your person time to bloom.",
  },
  {
    title: "Soft Gratitude",
    mood: "Nostalgic",
    text: "Write down one memory you never want to forget. Revisit it tonight.",
  },
  {
    title: "Breathwork Moment",
    mood: "Calming",
    text: "Inhale for 4, exhale for 6. Whisper something kind to your heart.",
  },
];

const moods = [
  {
    label: "Dreamy",
    note: "Send a note with lavender glow and a line of poetry.",
    gradient: "from-violet-100 to-sky-100",
  },
  {
    label: "Sunlit",
    note: "Celebrate tiny wins with warm gold confetti and stickers.",
    gradient: "from-amber-100 to-rose-50",
  },
  {
    label: "Deep",
    note: "Hold space with a quiet voice note and candle-light theme.",
    gradient: "from-slate-100 to-purple-50",
  },
];

const vaultMoments = [
  {
    title: "Polaroid smile",
    type: "Photo",
    detail: "Saved to LoveVault • 2d ago",
  },
  {
    title: "Sunday letter",
    type: "Note",
    detail: "Pinned with a rose seal",
  },
  {
    title: "Soft hum",
    type: "Voice",
    detail: "13s whisper • lavender filter",
  },
  {
    title: "Blue dusk",
    type: "Memory",
    detail: "Dreamy blue overlay • keepsake",
  },
];

const aiPrompts = [
  "Compose a gentle apology with warm reassurance.",
  "Write a two-line poem about holding hands in the rain.",
  "Draft a comforting check-in for someone overwhelmed.",
];

const themePresets = [
  { name: "Rose Dawn", gradient: "from-rose-200 via-amber-100 to-white" },
  { name: "Lavender Haze", gradient: "from-violet-200 via-sky-100 to-white" },
  { name: "Moonlit Blue", gradient: "from-sky-200 via-indigo-100 to-white" },
];

export default async function Home() {
  return (
    <div className="relative space-y-14">
      <div className="absolute inset-x-0 top-10 mx-auto h-64 max-w-5xl bg-gradient-to-r from-rose-200/50 via-indigo-100/40 to-amber-100/40 blur-3xl rounded-full -z-10" />

      <section className="relative overflow-hidden rounded-3xl bg-white/60 p-6 md:p-10 shadow-xl gradient-border">
        <div className="absolute -right-12 -top-10 h-44 w-44 rounded-full bg-gradient-to-br from-rose-200/50 to-sky-100/60 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-gradient-to-tr from-amber-200/60 to-fuchsia-100/60 blur-3xl" />

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center relative">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              FairLove Sanctuary
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight serif">
              Soft, romantic spaces for words that feel like home.
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              Keep love gentle and luminous. Share anonymous notes, craft poetic
              messages, and collect dreamy memories in a private vault that
              glows like nostalgia.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/anonymous-message"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300 px-6 py-3 text-white shadow-lg hover:scale-[1.01] transition"
              >
                <Heart className="w-4 h-4 mr-2" />
                Anonymous Love Share
              </Link>
              <Link
                href="/composer"
                className="inline-flex items-center justify-center rounded-full border border-white/70 bg-white/80 px-6 py-3 text-foreground shadow-sm hover:bg-white transition"
              >
                <Wand2 className="w-4 h-4 mr-2 text-primary" />
                Compose with AI Assist
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {reminders.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white/70 p-4 border border-white/60 shadow-sm hover:shadow-lg transition"
                >
                  <p className="text-xs font-semibold text-primary uppercase">
                    {item.mood}
                  </p>
                  <h3 className="font-medium text-foreground mt-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70 mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative w-full">
            <div className="absolute -right-5 -top-5 h-16 w-16 rounded-full bg-gradient-to-br from-rose-300/60 to-purple-200/60 blur-2xl" />
            <div className="rounded-3xl glass glow p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-rose-300 to-fuchsia-200 flex items-center justify-center text-white shadow-lg">
                  <MessageCircleHeart className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Daily Love Note</p>
                  <p className="font-semibold text-foreground">
                    “You are the calm breath between storms.”
                  </p>
                </div>
              </div>
              <div className="rounded-2xl border border-white/50 bg-white/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">
                    Mood-based suggestions
                  </p>
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <div className="mt-3 space-y-2">
                  {moods.map((mood) => (
                    <div
                      key={mood.label}
                      className={`rounded-xl bg-gradient-to-r ${mood.gradient} p-3 border border-white/40`}
                    >
                      <p className="text-sm font-semibold">{mood.label}</p>
                      <p className="text-xs text-foreground/70">{mood.note}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/50 bg-gradient-to-r from-sky-50 via-white to-rose-50 p-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-foreground/60">
                    LoveVault quick view
                  </p>
                  <p className="text-sm text-foreground">
                    128 treasured keepsakes • 7 unread whispers
                  </p>
                </div>
                <Link
                  href="/messages"
                  className="rounded-full bg-gradient-to-r from-rose-300 to-amber-200 px-4 py-2 text-sm text-foreground shadow-md"
                >
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              Home Dashboard
            </p>
            <h2 className="text-3xl font-semibold serif text-foreground">
              Your emotional rhythm today
            </h2>
          </div>
          <Link
            href="/messages"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-sm text-foreground shadow-sm"
          >
            <Stars className="w-4 h-4 text-primary" />
            Jump to LoveVault
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reminders.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-gradient-to-br from-white to-rose-50/60 p-5 border border-white/70 shadow-sm hover:shadow-xl transition"
            >
              <p className="text-xs text-foreground/60">{item.mood}</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground serif">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">{item.text}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-primary font-semibold">
                <Sparkles className="w-4 h-4" />
                Saved to reminders
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              LoveVault
            </p>
            <h2 className="text-3xl font-semibold serif text-foreground">
              A dreamy archive of moments
            </h2>
          </div>
          <Link
            href="/messages"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-100 to-rose-100 px-4 py-2 text-sm text-foreground border border-white/50"
          >
            Explore vault
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {vaultMoments.map((moment) => (
            <div
              key={moment.title}
              className="rounded-2xl p-4 bg-gradient-to-br from-white/80 via-rose-50/70 to-sky-50/70 border border-white/60 shadow-sm hover:shadow-lg transition"
            >
              <p className="text-xs uppercase tracking-wide text-foreground/60">
                {moment.type}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-foreground serif">
                {moment.title}
              </h3>
              <p className="mt-2 text-sm text-foreground/70">{moment.detail}</p>
              <div className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-xs text-primary border border-white/60">
                <Feather className="w-3 h-3" />
                Kept with love
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white/80 via-rose-50/80 to-sky-50/80 border border-white/60 shadow-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 right-6 h-24 w-24 rounded-full bg-gradient-to-br from-amber-200/60 to-rose-200/60 blur-3xl" />
          <div className="absolute -bottom-10 left-8 h-32 w-32 rounded-full bg-gradient-to-br from-sky-200/60 to-purple-200/60 blur-3xl" />
        </div>
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="p-8 space-y-5">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              Anonymous Love Share
            </p>
            <h2 className="text-3xl font-semibold serif text-foreground">
              Safe, calming whispers with floating paper hearts.
            </h2>
            <p className="text-foreground/70 text-lg">
              Invite loved ones to share tender words. Your link is wrapped in
              soft gradients and gentle glows so every anonymous note feels
              cared for.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/anonymous-message"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-400 px-6 py-3 text-white shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                Generate safe link
              </Link>
              <Link
                href="/messages"
                className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-6 py-3 text-foreground shadow-sm"
              >
                <Stars className="w-4 h-4 text-primary" />
                Read whispers
              </Link>
            </div>
          </div>
          <div className="relative p-8 lg:p-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-48 w-48 rounded-full bg-gradient-to-br from-rose-200/60 via-fuchsia-100/50 to-amber-100/60 blur-3xl" />
            </div>
            <div className="relative rounded-3xl glass glow p-6 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">
                  Floating heart notes
                </p>
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div className="space-y-3">
                {["Your smile feels like home", "Thank you for listening", "I miss your voice"].map(
                  (note) => (
                    <div
                      key={note}
                      className="relative overflow-hidden rounded-2xl bg-white/70 px-4 py-3 border border-white/60"
                    >
                      <div className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-gradient-to-br from-rose-200 to-amber-200 opacity-50 blur-xl" />
                      <p className="text-sm text-foreground">{note}</p>
                    </div>
                  )
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-foreground/60">
                <ShieldCheck className="w-4 h-4 text-primary" />
                Anonymous, gentle, and safe to share.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white/60 bg-white/70 p-6 shadow-lg space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
            Message Composer
          </p>
          <h3 className="text-3xl font-semibold serif text-foreground">
            Write beautifully with AI assist, stickers, and digital gifts.
          </h3>
          <p className="text-foreground/70">
            Craft notes that feel like poetry. Choose an emotional theme, add
            shimmering stickers, or let AI help you find the words.
          </p>
          <div className="rounded-2xl bg-gradient-to-r from-rose-50/90 via-white to-sky-50/90 border border-white/70 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Writing space</span>
              <Wand2 className="w-4 h-4 text-primary" />
            </div>
            <div className="rounded-xl bg-white/80 border border-white/60 p-3 text-sm text-foreground/80 min-h-[120px]">
              Dear love, I hope this note feels like warm sunlight after rain...
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-2 rounded-full bg-rose-100 text-primary">
                Soft Glow
              </span>
              <span className="px-3 py-2 rounded-full bg-sky-100 text-sky-800">
                Dreamy Blue
              </span>
              <span className="px-3 py-2 rounded-full bg-amber-100 text-amber-800">
                Golden Hour
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">
              AI prompt inspirations
            </p>
            <div className="space-y-2">
              {aiPrompts.map((prompt) => (
                <div
                  key={prompt}
                  className="rounded-xl bg-white/70 border border-white/60 px-4 py-3 text-sm text-foreground/80 hover:shadow-md transition"
                >
                  {prompt}
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/composer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300 px-5 py-3 text-white shadow-lg"
          >
            Start composing
          </Link>
        </div>

        <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-sky-50/90 via-white to-rose-50/90 p-6 shadow-lg space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
            Aesthetic Themes
          </p>
          <h3 className="text-3xl font-semibold serif text-foreground">
            Curate your sanctuary
          </h3>
          <p className="text-foreground/70">
            Swap between pastel gradients, heart icons, and gentle lighting.
            Sync your profile and LoveVault with the vibe you want today.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {themePresets.map((theme) => (
              <div
                key={theme.name}
                className={`rounded-2xl bg-gradient-to-br ${theme.gradient} p-4 border border-white/60 shadow-sm`}
              >
                <div className="h-10 w-10 rounded-2xl bg-white/60 flex items-center justify-center shadow">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <p className="mt-3 font-semibold text-foreground">
                  {theme.name}
                </p>
                <p className="text-xs text-foreground/70">Tap to preview</p>
              </div>
            ))}
          </div>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-5 py-3 text-foreground shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            Open profile themes
          </Link>
        </div>
      </section>
    </div>
  );
}
