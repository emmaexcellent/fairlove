"use client";
import React, { useState, useEffect } from "react";
import { Models } from "appwrite";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { toast } from "sonner";
import { updateSocialMessageLikes } from "@/lib/appwrite/crud";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Avatar from "react-nice-avatar";

interface SocialMessageCardProps {
  message: Models.DefaultRow;
}

const SocialMessageCard = ({ message }: SocialMessageCardProps) => {
  const [likes, setLikes] = useState(message.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [refreshCommentKey, setRefreshCommentKey] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const likedMessages = JSON.parse(
      localStorage.getItem("likedMessages") || "[]"
    );
    if (likedMessages.includes(message.$id)) {
      setIsLiked(true);
    }
  }, [message.$id]);

  // 🔑 Auto-scroll + highlight logic
  useEffect(() => {
    if (window.location.hash === `#${message.$id}`) {
      const el = document.getElementById(message.$id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        setIsHighlighted(true);
        // remove highlight after 3s
        const timer = setTimeout(() => setIsHighlighted(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [message.$id]);

  const handleLike = async () => {
    let newLikes;
    if (isLiked) {
      newLikes = likes - 1;
      setLikes(newLikes);
      setIsLiked(false);
      const likedMessages = JSON.parse(
        localStorage.getItem("likedMessages") || "[]"
      );
      const newLikedMessages = likedMessages.filter(
        (id: string) => id !== message.$id
      );
      localStorage.setItem("likedMessages", JSON.stringify(newLikedMessages));
    } else {
      newLikes = likes + 1;
      setLikes(newLikes);
      setIsLiked(true);
      setIsAnimating(true);
      const likedMessages = JSON.parse(
        localStorage.getItem("likedMessages") || "[]"
      );
      likedMessages.push(message.$id);
      localStorage.setItem("likedMessages", JSON.stringify(likedMessages));
    }

    await updateSocialMessageLikes(message.$id, newLikes);
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/social#${message.$id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link to post copied to clipboard!");
  };

  const onCommentPosted = () => {
    setRefreshCommentKey((prev) => prev + 1);
  };

  return (
    <div
      id={message.$id}
      className={`flex items-start gap-4 transition-colors duration-500 
        ${
          isHighlighted ? "bg-primary/20 dark:bg-yellow-900 rounded-lg p-2" : ""
        }`}
    >
      <Avatar
        className="w-10 h-10"
        {...JSON.parse(message.avatarConfig || "{}")}
      />
      <div className="w-full">
        <Card className="bg-white/50 dark:bg-black/20 border-white/30 dark:border-black/30 backdrop-blur-lg rounded-2xl rounded-tl-none">
          <CardContent className="p-4">
            <p className="text-foreground">{message.content}</p>
            <div className="text-xs text-muted-foreground pt-2">
              Posted anonymously
            </div>
          </CardContent>
          <CardFooter className="flex justify-start gap-2 p-3 pt-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLike}
              className="flex items-center gap-1 group"
            >
              <Heart
                className={`h-5 w-5 text-muted-foreground group-hover:text-red-500 transition-colors ${
                  isLiked ? "text-red-500 fill-current" : ""
                } ${isAnimating ? "animate-pop" : ""}`}
                onAnimationEnd={() => setIsAnimating(false)}
              />
              <span className="text-sm text-muted-foreground">{likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex items-center gap-1 group"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-sm text-muted-foreground">
                {message.comments || 0}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="flex items-center gap-1 group"
            >
              <Share2 className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </Button>
          </CardFooter>
        </Card>
        {showComments && (
          <div className="p-4 pl-0 bg-background/70">
            <CommentForm
              messageId={message.$id}
              onCommentPosted={onCommentPosted}
            />
            <CommentList
              messageId={message.$id}
              refreshKey={refreshCommentKey}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMessageCard;
