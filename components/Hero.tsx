"use client";

import React, { useEffect, useState } from "react";

const loveMessages = [
  "PATIENT",
  "KIND",
  "UNCONDITIONAL",
  "ACCEPTING",
  "SUPPORTIVE",
];


const Hero = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessage, setDisplayedMessage] = useState("");

  useEffect(() => {
    const message = loveMessages[currentMessageIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setDisplayedMessage(message.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentMessageIndex(
            (prevIndex) => (prevIndex + 1) % loveMessages.length
          );
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex]);
  return (
    <section className="text-center py-10 pt-24">
      <h1
        className="text-3xl md:text-5xl font-bold pb-10 text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-600 transform transition-transform duration-300 ease-in-out"
        style={{
          textShadow:
            "2px 2px 4px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.5)",
        }}
      >
        Love is {displayedMessage}
      </h1>
      <p className="text-xl md:text-3xl font-medium text-primary mb-12">
        Express genuine LOVE
      </p>
    </section>
  );
};

export default Hero;
