"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { deleteSession } from "@/lib/appwrite/auth";
import { UserDropdown } from "./UserDropdown";
import { useAuth } from "@/context/auth";
import { useState } from "react";

const Header = () => {
  const {user, loading} = useAuth()
  const [logoutLoading, setLogoutLoading] = useState(false);


  const logOut = async () => {
    setLogoutLoading(true);
    await deleteSession();
  };

  return (
    <header className="w-full fixed top-0 z-40 bg-pink-100 shadow-sm">
      <nav className="w-full max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />
        <div className="space-x-4">
          {loading || logoutLoading ? (
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
