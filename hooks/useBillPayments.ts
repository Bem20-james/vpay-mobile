import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import {
  ProviderRes,
  CableTvProvider,
  LookUpResponse,
  LookUpResult,
  CableTvData,
  Response,
  BettingProvider,
  BettingResult,
  BettingLookUpRes,
  ElectricityBillData
} from "@/types/services";
import { TransactionResponse } from "@/types/transfers";

function useFetchCableTvProviders() {
  const [tvProviders, setTvProviders] = useState<CableTvProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ProviderRes<CableTvProvider[]>>(
        `${SERVER_BASE_URL}/user/cabletv/providers`,
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setTvProviders(result.result);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data ||
        "An error occurred while fetching TV providers.";

      console.error("Error fetching data:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { tvProviders, loading, refetch: fetchData };
}

function useFetchElectricityProviders() {
  const [powerProviders, setPowerProviders] = useState<CableTvProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ProviderRes<CableTvProvider[]>>(
        `${SERVER_BASE_URL}/user/electricity/providers`,
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setPowerProviders(result.result);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data ||
        "An error occurred while fetching providers.";

      console.error("Error fetching data:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { powerProviders, loading, refetch: fetchData };
}

function useFetchBettingProviders() {
  const [betProvider, setBetProvider] = useState<BettingProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ProviderRes<BettingProvider[]>>(
        `${SERVER_BASE_URL}/user/bet/providers`,
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
        `${SERVER_BASE_URL}/user/bet/verify-wallet`,
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

function useLookUpTvSubscriber() {
  const [subscriber, setSubscriber] = useState<LookUpResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async (data: {
    provider: string;
    number: string;
  }): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await axios.post<LookUpResponse>(
        `${SERVER_BASE_URL}/user/cabletv/verify`,
        {
          provider: data.provider,
          number: data.number
        },
        config
      );
      const result = response.data;

      if (result.code === 0) {
        setSubscriber(result.result);
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

  return { subscriber, loading, lookup: fetchData };
}

function useLookUpElectricityUser() {
  const [customer, setCustomer] = useState<LookUpResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async (data: {
    provider: string;
    number: string;
    type: string;
  }): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await axios.post<LookUpResponse>(
        `${SERVER_BASE_URL}/user/electricity/verify`,
        {
          provider: data.provider,
          number: data.number,
          type: data.type
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
          text1: response.data.message || "Failed to look up customer."
        });
        return false;
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while looking up Customer.";

      console.error("Error fetching data:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { customer, loading, lookup: fetchData };
}

function useFetchCableTvOptions(provider?: string) {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchOptions = async (prov?: string) => {
    if (!prov) return;
    setLoading(true);
    try {
      console.log("Fetching TV options for provider:", prov);
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/cabletv/options`,
        { provider: prov },
        config
      );

      const result = response.data;

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

function useFetchElectricityOptions(provider?: string) {
  const [options, setOptions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchOptions = async (prov?: string) => {
    if (!prov) return;
    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/electricity/options`,
        { provider: prov },
        config
      );

      const result = response.data;

      if (result.code === 0) {
        setOptions(result.result);
      } else {
        Toast.show({
          type: "error",
          text1: result.message || "Failed to fetch options."
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while fetching options.";
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

const usePayCableTv = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const payCableTv = async (
    data: CableTvData
  ): Promise<TransactionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;

      const response = await axios.post(
        `${SERVER_BASE_URL}/user/cabletv/request`,
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
      console.log("Cable TV Payment Response:", result);

      if (!result.success) {
        return { success: false, message: result.message || "Payment failed" };
      }

      return {
        success: true,
        data: result.data,
        message: result.message || "Payment successful"
      };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";

      console.error("Cable TV Error:", errorMessage);
      setError(errorMessage);

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { payCableTv, isLoading, error };
};

const usePayElectricity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const payElectricity = async (
    data: ElectricityBillData
  ): Promise<Response> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;

      console.log("Sending with data:", data);

      const response = await axios.post(
        `${SERVER_BASE_URL}/user/electricity/request`,
        rest,
        {
          ...config,
          headers: {
            ...config.headers,
            activity_pin: activity_pin
          }
        }
      );

      const result = response.data;
      console.log("Cable TV Payment Response:", result);

      if (!result.success) {
        throw new Error(result.message || "Payment failed");
      }

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: result.message || "Payment Successful!"
        });
      }

      return result;
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";
      console.error("Error Response:", errorMessage);
      setError(errorMessage);
      Toast.show({
        type: "error",
        text1: errorMessage
      });

      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { payElectricity, isLoading, error };
};

export {
  useFetchCableTvProviders,
  usePayCableTv,
  useFetchElectricityProviders,
  useLookUpTvSubscriber,
  useLookUpElectricityUser,
  useFetchCableTvOptions,
  useFetchElectricityOptions,
  useFetchBettingProviders,
  useLookUpBetCustomer,
  usePayElectricity
};
