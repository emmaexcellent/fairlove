"use client";

import { getMostReactedMessages } from "@/lib/appwrite/crud";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import SocialMessageCard from "../social/SocialMessageCard";

export default function MostReactedNotes() {
  const [messages, setMessages] = useState<Models.DefaultRow[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const mostReactedMessages = await getMostReactedMessages();
      setMessages(mostReactedMessages);
    };
    fetchMessages();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most-Reacted Notes</CardTitle>
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
