import { AuthForm } from "@/components/auth/auth-form";
// import { getUser } from "@/lib/appwrite/auth";
// import { redirect } from "next/navigation";

export default async function LoginPage() {
    
  // const user = await getUser();
  // if (user) {
  //   redirect("/");
  // }

  return (
    <div className="w-full max-w-sm md:max-w-3xl">
      <AuthForm authPage="login" />
    </div>
  );
}
