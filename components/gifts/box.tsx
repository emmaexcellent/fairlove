"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function GiftBox() {
  const [stage, setStage] = useState(0);

  const handleClick = () => {
    if (stage === 0) {
      setStage(1); // ribbon break
      setTimeout(() => setStage(2), 900); // lid open
      setTimeout(() => {
        setStage(3); // reveal
        confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.7 },
        });
      }, 1600);
    }
  };

  return (
    <div className="flex items-center justify-center py-20">
      <div
        className="relative w-[300px] h-[300px] cursor-pointer"
        onClick={handleClick}
      >
        {/* BOX BASE */}
        <img src="/gift/1.png" className="absolute w-full bottom-0" />

        {/* CLOSED LID (stage 0 & 1) */}
        <AnimatePresence>
          {stage <= 1 && (
            <motion.img
              src="/gift/2.png.png"
              className="absolute w-full -top-2"
              initial={{ rotate: 0, y: 0 }}
              animate={
                stage === 1 ? { rotate: -12, y: -8 } : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        {/* RIBBON (stage 0 only) */}
        {stage === 0 && (
          <>
            <img src="/gift/1.png" className="absolute w-full bottom-0" />
            <img src="/gift/3.png" className="absolute w-full top-0" />
          </>
        )}

        {/* RIBBON FLYING (stage 1) */}
        {stage === 1 && (
          <>
            <motion.img
              src="/gift/3.png"
              className="absolute w-full top-10"
              initial={{ opacity: 1, x: 0 }}
              animate={{ x: -120, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            <motion.img
              src="/gift/3.png"
              className="absolute w-full top-10"
              initial={{ opacity: 1, x: 0 }}
              animate={{ x: 140, opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            <motion.img
              src="/gift/3.png"
              className="absolute w-full -top-4"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: -140, opacity: 0 }}
              transition={{ duration: 0.9 }}
            />
          </>
        )}

        {/* OPEN LID (stage 2+3) */}
        <AnimatePresence>
          {stage >= 2 && (
            <motion.img
              src="/gift/4.png"
              className="absolute w-full -top-24"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: -15, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* OPEN BOX BODY (stage 2+) */}
        {stage >= 2 && (
          <img src="/gift/4.png" className="absolute bottom-0 w-full" />
        )}

        {/* GIFT REVEAL (stage 3) */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              className="absolute bottom-10 w-full flex justify-center"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: -40, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Replace with your actual gift */}
              <div className="w-24 h-24 bg-yellow-400 rounded-xl shadow-xl flex items-center justify-center text-3xl">
                🎁
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
