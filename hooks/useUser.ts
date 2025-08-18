import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

// Expected API response type
interface RemoveSessionResponse {
  message: string;
}

function useFetchAuthUser() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/user/profile`, config);
      const result = response.data;

      if (result.success && result.code === 0) {
        setUserData(result.result);
      } else {
        Toast.show({ type: "error", text1: result.message || "Failed to fetch user data." });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching user data.";
      Toast.show({ type: "error", text1: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [config]);

  return { userData, loading, refetch: fetchData };
}

function useFetchUserAssets() {
  const [assets, setAssets] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/user/assets`,
        config
      );
      const result = response.data;

      if (result.code === 0) {
        setAssets(result.result);
      } else {
        Toast.show({ type: "error", text1: result.message || "Failed to fetch assets." });
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage = axiosError.response?.data?.message;

      console.error("Error fetching data:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [config]);

  return { assets, loading, refetch: fetchData };
}

function useFetchSessions() {
  const [sessions, setSessions] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/auth/sessions`, config);
      const result = response.data;

      if (result.success && result.code === 0) {
        setSessions(result.result);
      } else {
        Toast.show({ type: "error", text1: result.message || "Failed to fetch sessions." });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching sessions.";
      Toast.show({ type: "error", text1: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [config]);

  return { sessions, loading, refetch: fetchData };
}

function useRemoveSessions() {
  const { config } = useUser();
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());

  const removeSession = async (id: string): Promise<RemoveSessionResponse> => {
    setLoadingIds((prev) => new Set(prev).add(id));

    try {
      const response = await axios.delete<RemoveSessionResponse>(
        `${SERVER_BASE_URL}/auth/user/terminate/session/${id}`,
        config
      );

      console.log("FRONTEND-RESP::", response)
      console.log("FRONTEND-DATA::", response.data)
      const { data } = response;

      Toast.show({
        type: "success",
        text1: data.message,
      });

      return data;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Error removing session:", error.response?.data || error.message);

      Toast.show({
        type: "error",
        text1: "Oops! Failed to remove session.",
      });

      throw error;
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  return { removeSession, loadingIds };
}

export { 
  useFetchAuthUser, 
  useFetchUserAssets, 
  useFetchSessions, 
  useRemoveSessions 
};
