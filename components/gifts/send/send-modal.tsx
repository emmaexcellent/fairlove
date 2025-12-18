"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  CheckCircle,
  Search,
  User,
  UserX,
  Snowflake,
  Gift,
} from "lucide-react";
import type { Gift as GiftType } from "@/lib/gift-data";

// Shadcn Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  selectedGifts: GiftType[];
  selectedTheme: { id: string; name: string; gradient: string };
  isSelfLove?: boolean;
  chosenSticker: string;
  isChristmasEdition?: boolean;
}

type SendState = "input" | "sending" | "success";

// Mock user data for search
const mockUsers = [
  { id: 1, username: "santa_claus", avatar: "🎅", isOnline: true },
  { id: 2, username: "winter_rose", avatar: "❄️", isOnline: false },
  { id: 3, username: "christmas_spirit", avatar: "🎄", isOnline: true },
  { id: 4, username: "snowflake_dream", avatar: "❄️", isOnline: true },
  { id: 5, username: "north_pole_elf", avatar: "🧝", isOnline: false },
  { id: 6, username: "cozy_fireplace", avatar: "🪵", isOnline: true },
  { id: 7, username: "jingle_bells", avatar: "🔔", isOnline: true },
  { id: 8, username: "holly_jolly", avatar: "🎄", isOnline: false },
  { id: 9, username: "mistletoe_magic", avatar: "💋", isOnline: true },
  { id: 10, username: "snow_angel", avatar: "👼", isOnline: true },
];

