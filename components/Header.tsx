"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { UserDropdown } from "./UserDropdown";
import { useAuth } from "@/context/auth";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const { user, loading } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/messages", label: "LoveVault" },
    { href: "/anonymous-message", label: "Anonymous Share" },
    { href: "/composer", label: "Compose" },
  ];

  const logOut = async () => {};

  return (
    <header className="w-full fixed top-0 z-40">
      <div className="absolute inset-0 bg-white/50 backdrop-blur-xl border-b border-white/50" />
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-rose-100/80 via-purple-50/70 to-sky-100/70 blur-2xl opacity-80 pointer-events-none" />
      <nav className="relative w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden sm:inline text-xs text-foreground/60">
            A sanctuary for soft love
          </span>
        </div>

        <div className="hidden md:flex items-center gap-3 px-3 py-1 rounded-full glass gradient-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          {loading || logoutLoading ? (
            <Loader2 size={18} className="text-primary/70 animate-spin" />
          ) : !user ? (
            <Link
              href="/login"
              className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300 text-white px-4 py-2 rounded-full shadow-md hover:brightness-105 transition"
            >
              Sign In
            </Link>
          ) : (
            <UserDropdown user={user} onLogOut={logOut} />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
