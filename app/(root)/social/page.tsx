"use client";
import SocialMessageList from '@/components/social/SocialMessageList';
import SocialMessageForm from '@/components/social/SocialMessageForm';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SocialPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight');
          timeoutRef.current = setTimeout(() => {
            element.classList.remove('highlight');
          }, 3000);
        }, 500);
      }
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMessagePosted = () => {
    setRefreshKey(prevKey => prevKey + 1);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen py-8 pt-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold serif">Anonymous Social Space</h1>
          <p className="text-muted-foreground">
            Share compliments, confessions, or thoughts about love anonymously.
          </p>
        </div>
        <SocialMessageList refreshKey={refreshKey} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          {showFloatingButton && (
            <Button
              className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90"
              size="icon"
              onClick={() => setIsDialogOpen(true)}
            >
              <PenSquare className="h-8 w-8" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new anonymous post</DialogTitle>
          </DialogHeader>
          <SocialMessageForm onMessagePosted={handleMessagePosted} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialPage;


