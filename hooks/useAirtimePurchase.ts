import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

interface AirtimeData {
  type: string;
  amount: string;
  recipient: string;
  bank_code: string;
  description: string;
  currency: string;
}

interface AirtimeRes {
  success: boolean;
  message?: string;
}


function useFetchAirtimeProviders() {
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/user/airtime/providers`, config);
      const result = response.data;
      console.log("results:", result)

      if (result.success && result.code === 0) {
        setProviders(result.result);
      } else {
        Toast.show({ type: "error", text1: result.message || "Failed to fetch providers." });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "An error occurred while fetching providers.";
      Toast.show({ type: "error", text1: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, [config]);

  return { providers, loading, refetch: fetchProviders };
}

const usePurchaseAirtime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const purchaseAirtime = async (data: AirtimeData): Promise<AirtimeRes> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<AirtimeRes>(
        `${SERVER_BASE_URL}/user/airtime/request`,
        data,
        config
      );

      const result = response.data;
      console.log(result)
      if (!result.success) {
        throw new Error(result.message || "Transaction failed");
      }

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: result.message || "Transaction Successful!",
        });
      }

      return result;
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";
        console.error("Error Response:", errorMessage)
      setError(errorMessage);
      Toast.show({
        type: "error",
        text1: errorMessage,
      });
      

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { purchaseAirtime, isLoading, error };
};

export {
  usePurchaseAirtime,
  useFetchAirtimeProviders
};