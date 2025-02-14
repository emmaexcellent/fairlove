import SuspendedProfileSettings from "@/components/profile/settings";
import { getUser } from "@/lib/appwrite/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser()

  if (!user) {
    redirect("/login?redirect=/profile");
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 pt-20">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
      <SuspendedProfileSettings user={user} />
    </div>
  );
}
