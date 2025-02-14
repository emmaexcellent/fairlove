"use server"
import { ID, Models, Query } from "node-appwrite";
import { createSessionClient } from "./config"
import { checkUserEmailOrUsernameExist } from "./auth";
import crypto from 'crypto';
import { sendVerificationEmail } from "../email/nodemailer";


const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
const collections = {
  profileId: process.env.NEXT_PUBLIC_APPWRITE_PROFILE_ID!,
  messageId: process.env.NEXT_PUBLIC_APPWRITE_MESSAGE_ID!,
  emailVerificationId: process.env.NEXT_PUBLIC_APPWRITE_EMAIL_VERIFICATION_ID!,
};

export const validateUsernameExist = async (username: string) => {
  try{
    const { databases } = await createSessionClient();
    const user = await databases.listDocuments(
      databaseId,
      collections.profileId,
      [Query.equal("username", username)]
    );
    return user.documents[0];
  }catch(error){
    console.log(error)
    return null
  }
  
}

export const updateProfileData = async (
  documentId: string,
  field: string,
  data: { [key: string]: string }
) => {
  let user: Models.Document | null = null;
  try {
    const { account, databases } = await createSessionClient();
    if (field === "username") {
      const checkUser = await checkUserEmailOrUsernameExist(data.username);
      if (!checkUser.exists) {await account.updateName(data.username);
        user = await databases.updateDocument(
          databaseId,
          collections.profileId,
          documentId,
          { username: data.username }
        );
      }
      
    }
    if (field === "email") {
      await account.updateEmail(data.email, data.password);
      user = await databases.updateDocument(
        databaseId,
        collections.profileId,
        documentId,
        { email: data.email }
      );
    }
    if (field === "password") {
      await account.updatePassword(data.newPassword, data.oldPassword);
      user = await databases.getDocument(
        databaseId,
        collections.profileId,
        documentId
      );
    }
    return user
  } catch (error) {
    console.error(error);
    return user;
  }
};

export const requestEmailVerification = async (user: Models.Document) => {
  try{
    const { databases } = await createSessionClient();
    
    const secret = crypto.randomBytes(32).toString("hex");
    
    const result = await databases.createDocument(
      databaseId,
      collections.emailVerificationId,
      ID.unique(),
      {
        userId: user.$id,
        secret
      }
    );
    if(result){
      const { userId, secret } = result;
      const response = await sendVerificationEmail(userId, secret, user);
      console.log(response);
    }
    console.log(result)
  }catch(error){
    console.error(error)
  }
}

export const verifyEmailRequest = async (userId: string, secret: string, authenticatedUser: Models.Document) => {
  if(userId !== authenticatedUser.$id){
    return { user: null, message: "Invalid verification link." };
  }
  
  const { databases } = await createSessionClient();

  // Fetch the verification record from the database
  const userDBSecret = await databases.listDocuments(
    databaseId,
    collections.emailVerificationId,
    [Query.equal("secret", secret), Query.equal("userId", userId)]
  );

  if (!userDBSecret.documents.length) {
    return { user: null, message: "Invalid or expired verification link." };
  }

  const verificationRecord = userDBSecret.documents[0];
  const createdAt = new Date(verificationRecord.$createdAt).getTime(); // Convert to timestamp
  const now = new Date().getTime();
  const tenMinutes = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Check if the secret has expired
  if (now - createdAt > tenMinutes) {
    return {
      user: null,
      message: "Verification link has expired. Please request a new one.",
    };
  }

  // Update the user's verification status in the database (assuming there's a `verified` field)
  const userUpdated = await databases.updateDocument(databaseId, collections.profileId, userId, {
    verified: true,
  });

  // Optionally, delete the verification record after successful verification
  await databases.deleteDocument(
    databaseId,
    collections.emailVerificationId,
    verificationRecord.$id
  );

  return { user: userUpdated, message: "Email verified successfully." };
};

export const sendMessage = async (messageUserId: string, message: string) => {
  try {
    const { databases } = await createSessionClient();
    await databases.createDocument(
      databaseId,
      collections.messageId,
      ID.unique(),
      {
        user_id: messageUserId,
        message,
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getMessageList = async (userId: string) => {
  const { databases } = await createSessionClient();
  const messages = await databases.listDocuments(
    databaseId, 
    collections.messageId,
    [Query.equal("user_id", userId)]
  )
  return messages.documents;
}

export const likeDislikeDelete = async (action: "like" | "dislike" | "delete", msgId: string) => {
  const { databases } = await createSessionClient();
  try {
    if (action === "like") {
      await databases.updateDocument(
        databaseId,
        collections.messageId,
        msgId,
        {
          like: true,
          dislike: false,
        }
      );
    } else if (action === "dislike") {
      await databases.updateDocument(
        databaseId,
        collections.messageId,
        msgId,
        {
          like: false,
          dislike: true,
        }
      );
    } else if (action === "delete") {
      await databases.deleteDocument(
        databaseId,
        collections.messageId,
        msgId
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}