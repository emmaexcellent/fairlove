"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  getLoggedInUser,
  logoutUser,
  signInWithEmail,
  signUpWithEmail,
} from "@/lib/auth";
import { Models } from "node-appwrite";
import { LoadingScreen } from "@/components/LoadingScreen";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: Models.User<{}> | null;
  loading: boolean;
  checkUser: () => void;
  signIn: (
    email: string,
    password: string,
    redirect_url: string
  ) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<Models.User<{}> | null>(null);
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
      const currentUser = await getLoggedInUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      router.replace("/login")
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string, redirect_url: string) {
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      const currentUser = await getLoggedInUser();
      setUser(currentUser);
      redirect_url ? router.push(redirect_url) : router.push("/");
    } catch (error) {
      handleAuthError(error, "signing in");
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email: string, name: string, password: string) {
    setLoading(true);
    try {
      await signUpWithEmail(email, name, password);
      const currentUser = await getLoggedInUser();
      setUser(currentUser);
    } catch (error) {
      handleAuthError(error, "signing up");
    } finally {
      setLoading(false);
    }
  }

  function handleAuthError(error: unknown, action: string) {
    toast.error(`Error ${action}: ${String(error)}`);
    console.error(`Error ${action}:`, error);
  }

  const value = {
    user,
    loading,
    checkUser,
    signIn,
    signUp,
    signOut,
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
