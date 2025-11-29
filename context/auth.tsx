"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import { LoadingScreen } from "@/components/LoadingScreen";
import { ID, Models, Query } from "appwrite";
import { account, tablesDB, databaseId } from "@/lib/appwrite/config";
import { getErrorMsg } from "@/lib/helpers";

type response = { success: boolean, message: string}

interface AuthContextType {
  user: Models.DefaultRow | null;
  signup: (
    email: string,
    password: string,
    username: string
  ) => Promise<response>;
  login: (email: string, password: string) => Promise<response>;
  logout: () => Promise<response>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Models.DefaultRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);


  async function checkUser() {
    setLoading(true);
    try {
      const currentUser = await account.get();

      const userProfile = await tablesDB.listRows({
        databaseId,
        tableId: "profile",
        queries: [Query.equal("authId", currentUser.$id)],
      })

      console.log("userProfile: ", userProfile.rows[0]);
      setUser(userProfile.rows[0]);
      console.log(currentUser);
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  }
  
  const signup = async (
    email: string,
    password: string,
    username: string
  ): Promise<{ success: boolean; message: string }> => {
    setLoading(true)
    try {
      // Step 1: Create user account
      const userAccount = await account.create({
        userId: ID.unique(),
        email,
        password,
        name: username,
      });

      if (!userAccount) {
        return { success: false, message: "Failed to create user account" };
      }

      // Step 2: Create session
      await account.createEmailPasswordSession({ email, password });

      // Step 3: Create user profile in DB
      const userProfile = await tablesDB.createRow({
        databaseId,
        tableId: "profile",
        rowId: ID.unique(),
        data: {
          username,
          email,
          authId: userAccount.$id,
        },
      });

      if (!userProfile) {
        return { success: false, message: "Failed to create user profile" };
      }

      // Step 4: Update local state
      setUser(userProfile);

      return { success: true, message: "User created successfully" };
    } catch (error) {
      console.error("Error with signup:", error);
      const errorMsg = getErrorMsg(error);
      return { success: false, message: errorMsg };
    } finally {
      setLoading(false);
    }
  };

 const login = async (
   email: string,
   password: string
 ): Promise<{ success: boolean; message: string }> => {
   setLoading(true);

   try {
     // Step 1: Attempt to create a session
     const session = await account.createEmailPasswordSession({
       email,
       password,
     });

     if (!session) {
       return { success: false, message: "Failed to create session" };
     }

     // Step 2: Fetch and set user details
     await checkUser();

     return { success: true, message: "Login successful" };
   } catch (error: unknown) {
     console.error("Error with login:", error);

     // Normalize error message
     const errorMsg = getErrorMsg(error);
     return { success: false, message: errorMsg };
   } finally {
     setLoading(false);
   }
 };

 const logout = async (): Promise<{ success: boolean; message: string }> => {
   setLoading(true);

   try {
     // Step 1: Delete the current session
     await account.deleteSession({sessionId: "current"});

     // Step 2: Clear user state
     setUser(null);

     return { success: true, message: "Logout successful" };
   } catch (error: unknown) {
     console.error("Error with logout:", error);
     
     const errorMsg = getErrorMsg(error)

     return { success: false, message: errorMsg };
   } finally {
     setLoading(false);
   }
 };

  
  const value = {
    user,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      <LoadingScreen isLoading={loading} />
      <div
        style={{ opacity: loading ? 0 : 1 }}
        className="transition-opacity duration-300"
      >
        {children}
      </div>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
