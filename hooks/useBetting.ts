import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import {
  ProviderRes,
  CableTvData,
  BettingProvider,
  BettingResult,
  BettingLookUpRes,
} from "@/types/services";
import { TransactionResponse } from "@/types/transfers";

function useFetchBettingProviders() {
  const [betProvider, setBetProvider] = useState<BettingProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ProviderRes<BettingProvider[]>>(
        `${SERVER_BASE_URL}/bet/providers`,
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setBetProvider(result.result);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data ||
        "An error occurred while fetching betting providers.";

      console.error("Error fetching data:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { betProvider, loading, refetch: fetchData };
}

function useLookUpBetCustomer() {
  const [customer, setCustomer] = useState<BettingResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async (data: {
    provider: string;
    account: string;
  }): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await axios.post<BettingLookUpRes>(
        `${SERVER_BASE_URL}/bet/verify-wallet`,
        {
          provider: data.provider,
          account: data.account
        },
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setCustomer(result.result);
        return true;
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message || "Failed to look up subscriber."
        });
        return false;
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while looking up subscriber.";

      console.error("Error fetching data:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { customer, loading, lookup: fetchData };
}

const useFundBetWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const fundBetWallet = async (
    data: CableTvData
  ): Promise<TransactionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;

      const response = await axios.post(
        `${SERVER_BASE_URL}/bet/fund-wallet`,
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
      console.log("Bet Response:", result);

      if (!result.success) {
        return { success: false, message: result.message || "Payment failed" };
      }

      return {
        success: true,
        data: result,
        message: result.message || "Payment successful"
      };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";

      console.error("Bet waller funding Error:", errorMessage);
      setError(errorMessage);

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { fundBetWallet, isLoading, error };
};

export {
  useFundBetWallet,
  useFetchBettingProviders,
  useLookUpBetCustomer,
};
