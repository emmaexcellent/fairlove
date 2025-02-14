"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

import { useState, useEffect } from "react";
import { Models } from "node-appwrite";
import { getUser, deleteSession } from "@/lib/appwrite/auth";
import { UserDropdown } from "./UserDropdown";

const Header = () => {
  const [user, setUser] = useState<Models.Document | null>(
    null
  );
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    getUser()
      .then((data) => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  const logOut = async () => {
    setLoading(true)
    await deleteSession();
  };

  return (
    <header className="w-full fixed top-0 z-40 bg-pink-100 shadow-sm">
      <nav className="w-full max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="space-x-4">
          {loading ? (
            <Loader2 size={15} className=" text-primary/70 animate-spin" />
          ) : !user ? (
            <Link
              href="/login"
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-primary"
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
