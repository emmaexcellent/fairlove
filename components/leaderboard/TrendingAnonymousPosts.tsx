"use client";

import { getTrendingAnonymousMessages } from "@/lib/appwrite/crud";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import SocialMessageCard from "../social/SocialMessageCard";

export default function TrendingAnonymousPosts() {
  const [messages, setMessages] = useState<Models.DefaultRow[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const trendingMessages = await getTrendingAnonymousMessages();
      setMessages(trendingMessages);
    };
    fetchMessages();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Anonymous Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <SocialMessageCard key={message.$id} message={message} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
