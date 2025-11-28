"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Models } from "node-appwrite";
import { likeDislikeDelete } from "@/lib/appwrite/crud";
import { toast } from "sonner";


interface MessageListProps {
  initialMessages: Models.Document[];
}

export default function MessageList({
  initialMessages,
}: MessageListProps) {
  
  const [messages, setMessages] = useState(initialMessages);
  const [action, setAction] = useState<{
    id: string;
    type: "like" | "dislike" | "delete";
  } | null>(null);

  const handleLike = async (messageId: string) => {
    setAction({ id: messageId, type: "like" });
    await likeDislikeDelete("like", messageId);
    setMessages(
      messages.map((msg) =>
        msg.$id === messageId ? { ...msg, dislike: false, like: true } : msg
      )
    );
    setAction(null);
  };

  const handleDislike = async (messageId: string) => {
    setAction({ id: messageId, type: "dislike" });
    await likeDislikeDelete("dislike", messageId);
    setMessages(
      messages.map((msg) =>
        msg.$id === messageId ? { ...msg, like: false, dislike: true } : msg
      )
    );
    setAction(null);
  };

  const handleDelete = async (messageId: string) => {
    setAction({ id: messageId, type: "delete" });
    const deleted = await likeDislikeDelete("delete", messageId);
    if (deleted){
      setMessages(messages.filter((msg) => msg.$id !== messageId));
      toast.success("Message deleted!")
    } 
    setAction(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {messages.length === 0 && (
        <p className="col-span-full text-center text-foreground/60 bg-white/70 border border-white/60 rounded-2xl py-6">
          You haven&apos;t received any love notes yet.
        </p>
      )}
      {messages.map((msg) => (
        <div
          key={msg.$id}
          className="relative overflow-hidden rounded-2xl border border-white/60 bg-gradient-to-br from-white/80 via-rose-50/70 to-sky-50/70 shadow-md p-4 flex flex-col justify-between"
        >
          <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-rose-200/60 to-amber-200/60 blur-2xl" />
          <div className="relative space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs text-primary font-semibold border border-white/60">
              paper heart
            </div>
            <p className="text-sm text-foreground">{msg.message}</p>
            <div className="flex items-center justify-between text-xs text-foreground/60">
              {new Date(msg.$createdAt)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
                .replace(/ /g, " · ")}
              <span className="inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 text-[11px] text-foreground border border-white/60">
                {msg.like ? "Loved" : "Awaiting reaction"}
              </span>
            </div>
          </div>
          <div className="relative flex items-center justify-between space-x-1 pt-4">
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLike(msg.$id)}
                className="text-green-600 hover:text-green-800"
              >
                {action?.id === msg.$id && action?.type === "like" ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <ThumbsUp
                    className="w-4 h-4 mr-1"
                    fill={msg.like ? "#16a34a" : "#fff"}
                  />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDislike(msg.$id)}
                className="text-red-600 hover:text-red-800"
              >
                {action?.id === msg.$id && action?.type === "dislike" ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <ThumbsDown
                    className="w-4 h-4 mr-1"
                    fill={msg.dislike ? "#dc2626" : "#fff"}
                  />
                )}
              </Button>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(msg.$id)}
              className="text-gray-600 hover:text-gray-800"
            >
              {action?.id === msg.$id && action?.type === "delete" ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
