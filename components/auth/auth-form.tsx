"use client";
import { useState, useEffect } from "react";
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
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import { checkUsernameExist } from "@/lib/appwrite/crud";

export function AuthForm({ authPage }: { authPage: "login" | "signup" }) {
  const { user, signup, login, loading } = useAuth();
  const router = useRouter();
  const urlParams = useSearchParams();
  const redirect_url = urlParams.get("redirect") || "/";

  const formSchema = z.object({
    username:
      authPage === "signup"
        ? z
            .string()
            .min(2, "Username is required")
            .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and _ allowed")
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
    mode: "onChange",
  });

  // username availability state
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameCheckedValue, setUsernameCheckedValue] = useState<
    string | null
  >(null);

  const watchedUsername = form.watch("username");

  useEffect(() => {
    if (authPage !== "signup") return;

    // reset error and previous check when username changes
    form.clearErrors("username");

    // if empty or too short, don't send request
    if (!watchedUsername || watchedUsername.trim().length < 2) {
      setCheckingUsername(false);
      setUsernameCheckedValue(null);
      return;
    }

    // debounce API call
    setCheckingUsername(true);
    const timeoutId = setTimeout(async () => {
      try {
        // avoid refiring for same value if already checked
        if (usernameCheckedValue === watchedUsername) {
          setCheckingUsername(false);
          return;
        }

        // 👇 replace this with your real endpoint
        const res = await checkUsernameExist(watchedUsername.trim());

        // expect { available: boolean, message?: string }
        if (res) {
          form.setError("username", {
            type: "manual",
            message: "Username is already taken",
          });
        }

        if (!res) {
          setUsernameCheckedValue(watchedUsername.trim());
        }
      } catch (error) {
        form.setError("username", {
          type: "manual",
          message: "Could not verify username. Please try again.",
        });
      } finally {
        setCheckingUsername(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedUsername, authPage]);

  if (!loading && user) {
    router.replace("/");
    return null;
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, email, password } = values;

    // Extra safety: don't submit while username is being checked
    if (authPage === "signup" && checkingUsername) {
      toast.warning("Please wait while we check your username...");
      return;
    }

    if (authPage === "login") {
      const response = await login(email, password);
      if (response.success) {
        toast.success(response.message);
        router.push(redirect_url || "/");
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await signup(email, password, username!);
      if (response.success) {
        toast.success(response.message);
        router.push(redirect_url || "/");
      } else {
        toast.error(response.message);
      }
    }
  }

  const isSubmitting =
    loading || checkingUsername || form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-5">
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
                          <div className="relative">
                            <Input
                              placeholder="Your username"
                              {...field}
                              disabled={loading}
                            />
                            {checkingUsername && (
                              <Loader2 className="absolute right-2 top-3 h-4 w-4 animate-spin text-primary" />
                            )}
                          </div>
                        </FormControl>
                        {/* Optional: show small helper when available */}
                        {usernameCheckedValue === field.value?.trim() &&
                          !form.formState.errors.username && (
                            <p className="text-xs text-emerald-600">
                              ✅ Username is available
                            </p>
                          )}
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
                          disabled={loading}
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
                          disabled={loading}
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : authPage === "login" ? (
                    "Login"
                  ) : (
                    "Sign up"
                  )}
                </Button>

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
                    <Link
                      href="/login"
                      className="underline underline-offset-4"
                    >
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
