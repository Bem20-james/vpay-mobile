import { useEffect } from "react";
import { useUser } from "@/contexts/UserContexts";
import { useRouter } from "expo-router"; // or `next/router` if web

const useAuthRedirect = (fallbackRoute: string = "/(auth)/login") => {
  const { isAuthenticated, isUserLoaded, clearUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoaded) return;

    if (!isAuthenticated()) {
      clearUser();
      router.replace("/(auth)/login-index");
    }
  }, [isAuthenticated, isUserLoaded, clearUser, router, fallbackRoute]);
};

export default useAuthRedirect;
