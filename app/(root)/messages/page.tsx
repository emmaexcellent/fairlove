"use client";
import React, { useEffect, useState } from "react";
import MessageList from "@/components/anonymous-message/message-list";
import { useAuth } from "@/context/auth";
import { getMessageList } from "@/lib/appwrite/crud";
import { useRouter } from "next/navigation";
import { Models } from "node-appwrite";

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Models.Document[] | []>([]);

  useEffect(() => {
    if (!user) {
      return router.push("/login?redirect=/messages");
    }
    getMessageList(user.$id).then((data) => setMessages(data));
  }, [user, router]);

  

  

  return (
    <div className="min-h-screen py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">My Messages</h1>
        <MessageList initialMessages={messages} />
      </div>
    </div>
  );
}
