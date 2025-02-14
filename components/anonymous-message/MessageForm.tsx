"use client"
import { Loader2, Send } from 'lucide-react';
import React, { useState } from 'react'
import { toast } from "sonner";
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { sendMessage } from '@/lib/appwrite/crud';
import Link from 'next/link';
import { Models } from 'node-appwrite';

const MessageForm = ({ messageUser }: { messageUser: Models.Document }) => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    if (message.trim().length === 0) {
      toast.warning("Please enter a message before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await sendMessage(messageUser.$id, message);
      if (response) {
        toast.success(
          "Message sent! Your anonymous message has been delivered successfully."
        );
        setMessageSent(true);
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Card className="backdrop-blur-xl bg-primary/40 border-white/20 text-white">
      {messageSent ? (
        <>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">
              Message sent!. Now It&apos;s Your Turn
            </h1>
          </CardHeader>
          <div className="flex items-center justify-between px-6 pb-6">
            <Link href="/">
              <Button variant="ghost">Go Home</Button>
            </Link>
            <Link href="/anonymous-message">
              <Button>Get Message Link</Button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <CardHeader>
            <h1 className="text-2xl font-bold text-center">
              Send an Anonymous Message
            </h1>
            <p className="text-center text-white/80">to @{messageUser.username}</p>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Textarea
                placeholder="Type your anonymous message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[150px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
                disabled={isSubmitting}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-400 to-primary hover:from-primary hover:to-primary text-white font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </>
      )}
    </Card>
  );
};

export default MessageForm