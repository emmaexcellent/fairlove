import { Query, ID } from "appwrite";
import {
  tablesDB,
  databaseId,
  socialMessagesTableId,
  profileTableId,
  commentsTableId,
} from "./config";
import { getErrorMsg } from "../error-message";
import { toast } from "sonner";
import { genConfig } from "react-nice-avatar";

export const getCommentsForMessage = async (messageId: string) => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: commentsTableId,
      queries: [
        Query.equal("messageId", messageId),
        Query.orderDesc("$createdAt"),
      ],
    });
    return res.rows;
  } catch (error) {
    console.log("Error getting comments: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return [];
  }
};

export const createComment = async (data: {
  messageId: string;
  content: string;
  authorId?: string;
}) => {
  try {
    const res = await tablesDB.createRow({
      databaseId,
      tableId: commentsTableId,
      data: {
        ...data,
        isAnonymous: !data.authorId,
      },
      rowId: ID.unique(),
    });
    return res;
  } catch (error) {
    console.log("Error creating comment: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
  }
};

export const checkUsernameExist = async (username: string) => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: profileTableId,
      queries: [Query.equal("username", username)],
    });

    if (res.total > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error checking user: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return false;
  }
};

export const getSocialMessages = async () => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: socialMessagesTableId,
      queries: [Query.orderDesc("$createdAt")],
    });
    return res.rows;
  } catch (error) {
    console.log("Error getting social messages: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return [];
  }
};

export const updateSocialMessageLikes = async (
  messageId: string,
  likes: number
) => {
  try {
    const res = await tablesDB.updateRow({
      databaseId,
      tableId: socialMessagesTableId,
      rowId: messageId,
      data: {
        likes,
      },
    });
    return res;
  } catch (error) {
    console.log("Error updating social message likes: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
  }
};

export const createSocialMessage = async (data: {
  content: string;
  authorId?: string;
}) => {
  try {
    const avatarConfig = genConfig();
    const res = await tablesDB.createRow({
      databaseId,
      tableId: socialMessagesTableId,
      rowId: ID.unique(),
      data: {
        content: data.content,
        author: data.authorId,
        isAnonymous: !data.authorId,
        avatar: JSON.stringify(avatarConfig),
      },
    });
    return res;
  } catch (error) {
    console.log("Error creating social message: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
  }
};
