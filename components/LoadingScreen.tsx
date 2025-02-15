"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(0);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-50 to-primary/20">
      <div>
        <div className="relative">
          <Heart className="w-20 h-20 text-muted animate-pulse" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `polygon(0 ${100 - progress}%, 100% ${
                100 - progress
              }%, 100% 100%, 0% 100%)`,
            }}
          >
            <Heart className="w-20 h-20 text-primary animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
