import { Query } from "appwrite";
import { tablesDB, databaseId } from "./config";
import { getErrorMsg } from "../error-message";
import { toast } from "sonner";

export const checkUsernameExist = async (username: string) => {
  try {
    const res = await tablesDB.listRows({
      databaseId,
      tableId: "profile",
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
