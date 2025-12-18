"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Gift,
  Sparkles,
  ArrowRight,
  MessageCircleHeart,
  Package,
  Snowflake,
  TreePine,
  Circle,
  Star,
  Quote,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface NewFlakesProps {
    id: number;
    x: string;
    delay: number;
    duration: number;
    size: number;
    drift: number;
}

/**
 * Smooth Snowfall Engine
 */
const Snowfall = () => {
  const [flakes, setFlakes] = useState<NewFlakesProps[]>([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 250 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 15,
      size: 2 + Math.random() * 5,
      drift: Math.random() * 30 - 15,
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{
            y: "110vh",
            x: [0, flake.drift, 0],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            left: flake.x,
            width: flake.size,
            height: flake.size,
            backgroundColor: "white",
            borderRadius: "50%",
            filter: "blur(1px)",
            boxShadow: "0 0 5px rgba(255,255,255,0.5)",
          }}
        />
      ))}
    </div>
  );
};

const FloatingIllustration = ({
  children,
  x,
  y,
  delay = 0,
  speed = 6,
  className = "",
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay?: number;
  speed?: number;
  className?: string
}) => (
  <motion.div
    animate={{
      y: [0, -25, 0],
      rotate: [-8, 8, -8],
    }}
    transition={{
      duration: speed,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
    style={{ left: x, top: y }}
    className={`absolute pointer-events-none select-none z-0 ${className}`}
  >
    {children}
  </motion.div>
);

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Verified Gift Sender",
    text: "The AI holiday poetry moved my grandmother to tears. It's not just a message; it's a memory. Truly the most magical app I've used this year.",
    avatar: "SJ",
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Marcus Thorne",
    role: "Premium Member",
    text: "I sent a physical hamper to my partner across the country. The tracking was seamless and the packaging was absolutely luxury. 10/10 service.",
    avatar: "MT",
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    name: "Elena Rodriguez",
    role: "Secret Santa Organizer",
    text: "We used the virtual stocking feature for our office party. It brought everyone together despite being remote. Such a lovely, professional platform.",
    avatar: "ER",
    color: "bg-amber-100 text-amber-600",
  },
];

export default function App() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 200]);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      <Snowfall />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <FloatingIllustration x="8%" y="15%" speed={5} className="opacity-20">
          <span className="text-8xl filter drop-shadow-xl">🎅</span>
        </FloatingIllustration>

        <FloatingIllustration
          x="82%"
          y="35%"
          delay={1}
          speed={7}
          className="opacity-20"
        >
          <div className="flex flex-col items-center">
            <TreePine size={140} className="text-emerald-800" />
            <span className="text-5xl mt-[-45px]">🎄</span>
          </div>
        </FloatingIllustration>

        <FloatingIllustration x="70%" y="10%" delay={0.5}>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-gray-400/40" />
            <Circle size={45} className="text-red-500/30 fill-red-500/20" />
          </div>
        </FloatingIllustration>

        <FloatingIllustration x="20%" y="65%" delay={2}>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-32 bg-gradient-to-b from-transparent to-gray-400/40" />
            <Circle size={55} className="text-amber-500/20 fill-amber-500/10" />
          </div>
        </FloatingIllustration>

        <motion.div
          style={{ y: yParallax }}
          className="absolute top-[20%] right-[10%] opacity-[0.03] text-blue-900 pointer-events-none"
        >
          <Snowflake size={400} />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 px-4 md:px-6 pt-32 pb-16">

          <div className="relative max-w-6xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-emerald-100 shadow-sm backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-800 uppercase tracking-widest">
                The Christmas Magic is Here
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground leading-[1.1] uppercase tracking-tighter"
            >
              Wrap your love in
              <span className="block bg-gradient-to-r from-red-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent pb-4">
                Holiday Wonders
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-2xl text-foreground/70 max-w-2xl mx-auto leading-relaxed font-light"
            >
              Make this December unforgettable. Send AI-powered Christmas
              letters, unlock festive virtual gifts, and deliver holiday magic
              directly to their door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center pt-6"
            >
              <Link href="/send-love">
                <Button
                  size="lg"
                  className="rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all text-lg px-10 h-16 group"
                >
                  <Gift className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Send a Christmas Surprise
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-2 border-emerald-200 bg-white/80 text-emerald-900 text-lg px-10 h-16 hover:bg-emerald-50 backdrop-blur-sm"
              >
                Explore Festive Collection
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section: Holiday Heartbeats */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm"
              >
                Wall of Warmth
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                Holiday Heartbeats
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-lg">
                See how thousands of people are making this season brighter for
                their loved ones.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 h-full border-none shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] bg-white/60 backdrop-blur-sm relative overflow-hidden flex flex-col hover:shadow-xl transition-all group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Quote size={60} className="text-slate-900" />
                    </div>

                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={16}
                          className="fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="text-slate-700 leading-relaxed italic mb-8 flex-grow">
                      "{t.text}"
                    </p>

                    <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                      <div
                        className={`w-12 h-12 rounded-full ${t.color} flex items-center justify-center font-bold text-sm shadow-inner`}
                      >
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 leading-none">
                          {t.name}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                          {t.role}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gift Vault Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="bg-emerald-900 rounded-[2rem] p-8 md:p-16 overflow-hidden relative shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Snowflake size={200} className="animate-pulse" />
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6 text-white">
                  <div className="inline-block px-4 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                    Limited Edition
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    The Holiday <br /> Gift Experience
                  </h2>
                  <p className="text-emerald-50/80 text-lg leading-relaxed">
                    This month, every message sent comes with a digital "Snow
                    Globe" animation. Choose from our curated Christmas store
                    featuring physical hampers and virtual winter wonders.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-all border-none">
                    <Package className="w-8 h-8 mb-3 text-red-400" />
                    <h4 className="font-bold">Physical Delivery</h4>
                    <p className="text-xs text-white/60">
                      Real gifts to their doorstep.
                    </p>
                  </Card>
                  <Card className="p-6 bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-all border-none">
                    <MessageCircleHeart className="w-8 h-8 mb-3 text-emerald-400" />
                    <h4 className="font-bold">Xmas Letters</h4>
                    <p className="text-xs text-white/60">
                      AI holiday themed poetry.
                    </p>
                  </Card>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-24 px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-tr from-red-700 to-rose-600 p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden"
          >
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-tight drop-shadow-md">
                Don&apos;t Let the Season <br /> Pass by Coldly
              </h2>
              <p className="text-xl text-rose-100 max-w-xl mx-auto font-medium">
                Join 10,000+ users sharing warmth this December. Start your
                first Christmas streak today.
              </p>
              <Button
                size="lg"
                className="bg-white text-red-700 hover:bg-rose-50 rounded-full px-12 h-16 text-lg font-bold shadow-lg"
              >
                Start Sending for Free
              </Button>
              <p className="text-sm text-rose-200/70 font-medium">
                🎁 Bonus: Get 1,000 holiday coins on signup this week
              </p>
            </div>

            <div className="absolute bottom-[-20px] left-[-20px] opacity-10 rotate-12">
              <Snowflake size={150} />
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
