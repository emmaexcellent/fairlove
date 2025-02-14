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
import { Models } from "node-appwrite";
import { requestEmailVerification, updateProfileData, verifyEmailRequest } from "@/lib/appwrite/crud";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getUser } from "@/lib/appwrite/auth";

const nameSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
});

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Incorrect password"),
});

const passwordSchema = z
  .object({
    oldPassword: z.string().min(8, "Password must be at least 8 characters"),
    newPassword: z.string(),
  })

type NameFormValues = z.infer<typeof nameSchema>;
type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

function ProfileSettings({ initialUserData }: { initialUserData: Models.Document | null }) {
  const router = useRouter()

  if (!initialUserData) {
    router.push("/login?redirect=/profile");
  }
  const verificationParams = useSearchParams()
  const userId = verificationParams.get("userId")
  const secret = verificationParams.get("secret")

  const removeQueryParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("userId"); // Remove 'secret' from URL
    url.searchParams.delete("secret"); // Remove 'secret' from URL
    window.history.replaceState({}, document.title, url.pathname); // Update URL without refreshing
  };

  const verifyEmailSecret = async () => {
    const response = await verifyEmailRequest(userId!, secret!, user!);
    if(response.user){
      setUser(response.user)
      toast.success(response.message);
    } else {      
      toast.error(response.message);
    }
    removeQueryParams();
  }

  useEffect(() => {
    verifyEmailSecret();
  }, []);
  
  
  const [user, setUser] = useState<Models.Document | null>(initialUserData);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const nameForm = useForm<NameFormValues>({
    resolver: zodResolver(nameSchema),
    defaultValues: { username: user?.username },
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: user?.email, password: "" },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const updateProfile = async (
    field: string,
    data: { [key: string]: string }
  ) => {
    setIsUpdating(true);
    try {
      const newUserData = await updateProfileData(user?.$id!, field, data)
      if (newUserData) {
        setUser(newUserData);
        toast.success(`Your ${field} has been successfully updated.`);
      }else {
      toast.error(
        `Please check ${field === "password" ? "old" : ""} ${field}  ${
          field === "email" ? "and password" : ""
        }   and try again.`
      );

      }
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast.error(
        `There was an error updating your ${field}. Please try again.`
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendEmailVerification = async () => {
    setIsUpdating(true);
    try {
      await requestEmailVerification(user!);
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

  return (
    <Card>
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
              <p className="text-sm text-gray-500">{user?.username}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">Change</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Username</DialogTitle>
                  <DialogDescription>
                    Enter your new username below.
                  </DialogDescription>
                </DialogHeader>
                <Form {...nameForm}>
                  <form
                    onSubmit={nameForm.handleSubmit((data) =>
                      updateProfile("username", data)
                    )}
                    className="space-y-4"
                  >
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
              <p className="text-sm text-gray-500 line-clamp-1">{user?.email}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button  size="sm" variant="outline">Change</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Email</DialogTitle>
                  <DialogDescription>
                    Enter your new email address below.
                  </DialogDescription>
                </DialogHeader>
                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit((data) =>
                      updateProfile("email", data)
                    )}
                    className="space-y-4"
                  >
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
              <p className="text-sm text-gray-500">••••••••</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button  size="sm" variant="outline">Change</Button>
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
                    onSubmit={passwordForm.handleSubmit((data) =>
                      updateProfile("password", data)
                    )}
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
                className={`text-sm ${user?.verified ? "text-green-500" : "text-gray-500"} `}
              >
                {user?.verified ? "Verified" : "Not verified"}
              </p>
            </div>
            {!user?.verified && (
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
  );
}


const LoadingFallback = () => (
  <div className="w-full h-48 flex flex-col items-center justify-center">
    <Loader2 size={50} className="animate-spin text-primary" />
  </div>
);

const SuspendedProfileSettings = () => {
  const [user, setUser] = useState<Models.Document | null>(null);

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProfileSettings initialUserData={user} />
    </Suspense>
  );
};

export default SuspendedProfileSettings
