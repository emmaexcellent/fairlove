"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Share,
  MessageCircle,
  Copy,
  Check,
  Facebook,
  Instagram,
  PhoneIcon as WhatsApp,
  Save,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { messagePresets } from "./message-presetss";
import { Models } from "node-appwrite";
import Link from "next/link";

interface MessageCardProps {
  user: Models.Document | null;
}

export default function MessageCard({ user }: MessageCardProps) {

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(
    "Send me an anonymous message! Can't wait to read what you have to say 😊"
  );
  const [editedMessage, setEditedMessage] = useState(message);

  const profileUrl = `${process.env.NEXT_PUBLIC_URL!}/@${user?.username}`;

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("The profile link has been copied to your clipboard.");
  };

  const handleSave = () => {
    setMessage(editedMessage);
    setIsEditing(false);
    toast.success("Your message prompt has been updated.");
  };

  const handlePresetSelect = (presetMessage: string) => {
    setEditedMessage(presetMessage);
  };

  const shareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out my anonymous message page!",
          text: message,
          url: profileUrl,
        });
        toast.success("Your profile has been shared successfully!");
      } catch (error) {
        console.error("Error sharing:", error);
        toast.error("There was an error while sharing your profile. Try again");
      }
    } else {
      copyToClipboard();
    }
  };

  const shareWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${message} ${profileUrl}`
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const shareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      profileUrl
    )}`;
    window.open(facebookUrl, "_blank");
  };

  const shareInstagram = () => {
    // Instagram doesn't have a direct share URL, so we'll copy to clipboard and notify the user
    copyToClipboard();
    toast(
      "The link has been copied. You can now paste it into your Instagram post or story."
    );
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center md:mt-10">
      <Card className="w-full max-w-md backdrop-blur-xl bg-primary/50 border-white/20 text-white">
        <CardHeader className="text-center space-y-2 pb-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Your Message Link
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="truncate">{profileUrl}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:text-white hover:bg-white/20"
              onClick={copyToClipboard}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Message Editor Section */}
          <div className="space-y-3">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Your Message Prompt:
                  </label>
                  <Textarea
                    value={editedMessage}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setEditedMessage(e.target.value)
                    }
                    placeholder="Enter your message prompt..."
                    className="min-h-[100px] bg-white/10 border-white/50 text-white placeholder:text-white/80"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Quick Templates:
                  </label>
                  <ScrollArea className="h-32 rounded-md border border-white/20 bg-white/5">
                    <div className="p-4 space-y-2">
                      {messagePresets.map((preset) => (
                        <Button
                          key={preset.id}
                          variant="ghost"
                          className="w-full justify-start text-left text-white hover:text-white hover:bg-white/10"
                          onClick={() => handlePresetSelect(preset.message)}
                        >
                          <span className="mr-2">{preset.title}</span>
                        </Button>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
                    onClick={handleSave}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex-1 hover:bg-white/20"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="text-center text-white/90 p-4 pt-7 rounded-lg bg-white/5 border border-primary/50">
                  {message}
                </div>
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 text-primary"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>

          <p className="text-center text-xs">
            Share your profile link ❤️ to get responses from your friend. Go to
            &quot;View Messages&quot; to check out the responses. 👌
          </p>
          <div className="space-y-3">
            <Link href="/messages">
              <Button
                className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-semibold h-12"
                size="lg"
              >
                <MessageCircle className="mr-2" />
                View Messages
              </Button>
            </Link>

            <Button
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white"
              size="lg"
              onClick={shareProfile}
            >
              <Share className="mr-2" />
              Share My Profile
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="lg"
                onClick={shareWhatsApp}
              >
                <WhatsApp className="mr-2" />
                WhatsApp
              </Button>

              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                onClick={shareFacebook}
              >
                <Facebook className="mr-2" />
                Facebook
              </Button>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-500 hover:from-fuchsia-600 hover:via-rose-600 hover:to-orange-600 text-white"
              size="lg"
              onClick={shareInstagram}
            >
              <Instagram className="mr-2" />
              Share on Instagram
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
