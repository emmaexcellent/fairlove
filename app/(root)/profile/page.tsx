import SuspendedProfileSettings from "@/components/profile/settings";


export default async function ProfilePage() {
  
  return (
    <div className="w-full max-w-6xl mx-auto py-8 pt-24 px-5 space-y-3">
      <p className="text-xs uppercase tracking-[0.25em] text-foreground/60">
        Profile & Themes
      </p>
      <h1 className="text-3xl md:text-4xl font-semibold serif text-foreground">
        Curate your sanctuary and keep love safe.
      </h1>
      <p className="text-foreground/70">
        Update your identity, keep email verified, and choose the aesthetic that
        matches your current mood.
      </p>
      <SuspendedProfileSettings />
    </div>
  );
}
