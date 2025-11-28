"use client";

import { useEffect, useState } from "react";
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
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export default function MessageCard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/anonymous-message");
    }
  }, [loading, user, router]);

  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(
    "Send me an anonymous love note. Your words are safe and warmly received."
  );
  const [editedMessage, setEditedMessage] = useState(message);

  const profileUrl = `${process.env.NEXT_PUBLIC_URL ?? ""}/@${
    user?.username ?? "me"
  }`;

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
    copyToClipboard();
    toast(
      "The link has been copied. You can now paste it into your Instagram post or story."
    );
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen w-full pt-20">
      <div className="relative overflow-hidden rounded-3xl bg-white/70 border border-white/60 p-6 md:p-8 shadow-xl">
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-rose-200/60 to-sky-200/60 blur-3xl" />
        <div className="absolute -left-12 bottom-0 h-36 w-36 rounded-full bg-gradient-to-tr from-amber-200/50 to-purple-100/60 blur-3xl" />
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 relative">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
              Anonymous Love Share
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold serif text-foreground">
              Invite whispers with floating paper hearts and gentle glows.
            </h1>
            <p className="text-foreground/70">
              Your link feels like a soft portal: calming gradients, rounded
              shapes, and a safe space where people can send anonymous love
              notes.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-rose-50/80 to-white/80 p-4 border border-white/60">
                <p className="text-sm font-semibold text-foreground">
                  Share link
                </p>
                <p className="text-xs text-foreground/60">
                  Copy your love portal link and invite gentle notes.
                </p>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-sky-50/80 to-white/80 p-4 border border-white/60">
                <p className="text-sm font-semibold text-foreground">
                  Check vault
                </p>
                <p className="text-xs text-foreground/60">
                  Read anonymous whispers in the LoveVault gallery.
                </p>
              </div>
            </div>
          </div>

          <Card className="w-full backdrop-blur-2xl bg-gradient-to-br from-white/80 via-rose-50/80 to-sky-50/80 border-white/50 text-foreground shadow-lg">
            <CardHeader className="text-center space-y-3 pb-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs text-primary border border-white/60">
                <Check size={14} />
                Safe, anonymous, loving
              </div>
              <h2 className="text-2xl font-semibold tracking-tight serif">
                Your anonymous link
              </h2>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="truncate max-w-[220px]">{profileUrl}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:text-primary hover:bg-white/70"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Your message prompt
                      </label>
                      <Textarea
                        value={editedMessage}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                          setEditedMessage(e.target.value)
                        }
                        placeholder="Enter your message prompt..."
                        className="min-h-[100px] bg-white/80 border-white/70 text-foreground placeholder:text-foreground/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Quick templates
                      </label>
                      <ScrollArea className="h-32 rounded-md border border-white/60 bg-white/60">
                        <div className="p-4 space-y-2">
                          {messagePresets.map((preset) => (
                            <Button
                              key={preset.id}
                              variant="ghost"
                              className="w-full justify-start text-left text-foreground hover:bg-white/80"
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
                        className="flex-1 bg-gradient-to-r from-rose-400 to-amber-300 text-white"
                        onClick={handleSave}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save changes
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1 hover:bg-white/70"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <div className="text-center text-foreground p-4 pt-7 rounded-lg bg-white/70 border border-white/60">
                      {message}
                    </div>
                    <Button
                      variant="ghost"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/70 text-primary"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </div>
                )}
              </div>

              <p className="text-center text-xs text-foreground/60">
                Share your portal to collect anonymous, heartfelt love notes.
                Responses flow into the LoveVault where you can react softly.
              </p>
              <div className="space-y-3">
                <Link href="/messages">
                  <Button
                    className="w-full bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300 text-white font-semibold h-12 shadow-lg"
                    size="lg"
                  >
                    <MessageCircle className="mr-2" />
                    View whispers
                  </Button>
                </Link>

                <Button
                  className="w-full bg-gradient-to-r from-sky-400 to-purple-400 text-white shadow"
                  size="lg"
                  onClick={shareProfile}
                >
                  <Share className="mr-2" />
                  Share my portal
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
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
      </div>
    </div>
  );
}
