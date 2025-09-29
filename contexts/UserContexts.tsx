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
import { jwtDecode } from "jwt-decode";
import { getToken, deleteToken } from "@/utils/secureStore";
import { JwtPayload } from "@/types/auth";
import { Router, useRouter } from "expo-router";
import Toast from "react-native-toast-message";


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
  country?: {
    code: string;
    dial_code: string;
    name: string;
  };
  kyc?: {
    address: number;
    identity: number;
    personal: number;
  };
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
  const router = useRouter()

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

  const updateUser = useCallback(async (data: User) => {
    try {
      await storeData("auth", data);
      setUser(data);
      console.log("user updated in context:", data);
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

  const refreshUserToken = useCallback(async (): Promise<boolean> => {
    if (isRefreshingRef.current) return false;
    isRefreshingRef.current = true;

    try {
                  const token = await getToken("accessToken");

      if (!user?.accessToken) {
        await clearUser();
        return false;
      }


      const response = await fetch("auth/refresh/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ refreshToken: user.accessToken })
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

  useEffect(() => {
    const checkStoredToken = async () => {
      const token = await getToken("accessToken");
      if (token) {
        // validate expiry
        const payload: JwtPayload = jwtDecode(token);
        const expiresAt = payload.exp * 1000;

        if (Date.now() < expiresAt) {
          // token still valid → go straight to home
          router.replace("/(tabs)/home");
        } else {
          // expired → clear and stay on login
          await deleteToken("accessToken");
          Toast.show({ type: "error", text1: "Session expired" });
        }
      }
    };

    checkStoredToken();
  }, []);


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
