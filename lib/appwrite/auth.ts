"use server";
import { ID, Models, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "./config";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_OPTIONS = {
  path: "/",
  httpOnly: true,
  sameSite: "strict" as const,
  secure: true,
};

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const collections = {
  profileId: process.env.NEXT_PUBLIC_APPWRITE_PROFILE_ID!,
};

export const getUser = async () => {
  let user: Models.Document | null = null;
  try {
    const { account, databases } = await createSessionClient();
    const authId = await account.get();
    const user = await databases.listDocuments(
      databaseId,
      collections.profileId,
      [Query.equal("user_id", authId.$id)]
    );
    return user.documents[0];
  } catch (error) {
    console.error("Error getting user-", error);
    user = null;
  }
  return user;
};

export const createSession = async (
  email: string,
  password: string
) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);
    
    const cookieData = await cookies()
    
    cookieData.set("session", session.secret, COOKIE_OPTIONS);
    return {
      success: true,
      message: "Login Successful",
    };
    
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred. Please try again!",
    };
  }
};

export const checkUserEmailOrUsernameExist = async (username: string) => {
  try {
    const { databases } = await createAdminClient();
    const query = [Query.equal("username", username)];

    const result = await databases.listDocuments(
      databaseId,
      collections.profileId,
      query
    );

    if (result.documents.some((doc) => doc.username === username)) {
      return {
        exists: true,
        field: "username",
        message: "Username already exists",
      };
    }

    return { exists: false, field: null, message: "" };
  } catch (error: unknown) {
    console.error("Error checking user username existence-", error);
    return {
      exists: false,
      field: null,
      message: error instanceof Error ? error.message : "An error occurred. Please try again!",
    };
  }
};

export const createAccount = async (
  email: string,
  password: string,
  username: string,
) => {
  try {
    const name = username;
    const { account, users, databases } = await createAdminClient();

    const checkUser = await checkUserEmailOrUsernameExist(username);

    if (checkUser.exists) {
      return {
        success: false,
        message: checkUser.message,
      };
    } else {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        const userProfile = await databases.createDocument(
          databaseId,
          collections.profileId,
          ID.unique(),
          {
            user_id: userAccount.$id,
            username,
            email
          }
        );
        if (userProfile) {
          return await createSession(email, password);
        } else {
          await users.delete(userAccount.$id);
          return {
            success: false,
            message: "An error occurred. Please try again!",
          };
        }
      }
    }
  } catch (error: unknown) {
    console.error(error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred. Please try again!",
    };
  }
};

export const deleteSession = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
  } catch (error) {
    console.error(error);
  }

  const cookieData = await cookies();

  cookieData.delete("session");

  redirect("/login");
};
