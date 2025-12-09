import { Client, Account, TablesDB } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT!) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID



export const databaseId = "692ac870002efdb04f15"
export const profileTableId = "profile"
export const socialMessagesTableId = "social_messages"
export const commentsTableId = "social_comments";
export const giftsTableId = "gifts";

export const account = new Account(client);
export const tablesDB = new TablesDB(client);