export function SendModal({
  isOpen,
  onClose,
  message,
  selectedGifts,
  selectedTheme,
  isSelfLove,
  chosenSticker,
  isChristmasEdition = true,
}: SendModalProps) {
  const [receiverUsername, setReceiverUsername] = useState("");
  const [sendState, setSendState] = useState<SendState>("input");
  const [error, setError] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockUsers>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [sendAnonymously, setSendAnonymously] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const hasTriggeredConfetti = useRef(false);

  // Handle user search
  useEffect(() => {
    if (receiverUsername.trim()) {
      const results = mockUsers.filter((user) =>
        user.username.toLowerCase().includes(receiverUsername.toLowerCase())
      );
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  }, [receiverUsername]);

  const handleSelectUser = (username: string) => {
    setReceiverUsername(username);
    setSelectedUser(username);
    setShowSearchResults(false);
  };

  const handleSend = async () => {
    if (!receiverUsername.trim() && !sendAnonymously) {
      setError("Please enter a username or enable anonymous sending");
      return;
    }

    setError("");
    setSendState("sending");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSendState("success");
  };

  const handleClose = () => {
    setSendState("input");
    setReceiverUsername("");
    setSelectedUser(null);
    setError("");
    setSendAnonymously(false);
    setShowSearchResults(false);
    hasTriggeredConfetti.current = false;
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="md:max-w-2xl max-w-[95%] max-h-[95%] w-full overflow-y-auto p-0 gap-0 rounded-2xl border-2 border-white/80 shadow-2xl">
        {/* Header with Christmas Theme */}
        <DialogHeader
          className={`
          ${
            isChristmasEdition
              ? "bg-gradient-to-r from-red-500/10 via-green-500/10 to-white/20 border-b border-white/30"
              : "bg-gradient-to-r from-rose-100/80 via-purple-100/80 to-amber-100/80 border-b border-white/60"
          } p-6 rounded-t-3xl relative overflow-hidden
        `}
        >
          <div className="relative z-10">
            <DialogTitle
              className={`text-xl ${isChristmasEdition ? "text-red-600" : ""}`}
            >
              {isChristmasEdition
                ? "🎁 Send Christmas Cheer"
                : "Share this moment"}
            </DialogTitle>
            <DialogDescription
              className={isChristmasEdition ? "text-green-700/80" : ""}
            >
              {isSelfLove
                ? "Celebrate yourself with this special gift"
                : isChristmasEdition
                ? "Spread holiday joy with your heartfelt message"
                : "Spread love and joy with your message"}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 space-y-6 relative z-10 overflow-hidden">
          {sendState === "input" && (
            <>
              {/* Christmas-themed Preview Card */}
              <Card
                className={`
                border-2 ${
                  isChristmasEdition ? "border-red-200/50" : "border-white/70"
                } 
                bg-gradient-to-br ${
                  isChristmasEdition
                    ? "from-red-50/60 via-white to-green-50/60 shadow-lg"
                    : isSelfLove
                    ? "from-purple-100 via-rose-50 to-pink-100"
                    : selectedTheme.gradient
                } relative overflow-hidden
              `}
              >
                {isChristmasEdition && (
                  <>
                    <div className="absolute top-2 left-2 text-lg">🎄</div>
                    <div className="absolute bottom-2 right-2 text-lg">🎁</div>
                  </>
                )}
                <CardContent className="p-4 space-y-3 relative z-10">
                  <Card
                    className={`bg-white/90 ${
                      isChristmasEdition
                        ? "border-green-100"
                        : "border-white/60"
                    }`}
                  >
                    <CardContent className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isChristmasEdition
                              ? "bg-gradient-to-br from-red-100 to-green-100"
                              : "bg-gradient-to-br from-rose-100 to-pink-100"
                          }`}
                        >
                          <Gift className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-foreground/80 font-serif text-sm leading-relaxed">
                            {message.length > 150
                              ? `${message.substring(0, 150)}...`
                              : message}
                          </p>
                          {selectedGifts.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-black/10">
                              {selectedGifts.map((gift, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className={`${
                                    isChristmasEdition
                                      ? "bg-gradient-to-r from-red-50 to-green-50 text-foreground/70 border border-red-100"
                                      : "bg-gradient-to-r from-rose-100 to-pink-100 text-foreground/70"
                                  }`}
                                >
                                  <span className="text-lg mr-1">
                                    {gift.emoji}
                                  </span>
                                  <span className="text-xs font-medium">
                                    {gift.name}
                                  </span>
                                </Badge>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-2">
                            <div className="text-xs text-muted-foreground">
                              {chosenSticker}
                            </div>
                            {isChristmasEdition && (
                              <div className="text-xs text-green-600 font-medium">
                                🎄 Christmas Edition
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Tabs for Send Options */}
              <Tabs defaultValue="search" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4 bg-white/80 border border-white/60">
                  <TabsTrigger
                    value="search"
                    className="data-[state=active]:bg-red-500 data-[state=active]:text-white"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Find User
                  </TabsTrigger>
                  <TabsTrigger
                    value="anonymous"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                  >
                    <UserX className="w-4 h-4 mr-2" />
                    Anonymous
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="search" className="space-y-4">
                  <div className="space-y-3">
                    <Label
                      htmlFor="receiver-username"
                      className="font-semibold flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Send to (username)
                    </Label>
                    <div className="relative">
                      <Input
                        id="receiver-username"
                        type="text"
                        placeholder="Search users (e.g., emmaexcel)"
                        value={receiverUsername}
                        onChange={(e) => {
                          setReceiverUsername(e.target.value);
                          setError("");
                        }}
                        className={`rounded-xl pl-10 ${
                          error
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-white/70"
                        } bg-white/80`}
                      />
                      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    </div>

                    {/* Search Results Dropdown */}
                    {showSearchResults && searchResults.length > 0 && (
                      <Card className="absolute z-50 max-w-lg w-full mt-1 border-white/70 shadow-lg max-h-60 overflow-y-auto mb-10">
                        <CardContent className="p-2">
                          {searchResults.map((user) => (
                            <button
                              key={user.id}
                              onClick={() => handleSelectUser(user.username)}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gradient-to-r hover:from-red-50 hover:to-green-50 transition-all ${
                                selectedUser === user.username
                                  ? "bg-gradient-to-r from-red-50 to-green-50"
                                  : ""
                              }`}
                            >
                              <div className="text-2xl">{user.avatar}</div>
                              <div className="flex-1 text-left">
                                <div className="font-medium">
                                  @{user.username}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <div
                                    className={`w-2 h-2 rounded-full ${
                                      user.isOnline
                                        ? "bg-green-500"
                                        : "bg-gray-400"
                                    }`}
                                  />
                                  {user.isOnline ? "Online" : "Offline"}
                                </div>
                              </div>
                              {selectedUser === user.username && (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              )}
                            </button>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="anonymous" className="space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-blue-50/80 to-purple-50/80 border border-blue-100/60 p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                        <UserX className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-700">
                          Send Secretly
                        </h4>
                        <p className="text-sm text-blue-600/80">
                          Your identity will be hidden behind a mysterious 🎁
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-white/70">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">🎁</div>
                        <div>
                          <div className="font-medium">Mysterious Gift</div>
                          <div className="text-xs text-muted-foreground">
                            Receiver won't know it's from you
                          </div>
                        </div>
                      </div>
                      <Switch
                        checked={sendAnonymously}
                        onCheckedChange={(checked) => {
                          setSendAnonymously(checked);
                          if (checked) {
                            setReceiverUsername("");
                            setSelectedUser(null);
                          }
                        }}
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Anonymous Toggle for Quick Access */}
              {!sendAnonymously && receiverUsername && (
                <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white/60 ">
                  <div className="flex items-center gap-2">
                    <UserX className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Send anonymously instead?</span>
                  </div>
                  <Switch
                    checked={sendAnonymously}
                    onCheckedChange={(checked) => {
                      setSendAnonymously(checked);
                      if (checked) {
                        setReceiverUsername("");
                        setSelectedUser(null);
                      }
                    }}
                    className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500"
                  />
                </div>
              )}

              {error && (
                <p className="text-xs text-destructive font-medium p-3 bg-red-50 rounded-lg">
                  ⚠️ {error}
                </p>
              )}

              {/* Send Summary */}
              <Card className="border-white/50 bg-white/60">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Sending as:</span>
                    <span className="font-medium">
                      {sendAnonymously ? (
                        <span className="flex items-center gap-2 text-blue-600">
                          <UserX className="w-4 h-4" />
                          Anonymous 🎁
                        </span>
                      ) : selectedUser ? (
                        <span className="flex items-center gap-2 text-green-600">
                          <User className="w-4 h-4" />@{selectedUser}
                        </span>
                      ) : (
                        <span className="text-amber-600">Enter username</span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-muted-foreground">Includes:</span>
                    <span className="font-medium flex items-center gap-2">
                      {selectedGifts.length} gift
                      {selectedGifts.length !== 1 ? "s" : ""}
                      <span className="text-lg">
                        {selectedGifts[0]?.emoji || "🎁"}
                      </span>
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <DialogFooter className="flex gap-3 pt-4 px-0">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  className={`flex-1 rounded-full border-white/70 bg-white/80 hover:bg-white ${
                    isChristmasEdition ? "hover:border-red-200" : ""
                  }`}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSend}
                  disabled={!receiverUsername.trim() && !sendAnonymously}
                  className={`flex-1 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform ${
                    isChristmasEdition
                      ? "bg-gradient-to-r from-red-500 via-green-500 to-blue-500 text-white"
                      : "bg-gradient-to-r from-rose-400 via-fuchsia-400 to-amber-300 text-white"
                  }`}
                >
                  {isChristmasEdition ? (
                    <>
                      <Snowflake className="w-4 h-4 mr-2" />
                      Send Holiday Cheer
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send with Celebration
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}

          {sendState === "sending" && (
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="relative w-20 h-20">
                  <div
                    className={`absolute inset-0 ${
                      isChristmasEdition
                        ? "bg-gradient-to-r from-red-400 to-green-400"
                        : "bg-gradient-to-r from-rose-400 to-amber-300"
                    } rounded-full animate-pulse`}
                  />
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <Loader2
                      className={`w-8 h-8 ${
                        isChristmasEdition ? "text-green-500" : "text-primary"
                      } animate-spin`}
                    />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3
                    className={`font-semibold ${
                      isChristmasEdition ? "text-red-600" : ""
                    }`}
                  >
                    {isChristmasEdition
                      ? "Wrapping your gifts..."
                      : "Sending your love..."}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isChristmasEdition
                      ? "Adding festive magic to your message"
                      : "Spreading warmth and gifts"}
                  </p>
                  {isChristmasEdition && (
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <span className="text-lg">🎁</span>
                      <span className="text-lg">✨</span>
                      <span className="text-lg">❄️</span>
                      <span className="text-lg">🦌</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {sendState === "success" && (
            <Card className="border-0 shadow-none bg-transparent relative overflow-visible">
              {/* Confetti container */}
              <div className="absolute inset-0 pointer-events-none z-0" />

              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4 relative z-10">
                {isChristmasEdition && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-4xl">
                    🎄
                  </div>
                )}
                <div className="relative w-24 h-24">
                  <div
                    className={`absolute inset-0 ${
                      isChristmasEdition
                        ? "bg-gradient-to-r from-red-500 to-green-500"
                        : "bg-gradient-to-r from-rose-400 to-amber-300"
                    } rounded-full animate-ping opacity-75`}
                  />
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="relative">
                      <CheckCircle
                        className={`w-12 h-12 ${
                          isChristmasEdition
                            ? "text-green-500"
                            : "text-green-500"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3
                    className={`text-2xl font-bold ${
                      isChristmasEdition
                        ? "bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent"
                        : "bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent"
                    }`}
                  >
                    {isChristmasEdition
                      ? "Holiday Cheer Delivered! 🎄"
                      : "Message sent! 💌"}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    {isSelfLove
                      ? `Your self-love gift with ${selectedGifts.length} gift${
                          selectedGifts.length !== 1 ? "s" : ""
                        } has been delivered! ✨`
                      : sendAnonymously
                      ? `Your ${
                          isChristmasEdition ? "holiday" : ""
                        } gift was sent anonymously 🎁`
                      : `Your ${
                          isChristmasEdition ? "holiday" : "love"
                        } note with ${selectedGifts.length} gift${
                          selectedGifts.length !== 1 ? "s" : ""
                        } was sent to @${receiverUsername} 💝`}
                  </p>
                  <div className="flex items-center justify-center space-x-2 pt-2">
                    {isChristmasEdition ? (
                      <>
                        <span className="text-xl">🎁</span>
                        <span className="text-xl">❄️</span>
                        <span className="text-xl">✨</span>
                        <span className="text-xl">🦌</span>
                        <span className="text-xl">🎄</span>
                      </>
                    ) : (
                      <>
                        <span className="text-lg">💌</span>
                        <span className="text-lg">❤️</span>
                        <span className="text-lg">✨</span>
                        <span className="text-lg">💝</span>
                        <span className="text-lg">🎉</span>
                      </>
                    )}
                  </div>
                </div>
                <Button
                  onClick={handleClose}
                  className={`rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform mt-4 ${
                    isChristmasEdition
                      ? "bg-gradient-to-r from-red-500 to-green-500 text-white"
                      : "bg-gradient-to-r from-rose-400 to-pink-400 text-white"
                  }`}
                >
                  Close
                </Button>
                <p className="text-xs text-muted-foreground pt-2">
                  {isChristmasEdition
                    ? "Snowfall will continue..."
                    : "Confetti will continue for a few moments..."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
