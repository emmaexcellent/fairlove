"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import { Models } from "node-appwrite";
import { LoadingScreen } from "@/components/LoadingScreen";
import { getUser } from "@/lib/appwrite/auth";

interface AuthContextType {
  user: Models.Document | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  /**
   * Checks if the user is already logged in.
   */
  async function checkUser() {
    setLoading(true);
    try {
      const currentUser = await getUser();
      setUser(currentUser);
      console.log(currentUser);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  }
  
  const value = {
    user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      <LoadingScreen isLoading={loading} />
      <div
        style={{ opacity: loading ? 0 : 1 }}
        className="transition-opacity duration-300"
      >
        {children}
      </div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
