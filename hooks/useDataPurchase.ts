import axios, { AxiosError } from "axios";
import { useState, useEffect, Provider } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import { TransactionResponse } from "@/types/transfers";

interface MobileData {
  fiatToken: string;
  provider: string;
  code: string;
  amount: string;
  phone: string;
  activity_pin: string;
}

function useFetchDataProviders() {
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/mobiledata/providers`,
        config
      );
      const result = response.data;
      console.log("results:", result);

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

function useFetchDataOptions(provider?: string) {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchOptions = async (prov?: string) => {
    if (!prov) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/mobiledata/options`,
        { provider: prov },
        config
      );

      const result = response.data;
      console.log("Result from data options API:", result);

      if (result.code === 0) {
        setOptions(result.result);
      } else {
        Toast.show({
          type: "error",
          text1: result.message || "Failed to fetch data options."
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching data options.";
      Toast.show({ type: "error", text1: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (provider) {
      fetchOptions(provider);
    }
  }, [provider, config]);

  return { options, loading, refetch: fetchOptions };
}

const usePurchaseData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const purchaseData = async (
    data: MobileData
  ): Promise<TransactionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;

      const response = await axios.post(
        `${SERVER_BASE_URL}/mobiledata/request`,
        rest,
        {
          ...config,
          headers: {
            ...config.headers,
            activity_pin
          }
        }
      );

      const result = response.data;
      console.log("Mobile Data Purchase Response:", result);

      if (!result.success) {
        return { success: false, message: result.message || "Payment failed" };
      }

      return {
        success: true,
        data: result.data,
        message: result.message || "Data purchase successful"
      };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";

      console.error("Mobile Data Error:", errorMessage);
      setError(errorMessage);

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { purchaseData, isLoading, error };
};

export { usePurchaseData, useFetchDataProviders, useFetchDataOptions };
