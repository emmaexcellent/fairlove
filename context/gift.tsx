"use client"
import React, { createContext, useContext, useState } from 'react';

interface GiftContextType {
  isGiftModalOpen: boolean;
  openGiftModal: () => void;
  closeGiftModal: () => void;
}

const GiftContext = createContext<GiftContextType | undefined>(undefined);

export const GiftProvider = ({ children }: { children: React.ReactNode }) => {
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  const openGiftModal = () => setIsGiftModalOpen(true);
  const closeGiftModal = () => setIsGiftModalOpen(false);

  return (
    <GiftContext.Provider value={{ isGiftModalOpen, openGiftModal, closeGiftModal }}>
      {children}
    </GiftContext.Provider>
  );
};

export const useGift = () => {
  const context = useContext(GiftContext);
  if (context === undefined) {
    throw new Error('useGift must be used within a GiftProvider');
  }
  return context;
};
