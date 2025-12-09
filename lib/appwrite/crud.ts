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
import { error } from "console";

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

export const getProfileByAuthId = async (authId: string) => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: profileTableId,
      queries: [Query.equal("authId", authId)],
    });
    return res.rows[0];
  } catch (error) {
    console.log("Error getting profile by authId: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
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
    // const avatarConfig = genConfig();
    const res = await tablesDB.createRow({
      databaseId,
      tableId: socialMessagesTableId,
      rowId: ID.unique(),
      data: {
        content: data.content,
        author: data.authorId,
        isAnonymous: !data.authorId,
        avatar: "",
      },
    });

    if (res && data.authorId) {
      const profile = await getProfileByAuthId(data.authorId);
      if (profile) {
        const newCoinBalance = (profile.coins || 0) + 10;
        await updateUserCoins(profile.$id, newCoinBalance);
        toast.success("You earned 10 coins for posting!");
      }
    }

    return res;
  } catch (error) {
    console.log("Error creating social message: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
  }
};

export const updateUserCoins = async (profileId: string, coins: number) => {
  try {
    const res = await tablesDB.updateRow({
      databaseId,
      tableId: profileTableId,
      rowId: profileId,
      data: {
        coins,
      },
    });
    return res;
  } catch (error) {
    console.log("Error updating user coins: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
  }
};

export const createGift = async (data: {
  senderId: string;
  receiverId: string;
  giftId: string;
}) => {
  try {
    const res = await tablesDB.createRow({
      databaseId,
      tableId: "gifts",
      rowId: ID.unique(),
      data,
    });
    return res;
  } catch (error) {
    console.log("Error creating gift: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
  }
};

export const getProfileByUsername = async (username: string) => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: profileTableId,
      queries: [Query.equal("username", username)],
    });
    return res.rows[0];
  } catch (error) {
    console.log("Error getting profile by username: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return null;
  }
};

export const getTopGifters = async () => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: "gifts",
    });

    const gifters = res.rows.reduce((acc: any, gift: any) => {
      acc[gift.senderId] = (acc[gift.senderId] || 0) + 1;
      return acc;
    }, {});

    const sortedGifters = Object.entries(gifters).sort(
      (a: any, b: any) => b[1] - a[1]
    );

    const topGifters = await Promise.all(
      sortedGifters.map(async ([profileId, giftCount]) => {
        const profile = await tablesDB.getRow({
          databaseId,
          tableId: profileTableId,
          rowId: profileId,
        });
        return {
          ...profile,
          giftCount,
        };
      })
    );

    return { data: topGifters, error: "" };
  } catch (error) {
    console.log("Error getting top gifters: ", error);
    const errorMsg = getErrorMsg(error);

    return {
      data: [],
      error: errorMsg,
    };
  }
};

export const getMostReactedMessages = async () => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: socialMessagesTableId,
      queries: [Query.orderDesc("likes")],
    });
    return res.rows;
  } catch (error) {
    console.log("Error getting most reacted messages: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return [];
  }
};

export const getTrendingAnonymousMessages = async () => {
  try {
    const twentyFourHoursAgo = new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString();
    const res = await tablesDB.listRows({
      databaseId,
      tableId: socialMessagesTableId,
      queries: [
        Query.equal("isAnonymous", true),
        Query.greaterThan("$createdAt", twentyFourHoursAgo),
        Query.orderDesc("likes"),
      ],
    });
    return res.rows;
  } catch (error) {
    console.log("Error getting trending anonymous messages: ", error);
    const errorMsg = getErrorMsg(error);
    toast.error(errorMsg);
    return [];
  }
};
