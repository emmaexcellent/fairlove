"use client";

import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Models } from "appwrite";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth";

const nameSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
});

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Incorrect password"),
});

const passwordSchema = z.object({
  oldPassword: z.string().min(8, "Password must be at least 8 characters"),
  newPassword: z.string(),
});

type NameFormValues = z.infer<typeof nameSchema>;
type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

const themeOptions = [
  {
    id: "rose-dawn",
    name: "Rose Dawn",
    description: "Soft blush, warm gold glow, poetic and bright.",
    gradient: "from-rose-200 via-amber-100 to-white",
    values: {
      "--background": "325 72% 97%",
      "--foreground": "318 18% 14%",
      "--foreground-rgb": "31, 20, 30",
      "--primary": "343 84% 63%",
      "--primary-foreground": "330 100% 98%",
      "--secondary": "247 61% 96%",
      "--secondary-foreground": "241 49% 20%",
      "--background-start-rgb": "255, 241, 245",
      "--background-end-rgb": "237, 244, 255",
    },
  },
  {
    id: "lavender-haze",
    name: "Lavender Haze",
    description: "Lavender, dreamy blue lights, calm and intimate.",
    gradient: "from-violet-200 via-sky-100 to-white",
    values: {
      "--background": "260 70% 97%",
      "--foreground": "248 20% 18%",
      "--foreground-rgb": "40, 32, 48",
      "--primary": "274 68% 62%",
      "--primary-foreground": "260 100% 98%",
      "--secondary": "220 70% 96%",
      "--secondary-foreground": "220 25% 30%",
      "--background-start-rgb": "243, 240, 255",
      "--background-end-rgb": "227, 239, 255",
    },
  },
  {
    id: "moonlit-blue",
    name: "Moonlit Blue",
    description: "Dreamy blue dusk with soft sparkles and quiet light.",
    gradient: "from-sky-200 via-indigo-100 to-white",
    values: {
      "--background": "216 70% 96%",
      "--foreground": "222 25% 18%",
      "--foreground-rgb": "28, 36, 52",
      "--primary": "210 83% 64%",
      "--primary-foreground": "210 100% 96%",
      "--secondary": "225 60% 94%",
      "--secondary-foreground": "222 25% 30%",
      "--background-start-rgb": "232, 243, 255",
      "--background-end-rgb": "216, 228, 247",
    },
  },
];

function ProfileSettings({
  initialUserData: user,
}: {
  initialUserData: Models.DefaultRow;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTheme, setActiveTheme] = useState("rose-dawn");
  
  const nameForm = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: { username: "" },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  // const updateProfile = async (
  //   field: string,
  //   data: { [key: string]: string }
  // ) => {
  //   setIsUpdating(true);
  //   try {
  //     const newUserData = await updateProfileData(user.$id, field, data);
  //     if (newUserData) {
  //       setUser(newUserData);
  //       toast.success(`Your ${field} has been successfully updated.`);
  //     } else {
  //       toast.error(
  //         `Please check ${field === "password" ? "old" : ""} ${field}  ${
  //           field === "email" ? "and password" : ""
  //         }   and try again.`
  //       );
  //     }
  //   } catch (error) {
  //     console.error(`Error updating ${field}:`, error);
  //     toast.error(
  //       `There was an error updating your ${field}. Please try again.`
  //     );
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // };

  const handleSendEmailVerification = async () => {
    setIsUpdating(true);
    try {
      // await requestEmailVerification(user);
      toast.success(
        "Please check your inbox and follow the instructions to verify your email."
      );
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error(
        "There was an error sending the verification email. Please try again."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const applyTheme = (themeId: string) => {
    const theme = themeOptions.find((option) => option.id === themeId);
    if (!theme) return;
    setActiveTheme(themeId);
    Object.entries(theme.values).forEach(([token, value]) => {
      document.documentElement.style.setProperty(token, value);
    });
    localStorage.setItem("fairlove-theme", themeId);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("fairlove-theme");
    applyTheme(storedTheme || "rose-dawn");
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border border-white/60 bg-white/80 shadow-lg">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information and manage your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="w-full flex justify-between items-center p-3 rounded bg-primary/10">
              <div>
                <h3 className="text-lg font-medium">Username</h3>
                <p className="text-sm text-gray-500">emmaexcellent</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Username</DialogTitle>
                    <DialogDescription>
                      Enter your new username below.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...nameForm}>
                    <form className="space-y-4">
                      <FormField
                        control={nameForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Username</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Username"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="w-full flex justify-between items-center p-3 rounded bg-primary/10">
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  emma@gmail.com
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Email</DialogTitle>
                    <DialogDescription>
                      Enter your new email address below.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...emailForm}>
                    <form className="space-y-4">
                      <FormField
                        control={emailForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Email</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={emailForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Email"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5 md:gap-10">
            <div className="w-full flex justify-between items-center p-3 rounded bg-primary/10">
              <div>
                <h3 className="text-lg font-medium">Password</h3>
                <p className="text-sm text-gray-500">
                  Change your password to keep love safe.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    Change
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your new password below.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...passwordForm}>
                    <form
                      className="space-y-4"
                    >
                      <FormField
                        control={passwordForm.control}
                        name="oldPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Old Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={passwordForm.control}
                        name="newPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Password"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="w-full flex justify-between items-center p-3 rounded bg-primary/10">
              <div>
                <h3 className="text-lg font-medium">Email Verification</h3>
                <p
                  className={`text-sm ${
                    true ? "text-green-500" : "text-gray-500"
                  } `}
                >
                  Verified
                </p>
              </div>
              {!user && (
                <Button
                  onClick={handleSendEmailVerification}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Sending..." : "Verify Email"}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-white/60 bg-white/80 shadow-lg">
        <CardHeader>
          <CardTitle>Aesthetic themes</CardTitle>
          <CardDescription>
            Pick a soft, romantic palette for your profile and LoveVault views.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-3 gap-3">
            {themeOptions.map((theme) => (
              <button
                key={theme.id}
                onClick={() => applyTheme(theme.id)}
                className={`rounded-2xl bg-gradient-to-br ${
                  theme.gradient
                } p-4 text-left border ${
                  activeTheme === theme.id
                    ? "border-primary shadow-lg"
                    : "border-white/70 shadow-sm"
                } transition hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{theme.name}</p>
                  {activeTheme === theme.id && (
                    <span className="text-xs text-primary font-semibold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-foreground/70 mt-2">
                  {theme.description}
                </p>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Themes update background lighting, gradients, and accent colors to
            keep every screen aligned with your current mood.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

const LoadingFallback = () => (
  <div className="w-full h-48 flex flex-col items-center justify-center">
    <Loader2 size={50} className="animate-spin text-primary" />
  </div>
);

const SuspendedProfileSettings = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push("/login?redirect=/profile");
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProfileSettings initialUserData={user} />
    </Suspense>
  );
};

export default SuspendedProfileSettings;
