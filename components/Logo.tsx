import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

const Logo = () => {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-2xl font-semibold text-primary"
    >
      <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-rose-300 via-fuchsia-200 to-amber-200 flex items-center justify-center shadow-md glow">
        <Heart className="w-5 h-5 text-white drop-shadow" />
      </span>
      <span className="serif tracking-tight">FairLove</span>
    </Link>
  );
};

export default Logo;
