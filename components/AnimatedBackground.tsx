"use client";

import type React from "react";
import { useEffect, useRef } from "react";

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const palette = [
      "rgba(255, 195, 215, 0.35)",
      "rgba(212, 196, 255, 0.25)",
      "rgba(173, 216, 255, 0.28)",
      "rgba(255, 218, 193, 0.3)",
    ];

    const hearts: {
      x: number;
      y: number;
      size: number;
      speed: number;
      hue: string;
    }[] = [];
    const dots: {
      x: number;
      y: number;
      size: number;
      speed: number;
      hue: string;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        hue: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    for (let i = 0; i < 100; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        hue: palette[Math.floor(Math.random() * palette.length)],
      });
    }

    function drawHeart(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      heartColor: string
    ) {
      ctx.beginPath();
      ctx.moveTo(x, y + size / 4);
      ctx.quadraticCurveTo(x, y, x + size / 4, y);
      ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
      ctx.quadraticCurveTo(x + size / 2, y, x + (size * 3) / 4, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + size / 4);
      ctx.quadraticCurveTo(
        x + size,
        y + size / 2,
        x + size / 2,
        y + (size * 3) / 4
      );
      ctx.quadraticCurveTo(x, y + size / 2, x, y + size / 4);
      ctx.fillStyle = heartColor;
      ctx.fill();
    }

    function animate() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        hearts.forEach((heart) => {
          ctx.save();
          ctx.shadowColor = heart.hue;
          ctx.shadowBlur = 12;
          drawHeart(ctx, heart.x, heart.y, heart.size, heart.hue);
          ctx.restore();
          heart.y += heart.speed * 0.8;
          heart.x += Math.sin(heart.y * 0.01) * 0.4;
          if (heart.y > canvas.height) {
            heart.y = -heart.size;
            heart.x = Math.random() * canvas.width;
          }
        });

        dots.forEach((dot) => {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fillStyle = dot.hue;
          ctx.shadowColor = dot.hue;
          ctx.shadowBlur = 8;
          ctx.fill();
          dot.y += dot.speed * 0.8;
          if (dot.y > canvas.height) {
            dot.y = -dot.size;
            dot.x = Math.random() * canvas.width;
          }
        });
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

export default AnimatedBackground;
