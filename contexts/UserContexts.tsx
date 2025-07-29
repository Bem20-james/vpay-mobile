import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  PropsWithChildren
} from "react";
import { getData, removeData, storeData } from "@/utils/store";

export interface User {
  id?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  phone?: string;
  role?: string;
  accessToken?: string;
  refreshToken?: string | null;
  expiresAt?: number;
  [key: string]: any;
}

interface UserContextType {
  user: User | null;
  config: { headers: { "Content-Type": string; Authorization: string } };
  isUserLoaded: boolean;
  isAuthenticated: () => boolean;
  isTokenExpired: () => boolean;
  fetchUser: () => Promise<void>;
  updateUser: (data: User) => Promise<void>;
  clearUser: () => Promise<void>;
  refreshUserToken: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const isRefreshingRef = useRef(false);

  const isTokenExpired = useCallback((): boolean => {
    if (!user?.accessToken || !user?.expiresAt) return true;
    return Date.now() >= user.expiresAt;
  }, [user?.accessToken, user?.expiresAt]);

  const isAuthenticated = useCallback((): boolean => {
    return !!(user?.accessToken && !isTokenExpired());
  }, [user?.accessToken, isTokenExpired]);

  const fetchUser = useCallback(async () => {
    try {
      const data = await getData("auth");
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setUser(null);
    } finally {
      setIsUserLoaded(true);
    }
  }, []);

  // const updateUser = useCallback(async (data: User) => {
  //   try {
  //     await storeData("auth", data);
  //     setUser(data);
  //   } catch (error) {
  //     console.error("Failed to update user data:", error);
  //     throw error;
  //   }
  // }, []);

  const updateUser = useCallback(async (data: User) => {
  try {
    await storeData("auth", data);
    setUser(data);
    console.log("✅ user updated in context:", data);
  } catch (error) {
    console.error("❌ Failed to update user data:", error);
    throw error;
  }
}, []);


  const clearUser = useCallback(async () => {
    try {
      await removeData("auth");
      setUser(null);
    } catch (error) {
      console.error("Failed to clear user data:", error);
      throw error;
    }
  }, []);

  const refreshUserToken = useCallback(async (): Promise<boolean> => {
    if (isRefreshingRef.current) return false;
    isRefreshingRef.current = true;

    try {
      if (!user?.refreshToken) {
        await clearUser();
        return false;
      }

      const response = await fetch("auth/refresh/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: user.refreshToken })
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const newTokenData = await response.json();
      const updatedUser = {
        ...user,
        accessToken: newTokenData.accessToken,
        refreshToken: newTokenData.refreshToken || user.refreshToken,
        expiresAt: Date.now() + newTokenData.expiresIn * 1000
      };

      await updateUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      await clearUser();
      return false;
    } finally {
      isRefreshingRef.current = false;
    }
  }, [user, updateUser, clearUser]);

  const config = useMemo(
    () => ({
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.accessToken ? `Bearer ${user.accessToken}` : ""
      }
    }),
    [user?.accessToken]
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!user?.accessToken || !user?.expiresAt) return;

    const timeUntilExpiry = user.expiresAt - Date.now();
    const refreshThreshold = 5 * 60 * 1000; // 5 minutes

    if (timeUntilExpiry <= refreshThreshold && timeUntilExpiry > 0) {
      refreshUserToken();
      return;
    }

    if (timeUntilExpiry <= 0) {
      user.refreshToken ? refreshUserToken() : clearUser();
      return;
    }

    const timeoutId = setTimeout(() => {
      refreshUserToken();
    }, timeUntilExpiry - refreshThreshold);

    return () => clearTimeout(timeoutId);
  }, [
    user?.accessToken,
    user?.expiresAt,
    user?.refreshToken,
    refreshUserToken,
    clearUser
  ]);

  const contextValue = useMemo(
    (): UserContextType => ({
      user,
      config,
      isUserLoaded,
      isAuthenticated,
      isTokenExpired,
      fetchUser,
      updateUser,
      clearUser,
      refreshUserToken
    }),
    [
      user,
      config,
      isUserLoaded,
      isAuthenticated,
      isTokenExpired,
      fetchUser,
      updateUser,
      clearUser,
      refreshUserToken
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}
