"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createAccount, createSession } from "@/lib/appwrite/auth";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/auth";

export function AuthForm({ authPage }: { authPage: "login" | "signup" }) {
  const {user} = useAuth();
  const router = useRouter()

  const urlParams = useSearchParams();
  const redirect_url = urlParams.get("redirect") || "/";

  const [submittingForm, setSubmittingForm] = useState(false);
    
  const formSchema = z.object({
    username:
      authPage === "signup"
        ? z.string().min(2, "Username is required")
        : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  if (user) {
    router.replace("/");
    return;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {

    setSubmittingForm(true);    
    try {
      const { username, email, password } = values;
      if(authPage === "login"){
        const response = await createSession(email, password);
        if (response?.success) {
          toast.success(response?.message);
          router.push(redirect_url || "/")
        } else {
          toast.error(response?.message);
        }
      } else {
        const response = await createAccount(
          email,
          password,
          username!
        );
        if (response?.success) {
          toast.success(response?.message);
          router.push(redirect_url || "/");
        } else {
          toast.error(response?.message);
        }
      }
      
    } catch (error) {
      console.error(error)
      toast.error("An error occurred. Please try again.");
    } finally {
      setSubmittingForm(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    {authPage === "login"
                      ? "Welcome back"
                      : "Create an account"}
                  </h1>
                  <p className="text-muted-foreground">
                    {authPage === "login"
                      ? "Login to your account"
                      : "Sign up for a new account"}
                  </p>
                </div>

                {authPage === "signup" && (
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your username"
                            {...field}
                            disabled={submittingForm}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          {...field}
                          disabled={submittingForm}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between pb-2">
                        <FormLabel>Password</FormLabel>
                        {authPage === "login" && (
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        )}
                      </div>

                      <FormControl>
                        <Input
                          placeholder="*******"
                          type="password"
                          disabled={submittingForm}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={submittingForm}
                >
                  {submittingForm ? (
                    <Loader2 className="animate-spin" />
                  ) : authPage === "login" ? (
                    "Login"
                  ) : (
                    "Sign up"
                  )}
                </Button>

                {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                  <span className="relative z-10 bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-black hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Apple</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-primary hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-blue-600 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116c.729 0 1.326-.597 1.326-1.326V1.326C24 .597 23.403 0 22.675 0z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Facebook</span>
                  </Button>
                </div> */}
                {authPage === "login" ? (
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href={`/signup?redirect=${redirect_url}`}
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                ) : (
                  <div className="text-center text-sm">
                    Have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4">
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              width={500}
              height={500}
              src="/love.jpg"
              alt="FairLove"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale opacity-90"
              priority
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
