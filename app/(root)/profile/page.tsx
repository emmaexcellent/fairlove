import SuspendedProfileSettings from "@/components/profile/settings";


export default async function ProfilePage() {
  
  return (
    <div className="w-full max-w-6xl mx-auto py-8 pt-20">
      <h1 className="text-2xl font-semibold mb-6">Profile Settings</h1>
      <SuspendedProfileSettings />
    </div>
  );
}
