import MessageList from "@/components/anonymous-message/message-list";
import { getUser } from "@/lib/appwrite/auth";
import { getMessageList } from "@/lib/appwrite/crud";
import { redirect } from "next/navigation";
import React from "react";

export default async function MessagesPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login?redirect=/messages");
  }

  const messages = await getMessageList(user.$id);

  return (
    <div className="min-h-screen py-8 pt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">My Messages</h1>
        <MessageList initialMessages={messages} />
      </div>
    </div>
  );
}
