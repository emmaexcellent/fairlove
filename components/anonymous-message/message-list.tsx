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
  const [ action, setAction ] = useState<"like" | "dislike" | "delete" | null>(null)

  const handleLike = async (messageId: string) => {
    setAction("like");
    await likeDislikeDelete("like", messageId);
    setMessages(
      messages.map((msg) =>
        msg.$id === messageId ? { ...msg, dislike: false, like: true } : msg
      )
    );
    setAction(null);
  };

  const handleDislike = async (messageId: string) => {
    setAction("dislike");
    await likeDislikeDelete("dislike", messageId);
    setMessages(messages.map((msg) =>
      msg.$id === messageId ? { ...msg, like: false, dislike: true } : msg
    ));
    setAction(null);
  };

  const handleDelete = async (messageId: string) => {
    setAction("delete");
    const deleted = await likeDislikeDelete("delete", messageId);
    if (deleted){
      setMessages(messages.filter((msg) => msg.$id !== messageId));
      toast.success("Message deleted!")
    } 
    setAction(null);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
      {messages.length === 0 && (
        <div className="">
          <p className="text-center text-foreground/60">
            You have not receive any message!
          </p>
        </div>
      )}
      {messages.map((msg) => (
        <div
          key={msg.$id}
          className="bg-card rounded-lg shadow-md p-4 flex flex-col justify-between"
        >
          <p className="mb-2 text-sm">{msg.message}</p>
          <div className="text-sm text-foreground/80">
            <p className="w-full text-xs flex justify-end">
              {new Date(msg.$createdAt)
                .toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "2-digit",
                })
                .replace(/ /g, " - ")}
            </p>
            <div className="flex items-center justify-between space-x-1 pt-3">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(msg.$id)}
                  className="text-green-600 hover:text-green-800"
                >
                  {action === "like" ? (
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
                  {action === "dislike" ? (
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
                {action === "delete" ? (
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
