import { AuthForm } from "@/components/auth/auth-form";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
// import { getUser } from "@/lib/appwrite/auth";
// import { redirect } from "next/navigation";

export default async function SignUpPage() {
  // const user = await getUser();
  // if (user) {
  //   redirect("/");
  // }

  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <Suspense fallback={<LoadingFallback />}>
        <AuthForm authPage="signup" />
      </Suspense>
    </div>
  );
}


const LoadingFallback = () => (
  <div className="w-full h-48 flex flex-col items-center justify-center">
    <Loader2 size={50} className="animate-spin text-primary" />
  </div>
);
