"use client";

import { useState, useEffect, useRef } from "react";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import type { Gift as GiftType } from "@/lib/gift-data";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

// Confetti library
import confetti from "canvas-confetti";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  selectedGifts: GiftType[];
  selectedTheme: { id: string; name: string; gradient: string };
  isSelfLove?: boolean;
  chosenSticker: string;
}

type SendState = "input" | "sending" | "success";

export function SendModal({
  isOpen,
  onClose,
  message,
  selectedGifts,
  selectedTheme,
  isSelfLove,
  chosenSticker,
}: SendModalProps) {
  const [receiverUsername, setReceiverUsername] = useState("");
  const [sendState, setSendState] = useState<SendState>("input");
  const [error, setError] = useState("");
  const hasTriggeredConfetti = useRef(false);

  const handleSend = async () => {
    if (!receiverUsername.trim()) {
      setError("Please enter a username");
      return;
    }

    setError("");
    setSendState("sending");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSendState("success");
  };

  const handleClose = () => {
    setSendState("input");
    setReceiverUsername("");
    setError("");
    hasTriggeredConfetti.current = false;
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="md:max-w-3xl max-w-[95%] w-full overflow-hidden p-0 gap-0 rounded">
        {/* Header */}
        <DialogHeader className="bg-gradient-to-r from-rose-100/80 via-purple-100/80 to-amber-100/80 border-b border-white/60 p-6 rounded-t-3xl">
          <div>
            <DialogTitle className="text-xl">Share this moment</DialogTitle>
            <DialogDescription>
              {isSelfLove
                ? "Celebrate yourself with this special gift"
                : "Spread love and joy with your message"}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 space-y-6">
          {sendState === "input" && (
            <>
              {/* Preview Card */}
              <Card
                className={`border-white/70 bg-gradient-to-br ${
                  isSelfLove
                    ? "from-purple-100 via-rose-50 to-pink-100"
                    : selectedTheme.gradient
                }`}
              >
                <CardContent className="p-4 space-y-3">
                  <Card className="bg-white/80 border-white/60">
                    <CardContent className="p-3 text-sm space-y-2">
                      <p className="text-foreground/80">{message}</p>
                      {selectedGifts.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/40">
                          {selectedGifts.map((gift, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="bg-gradient-to-r from-rose-100 to-pink-100 text-foreground/70"
                            >
                              <span className="text-lg mr-1">{gift.emoji}</span>
                              <span className="text-xs font-medium">
                                {gift.name}
                              </span>
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground pt-2">
                        {chosenSticker}
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Receiver Input */}
              <div className="space-y-3">
                <Label htmlFor="receiver-username" className="font-semibold">
                  {isSelfLove ? "Confirm your username" : "Send to (username)"}
                </Label>
                <Input
                  id="receiver-username"
                  type="text"
                  placeholder={
                    isSelfLove ? "Your username" : "Enter receiver's username"
                  }
                  value={receiverUsername}
                  onChange={(e) => {
                    setReceiverUsername(e.target.value);
                    setError("");
                  }}
                  className={`rounded-xl ${
                    error
                      ? "border-destructive focus-visible:ring-destructive"
                      : "border-white/70"
                  } bg-white/80`}
                />
                {error && (
                  <p className="text-xs text-destructive font-medium">
                    {error}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <DialogFooter className="flex gap-3 pt-4 px-0">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 rounded-full border-white/70 bg-white/80"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  className="flex-1 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send with Celebration
                </Button>
              </DialogFooter>
            </>
          )}

          {sendState === "sending" && (
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-amber-300 rounded-full animate-pulse" />
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold">Sending your love...</h3>
                  <p className="text-sm text-muted-foreground">
                    Spreading warmth and gifts
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {sendState === "success" && (
            <Card className="border-0 shadow-none bg-transparent relative overflow-visible">
              {/* Confetti container */}
              <div className="absolute inset-0 pointer-events-none z-0" />

              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4 relative z-10">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-amber-300 rounded-full animate-ping opacity-75" />
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="relative">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                      <span className="absolute -top-1 -right-1 text-2xl">
                        💌
                      </span>
                      <span className="absolute -bottom-1 -left-1 text-xl">
                        ❤️
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                    Message sent! 💌
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {isSelfLove
                      ? `Your self-love gift with ${selectedGifts.length} gift${
                          selectedGifts.length !== 1 ? "s" : ""
                        } has been delivered! ✨`
                      : `Your love note with ${selectedGifts.length} gift${
                          selectedGifts.length !== 1 ? "s" : ""
                        } was sent to @${receiverUsername} 💝`}
                  </p>
                  <div className="flex items-center justify-center space-x-1 pt-2">
                    <span className="text-lg">💌</span>
                    <span className="text-lg">❤️</span>
                    <span className="text-lg">✨</span>
                    <span className="text-lg">💝</span>
                    <span className="text-lg">🎉</span>
                  </div>
                </div>
                <Button
                  onClick={handleClose}
                  className="rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-transform mt-4"
                >
                  Celebrate & Close
                </Button>
                <p className="text-xs text-muted-foreground pt-2">
                  Confetti will continue for a few moments...
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
