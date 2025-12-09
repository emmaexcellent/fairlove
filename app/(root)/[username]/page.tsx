import { getProfileByUsername } from "@/lib/appwrite/crud";
import { redirect } from "next/navigation";
import SendMessagePageClientWrapper from "./client-page";

export default async function SendMessagePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  const profile = await getProfileByUsername(username);

  // if (!profile) {
  //   redirect("/social");
  // }

  return <SendMessagePageClientWrapper profile={profile} />;
}
