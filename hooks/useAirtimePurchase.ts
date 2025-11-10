import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import { TransactionResponse } from "@/types/transfers";

interface AirtimeData {
  type: string;
  amount: string;
  recipient: string;
  bank_code: string;
  description: string;
  currency: string;
  activity_pin: string;
}

function useFetchAirtimeProviders() {
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/user/airtime/providers`,
        config
      );
      const result = response.data;

      if (result.success && result.code === 0) {
        setProviders(result.result);
      } else {
        Toast.show({
          type: "error",
          text1: result.message || "Failed to fetch providers."
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching providers.";
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

  const purchaseAirtime = async (
    data: AirtimeData
  ): Promise<TransactionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/airtime/request`,
        rest,
        {
          ...config,
          headers: { ...config.headers, activity_pin }
        }
      );

      const result = response.data;
      console.log("airtime RESPONSE:", result);

      if (!result.success) {
        return {
          success: false,
          message: result.message || "Transaction failed"
        };
      }

      return { success: true, data: result, message: result.message };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { purchaseAirtime, isLoading, error };
};

export { usePurchaseAirtime, useFetchAirtimeProviders };
