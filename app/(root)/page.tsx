"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Gift,
  Sparkles,
  Users,
  Star,
  ArrowRight,
  MessageCircleHeart,
  Package,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-hidden  py-20 px-4 md:px-6 pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,192,203,0.2),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,218,185,0.2),transparent_50%)]" />

        <div className="relative max-w-6xl mx-auto text-center space-y-5 md:space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-rose-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span className="text-sm text-foreground/80 text-pretty">
              Where love finds its voice
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight uppercase">
            Share love that
            <span className="block bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 bg-clip-text text-transparent pb-5 md:pt-3">
              light up hearts
            </span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-courgette">
            The most beautiful way to connect with loved ones. Daily love notes,
            virtual gifts, and meaningful moments that strengthen bonds and
            celebrate relationships.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link href="/send-love">
              <Button
                size="lg"
                className="rounded bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-all text-lg px-8"
              >
                <Heart className="w-5 h-5 mr-2" />
                Start Sending Love
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              className="rounded border-2 border-rose-200 bg-white/80 text-foreground text-lg px-8"
            >
              See How It Works
            </Button>
          </div>

          <div className="flex flex-wrap gap-6 justify-center text-sm text-foreground/60 pt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-400" />
              <span>10k+ love notes sent daily</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              <span>5k+ families connected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Rated 4.9/5 by users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-wider text-rose-500 font-semibold">
              Features that connect hearts
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              Everything you need to express love
            </h2>
            <p className="text-sm text-foreground/70 max-w-2xl mx-auto text-pretty">
              From daily check-ins to special moments, we&apos;ve built the
              perfect platform for meaningful connections.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="p-6 space-y-4 border-2 border-rose-100 bg-gradient-to-br from-rose-50/50 to-white hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-400 flex items-center justify-center">
                <MessageCircleHeart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Daily Love Notes
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Send beautiful, AI-assisted love letters with romantic themes.
                Perfect for daily check-ins and heartfelt messages.
              </p>
              <Link
                href="/daily-love-note"
                className="inline-flex items-center gap-2 text-rose-600 font-medium hover:gap-3 transition-all"
              >
                Try it now <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Feature 2 */}
            <Card className="p-6 space-y-4 border-2 border-pink-100 bg-gradient-to-br from-pink-50/50 to-white hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-fuchsia-400 flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Virtual Gifts
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Send affection-triggering virtual items. Build your gift vault
                and surprise loved ones with emotional presents.
              </p>
              <Link
                href="/gifts?type=store"
                className="inline-flex items-center gap-2 text-pink-600 font-medium hover:gap-3 transition-all"
              >
                Browse gifts <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Feature 3 */}
            <Card className="p-6 space-y-4 border-2 border-amber-100 bg-gradient-to-br from-amber-50/50 to-white hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Physical Gifts
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Premium curated store items delivered to their door. Turn
                digital love into tangible surprises.
              </p>
              <Link
                href="/gifts?type=physical"
                className="inline-flex items-center gap-2 text-amber-600 font-medium hover:gap-3 transition-all"
              >
                Shop now <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Feature 4 */}
            <Card className="p-6 space-y-4 border-2 border-purple-100 bg-gradient-to-br from-purple-50/50 to-white hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Family Tree
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Connect with family members and create beautiful bonds. Build
                your relationship network with love.
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-purple-600 font-medium hover:gap-3 transition-all"
              >
                Create bonds <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Feature 5 */}
            <Card className="p-6 space-y-4 border-2 border-sky-100 bg-gradient-to-br from-sky-50/50 to-white hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                AI-Assisted Writing
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Let AI help you express feelings you struggle to put into words.
                Beautiful, heartfelt messages made easy.
              </p>
              <Link
                href="/compose"
                className="inline-flex items-center gap-2 text-sky-600 font-medium hover:gap-3 transition-all"
              >
                Get started <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>

            {/* Feature 6 */}
            <Card className="p-6 space-y-4 border-2 border-rose-100 bg-gradient-to-br from-rose-50/50 to-white hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-red-400 flex items-center justify-center">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Streaks & Badges
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Build meaningful habits with daily streaks. Earn badges for
                consistent love sharing and relationship building.
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-rose-600 font-medium hover:gap-3 transition-all"
              >
                View rewards <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-br from-pink-50/30 via-rose-50/30 to-amber-50/30">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-wider text-pink-500 font-semibold">
              Simple & Meaningful
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              Three steps to spreading love
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Write Your Message
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Use our AI-assisted composer to craft the perfect love note with
                romantic themes and emotional depth.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-400 text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Add Gifts
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Browse virtual and physical gifts from your vault or our store.
                Attach to your message.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-fuchsia-400 to-purple-400 text-white text-2xl font-bold flex items-center justify-center mx-auto shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Send with Love
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Send to loved ones or yourself. Watch as your message lights up
                their day with beautiful animations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <p className="text-sm uppercase tracking-wider text-rose-500 font-semibold">
              Loved by thousands
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
              Hearts touched, bonds strengthened
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 space-y-4 bg-gradient-to-br from-rose-50 to-white border-rose-100">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-rose-400 text-rose-400"
                  />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed italic">
                &quot;This platform helped me reconnect with my family. The
                daily love notes feature is absolutely beautiful!&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-300 to-pink-300" />
                <div>
                  <p className="font-semibold text-foreground">Sarah M.</p>
                  <p className="text-sm text-foreground/60">Mother of three</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 bg-gradient-to-br from-pink-50 to-white border-pink-100">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-pink-400 text-pink-400"
                  />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed italic">
                &quot;The virtual gifts are so thoughtful! My partner loves
                receiving surprise messages with gifts attached.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-fuchsia-300" />
                <div>
                  <p className="font-semibold text-foreground">Michael P.</p>
                  <p className="text-sm text-foreground/60">
                    In a long-distance relationship
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4 bg-gradient-to-br from-amber-50 to-white border-amber-100">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-foreground/80 leading-relaxed italic">
                &quot;I use self-love mode every morning. It&apos;s become my
                favorite way to practice self-care and affirmation.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-300" />
                <div>
                  <p className="font-semibold text-foreground">Emma L.</p>
                  <p className="text-sm text-foreground/60">Wellness coach</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-balance">
            Ready to make someone&apos;s day?
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-pretty leading-relaxed">
            Join thousands of people spreading love, building stronger
            relationships, and creating meaningful moments every single day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="rounded-full bg-white text-rose-600 hover:bg-white/90 shadow-lg text-lg px-8"
            >
              <Heart className="w-5 h-5 mr-2" />
              Start For Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <p className="text-sm text-white/80">
            No credit card required • Free forever • 500 coins to start
          </p>
        </div>
      </section>
    </div>
  );
}
