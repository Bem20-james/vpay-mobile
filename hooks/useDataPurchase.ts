import axios, { AxiosError } from "axios";
import { useState, useEffect, Provider } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

interface MobileData {
  fiatToken: string;
  provider: string;
  code: string;
  amount: string;
  phone: string;
  authorization_pin: string;
}

interface Response {
  success: boolean;
  message?: string;
}

function useFetchDataProviders() {
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchProviders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_BASE_URL}/user/mobiledata/providers`, config);
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

function useFetchDataOptions(provider?: string) {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchOptions = async (prov?: string) => {
    if (!prov) return;
    setLoading(true);
    try {
      console.log("Fetching data options for provider:", prov);
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/mobiledata/options`,
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

  const purchaseData = async (data: MobileData): Promise<Response> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<Response>(
        `${SERVER_BASE_URL}/user/mobiledata/request`,
        data,
        config
      );

      const result = response.data;
      console.log(result)
      if (!result.success) {
        throw new Error(result.message || "Payment failed");
      }

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: result.message || "Payment Successful!",
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

  return { purchaseData, isLoading, error };
};

export {
  usePurchaseData,
  useFetchDataProviders,
  useFetchDataOptions
};