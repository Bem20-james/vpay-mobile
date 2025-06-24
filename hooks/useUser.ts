import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

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

    console.log("Response data:", result);
    console.log("Response data:", assets);

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

        console.log("response:", result)
      console.log("sessions res:", sessions)

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


export { useFetchAuthUser, useFetchUserAssets, useFetchSessions };
