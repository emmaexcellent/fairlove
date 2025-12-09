"use client"

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./auth";
import { updateUserCoins } from "@/lib/appwrite/crud";
import { toast } from "sonner";

interface CoinContextType {
  coinBalance: number;
  addCoins: (amount: number) => Promise<void>;
  spendCoins: (amount: number) => Promise<void>;
  loading: boolean;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [coinBalance, setCoinBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && typeof user.coins === "number") {
      setCoinBalance(user.coins);
    }
  }, [user]);

  const addCoins = async (amount: number) => {
    if (!user) return;
    setLoading(true);
    const newBalance = coinBalance + amount;
    try {
      const res = await updateUserCoins(user.$id, newBalance);
      if (res) {
        setCoinBalance(newBalance);
        toast.success(`${amount} coins added!`);
      }
    } catch (error) {
      console.error("Error adding coins:", error);
      toast.error("Failed to add coins.");
    } finally {
      setLoading(false);
    }
  };

  const spendCoins = async (amount: number) => {
    if (!user) return;
    if (coinBalance < amount) {
      toast.error("Insufficient coins.");
      return;
    }
    setLoading(true);
    const newBalance = coinBalance - amount;
    try {
      const res = await updateUserCoins(user.$id, newBalance);
      if (res) {
        setCoinBalance(newBalance);
        toast.success(`${amount} coins spent!`);
      }
    } catch (error) {
      console.error("Error spending coins:", error);
      toast.error("Failed to spend coins.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoinContext.Provider
      value={{ coinBalance, addCoins, spendCoins, loading }}
    >
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error("useCoins must be used within a CoinProvider");
  }
  return context;
};
