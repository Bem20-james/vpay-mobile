import { getData, removeData, storeData } from "@/utils/store";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  PropsWithChildren,
  useCallback
} from "react";
import React from "react";

interface User {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number; // Token expiration timestamp
  [key: string]: any; // Allow additional user properties
}

interface UserContextType {
  user: User | null;
  config: { headers: { "Content-Type": string; Authorization: string } };
  isUserLoaded: boolean;
  isAuthenticated: boolean;
  isTokenExpired: boolean;
  fetchUser: () => Promise<void>;
  updateUser: (data: User) => Promise<void>;
  clearUser: () => Promise<void>;
  refreshUserToken: () => Promise<boolean>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);

  // Check if token is expired
  const isTokenExpired = useCallback(() => {
    if (!user?.accessToken || !user?.expiresAt) return true;
    return Date.now() >= user.expiresAt;
  }, [user?.accessToken, user?.expiresAt]);

  // Check if user is authenticated with valid token
  const isAuthenticated = useCallback(() => {
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

  const updateUser = useCallback(async (data: User) => {
    try {
      await storeData("auth", data);
      setUser(data);
    } catch (error) {
      console.error("Failed to update user data:", error);
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

  // Refresh token functionality (implement based on your API)
  const refreshUserToken = useCallback(async (): Promise<boolean> => {
    if (!user?.refreshToken) {
      await clearUser();
      return false;
    }

    try {
      // Replace with your actual refresh token API call
      const response = await fetch("auth/refresh/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: user.refreshToken })
      });

      if (response.ok) {
        const newTokenData = await response.json();
        const updatedUser = {
          ...user,
          accessToken: newTokenData.accessToken,
          refreshToken: newTokenData.refreshToken || user.refreshToken,
          expiresAt: Date.now() + newTokenData.expiresIn * 1000 // Convert to timestamp
        };
        await updateUser(updatedUser);
        return true;
      } else {
        await clearUser();
        return false;
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      await clearUser();
      return false;
    }
  }, [user, updateUser, clearUser]);

  // Create config with automatic token refresh
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: user?.accessToken ? `Bearer ${user.accessToken}` : ""
    }
  };

  // Initialize user data on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!user?.accessToken || !user?.expiresAt) return;

    const timeUntilExpiry = user.expiresAt - Date.now();
    const refreshThreshold = 5 * 60 * 1000; // Refresh 5 minutes before expiry

    if (timeUntilExpiry <= refreshThreshold && timeUntilExpiry > 0) {
      refreshUserToken();
      return;
    }

    if (timeUntilExpiry <= 0) {
      // Token already expired
      if (user.refreshToken) {
        refreshUserToken();
      } else {
        clearUser();
      }
      return;
    }

    // Set timeout to refresh token before it expires
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

  const contextValue: UserContextType = {
    user,
    config,
    isUserLoaded,
    isAuthenticated: isAuthenticated(),
    isTokenExpired: isTokenExpired(),
    fetchUser,
    updateUser,
    clearUser,
    refreshUserToken
  };

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
