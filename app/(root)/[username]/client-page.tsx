"use client";

import { GiftModal } from "@/components/gifts/GiftModal";
import { Button } from "@/components/ui/button";
import { GiftProvider, useGift } from "@/context/gift";
import MessageForm from "@/components/anonymous-message/MessageForm";

function SendMessagePageClient({ profile }: { profile: any }) {
  const { openGiftModal } = useGift();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <MessageForm />
        <Button onClick={openGiftModal} className="w-full">
          Send a Gift
        </Button>
      </div>
      <GiftModal receiverId={profile.$id} />
    </div>
  );
}

export default function SendMessagePageClientWrapper({
  profile,
}: {
  profile: any;
}) {
  return (
    <GiftProvider>
      <SendMessagePageClient profile={profile} />
    </GiftProvider>
  );
}
