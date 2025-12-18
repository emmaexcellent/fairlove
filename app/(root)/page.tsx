"use client";

import { useEffect, useState, useCallback, memo as ReactMemo } from "react";
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
import dynamic from "next/dynamic";

// Dynamically import heavy components
const Snowfall = dynamic(
  () => import("react-snowfall").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => null,
  }
);

interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
  color: string;
}

// Memoize testimonials to prevent re-renders
const testimonials: Testimonial[] = [
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

// Optimized floating illustration with memoization
const FloatingIllustration = ReactMemo(
  ({
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
    className?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0.2 }}
      animate={{
        y: [0, -15, 0], // Reduced movement for mobile
        rotate: [-4, 4, -4], // Reduced rotation for performance
        opacity: 0.5,
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      style={{
        left: x,
        top: y,
        willChange: "transform", // Hint for browser optimization
      }}
      className={`absolute pointer-events-none select-none z-0 ${className}`}
    >
      {children}
    </motion.div>
  )
);

FloatingIllustration.displayName = "FloatingIllustration";

// Optimized testimonial card
const TestimonialCard = ReactMemo(
  ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="p-6 md:p-8 h-full border border-slate-200/50 shadow-sm bg-white/80 backdrop-blur-sm relative overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-300 group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Quote size={60} className="text-slate-900" />
        </div>

        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-slate-700 leading-relaxed italic mb-6 flex-grow text-sm md:text-base">
          "{testimonial.text}"
        </p>

        <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
          <div
            className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-sm shadow-inner`}
          >
            {testimonial.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-900 leading-none truncate">
              {testimonial.name}
            </h4>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider truncate block">
              {testimonial.role}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
);

TestimonialCard.displayName = "TestimonialCard";

// Optimized gift card component
const GiftFeatureCard = ReactMemo(
  ({
    icon: Icon,
    title,
    description,
    iconColor,
  }: {
    icon: React.ElementType;
    title: string;
    description: string;
    iconColor: string;
  }) => (
    <Card className="p-4 md:p-6 bg-white/10 border-white/20 backdrop-blur-md text-white hover:bg-white/15 transition-all duration-300 border-none cursor-default">
      <Icon className={`w-6 h-6 md:w-8 md:h-8 mb-3 ${iconColor}`} />
      <h4 className="font-bold text-sm md:text-base">{title}</h4>
      <p className="text-xs text-white/60 mt-1">{description}</p>
    </Card>
  )
);

GiftFeatureCard.displayName = "GiftFeatureCard";

// Main App Component
export default function OptimizedChristmasPage() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]); // Reduced parallax for mobile
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    // Set initial state
    handleResize();
    setIsLoaded(true);

    // Debounced resize listener
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize);
    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Prevent background scroll when modal/overlay is open
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      // Allow scroll only on scrollable elements
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("scrollable") ||
        target.closest(".scrollable")
      ) {
        return;
      }
      // Prevent default on non-scrollable animated elements
      if (target.classList.contains("pointer-events-none")) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Optimized Snowfall with Canvas */}
      {isLoaded && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          <Snowfall
            color="white"
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              zIndex: 40,
              pointerEvents: "none",
            }}
            snowflakeCount={180}
            radius={isMobile ? [0.5, 2.0] : [0.5, 3.5]}
            speed={isMobile ? [0.3, 1.2] : [0.5, 1.8]}
            wind={isMobile ? [-0.1, 0.2] : [-0.2, 0.3]}
            rotationSpeed={isMobile ? [-0.5, 0.5] : [-1, 1]}
            opacity={isMobile ? [0.4, 0.8] : [0.6, 1]}
          />
        </div>
      )}

      {/* Background Decorations - Reduced on mobile */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-30">
        <>
          <FloatingIllustration x="8%" y="15%" speed={5} className="opacity-20">
            <span className="text-6xl md:text-8xl filter drop-shadow-xl">
              🎅
            </span>
          </FloatingIllustration>

          <FloatingIllustration
            x="82%"
            y="35%"
            delay={1}
            speed={7}
            className="opacity-20"
          >
            <div className="flex flex-col items-center">
              <TreePine
                size={isMobile ? 80 : 140}
                className="text-emerald-800"
              />
              <span className="text-4xl md:text-5xl mt-[-30px] md:mt-[-45px]">
                🎄
              </span>
            </div>
          </FloatingIllustration>
        </>

        <FloatingIllustration
          x="70%"
          y="10%"
          delay={0.5}
          className={isMobile ? "opacity-10" : ""}
        >
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-12 md:h-20 bg-gradient-to-b from-transparent to-gray-400/20" />
            <Circle
              size={isMobile ? 30 : 45}
              className="text-red-500/20 fill-red-500/10"
            />
          </div>
        </FloatingIllustration>

        <FloatingIllustration
          x="20%"
          y="65%"
          delay={2}
          className={isMobile ? "opacity-10" : ""}
        >
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-20 md:h-32 bg-gradient-to-b from-transparent to-gray-400/20" />
            <Circle
              size={isMobile ? 35 : 55}
              className="text-amber-500/10 fill-amber-500/5"
            />
          </div>
        </FloatingIllustration>

        <motion.div
          style={{ y: yParallax }}
          className="absolute top-[20%] right-[10%] opacity-[0.02] text-blue-900 pointer-events-none"
        >
          <Snowflake size={isMobile ? 200 : 400} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section - Optimized for mobile */}
        <section className="relative overflow-hidden py-12 md:py-24 px-4 md:px-6 pt-20 md:pt-32 pb-12 md:pb-16">
          <div className="relative max-w-6xl mx-auto text-center space-y-6 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/95 border border-emerald-100 shadow-xs backdrop-blur-sm"
            >
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-emerald-600" />
              <span className="text-xs md:text-sm font-medium text-emerald-800 uppercase tracking-wide md:tracking-widest">
                Christmas Magic
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] uppercase tracking-tight"
            >
              Wrap your love in
              <span className="block bg-gradient-to-r from-red-600 via-rose-500 to-emerald-600 bg-clip-text text-transparent pb-2 md:pb-4">
                Holiday Wonders
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-base md:text-lg lg:text-2xl text-slate-600/80 max-w-2xl mx-auto leading-relaxed font-light px-2"
            >
              Make this December unforgettable. Send AI-powered Christmas
              letters, unlock festive virtual gifts, and deliver holiday magic
              directly to their door.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4 md:pt-6 px-2"
            >
              <Link href="/send-love" className="w-full sm:w-auto">
                <Button
                  size={isMobile ? "default" : "lg"}
                  className="w-full rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all text-base md:text-lg px-6 md:px-10 h-12 md:h-16 group active:scale-95 touch-manipulation"
                  aria-label="Send a Christmas Surprise"
                >
                  <Gift className="w-4 h-4 md:w-5 md:h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Send a Christmas Surprise
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Button
                size={isMobile ? "default" : "lg"}
                variant="outline"
                className="w-full sm:w-auto rounded-full border border-emerald-200 bg-white/90 text-emerald-900 text-base md:text-lg px-6 md:px-10 h-12 md:h-16 hover:bg-emerald-50 backdrop-blur-sm active:scale-95 touch-manipulation"
                aria-label="Explore Festive Collection"
              >
                Explore Festive Collection
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section - Optimized grid */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-8 md:space-y-16">
            <div className="text-center space-y-3 md:space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-red-600 font-bold uppercase tracking-wide md:tracking-[0.2em] text-xs md:text-sm"
              >
                Wall of Warmth
              </motion.div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                Holiday Heartbeats
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base lg:text-lg px-2">
                See how thousands of people are making this season brighter for
                their loved ones.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-2">
              {testimonials.map((testimonial, i) => (
                <TestimonialCard
                  key={testimonial.name}
                  testimonial={testimonial}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Gift Vault Section - Optimized layout */}
        <section className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              whileHover={{ scale: isMobile ? 1 : 1.005 }}
              className="bg-emerald-900 rounded-2xl md:rounded-[2rem] p-6 md:p-12 lg:p-16 overflow-hidden relative shadow-xl"
            >
              <div className="absolute top-0 right-0 p-4 md:p-8 opacity-10">
                <Snowflake size={isMobile ? 100 : 200} />
              </div>

              <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                <div className="space-y-4 md:space-y-6 text-white">
                  <div className="inline-block px-3 py-1 rounded-md bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    Limited Edition
                  </div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white">
                    The Holiday <br /> Gift Experience
                  </h2>
                  <p className="text-emerald-50/80 text-sm md:text-base lg:text-lg leading-relaxed">
                    This month, every message sent comes with a digital "Snow
                    Globe" animation. Choose from our curated Christmas store
                    featuring physical hampers and virtual winter wonders.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <GiftFeatureCard
                    icon={Package}
                    title="Physical Delivery"
                    description="Real gifts to their doorstep."
                    iconColor="text-red-400"
                  />
                  <GiftFeatureCard
                    icon={MessageCircleHeart}
                    title="Xmas Letters"
                    description="AI holiday themed poetry."
                    iconColor="text-emerald-400"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call To Action - Optimized for mobile */}
        <section className="py-12 md:py-24 px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-5xl mx-auto rounded-2xl md:rounded-[3rem] bg-gradient-to-tr from-red-700 to-rose-600 p-6 md:p-12 lg:p-20 text-center text-white shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10 space-y-6 md:space-y-8">
              <h2 className="text-2xl md:text-4xl lg:text-7xl font-black uppercase italic tracking-tight leading-snug md:leading-tight drop-shadow-md">
                Don&apos;t Let the Season <br /> Pass by Coldly
              </h2>
              <p className="text-sm md:text-base lg:text-xl text-rose-100 max-w-xl mx-auto font-medium px-2">
                Join 10,000+ users sharing warmth this December. Start your
                first Christmas streak today.
              </p>
              <Button
                size={isMobile ? "default" : "lg"}
                className="bg-white text-red-700 hover:bg-rose-50 rounded-full px-8 md:px-12 h-12 md:h-16 text-base md:text-lg font-bold shadow-lg active:scale-95 touch-manipulation"
                aria-label="Start Sending for Free"
              >
                Start Sending for Free
              </Button>
              <p className="text-xs md:text-sm text-rose-200/70 font-medium">
                🎁 Bonus: Get 1,000 holiday coins on signup this week
              </p>
            </div>

            <div className="absolute bottom-[-10px] left-[-10px] md:bottom-[-20px] md:left-[-20px] opacity-10 rotate-12">
              <Snowflake size={isMobile ? 80 : 150} />
            </div>
          </motion.div>
        </section>
      </div>

      {/* Performance optimizations in global styles */}
      <style jsx global>{`
        /* Improve scrolling performance */
        * {
          -webkit-tap-highlight-color: transparent;
          -webkit-font-smoothing: antialiased;
        }

        /* Optimize animations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Prevent text size adjustment on mobile */
        html {
          -webkit-text-size-adjust: 100%;
        }
      `}</style>
    </div>
  );
}
