"use client";
import React, { useEffect, useState } from 'react';
import { getSocialMessages } from '@/lib/appwrite/crud';
import { Models } from 'appwrite';
import SocialMessageCard from './SocialMessageCard';
import { Loader2 } from 'lucide-react';

interface SocialMessageListProps {
    refreshKey: number;
}

const SocialMessageList = ({ refreshKey }: SocialMessageListProps) => {
  const [messages, setMessages] = useState<Models.DefaultRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      const fetchedMessages = await getSocialMessages();
      setMessages(fetchedMessages);
      setLoading(false);
    };

    fetchMessages();
  }, [refreshKey]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <SocialMessageCard key={message.$id} message={message} />
      ))}
    </div>
  );
};

export default SocialMessageList;
