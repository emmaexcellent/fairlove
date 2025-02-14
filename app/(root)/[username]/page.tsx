import MessageForm from "@/components/anonymous-message/MessageForm";
import { validateUsernameExist } from "@/lib/appwrite/crud";
import { redirect } from "next/navigation";

export default async function SendMessagePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username.slice(3);
  const messageUser = await validateUsernameExist(username);
  if(!messageUser){
    redirect("/anonymous-message")
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <MessageForm messageUser={messageUser} />
      </div>
    </div>
  );
}
