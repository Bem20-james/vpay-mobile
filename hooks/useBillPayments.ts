import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

interface CableTvData {
  fiatToken: string;
  provider: string;
  number: string;
  code: string;
  amount: string;
  phone: string;
  authorization_pin: string;
}

interface Response {
  success: boolean;
  message?: string;
}

interface CableTvProvider {
  id: number;
  country_name: string;
  country_code: string;
  country_dial_code: string;
}

interface ProviderRes<T> {
  error: number;
  response_code: number;
  message: string;
  success: boolean;
  result: any[];
}

function useFetchCableTvProviders() {
  const [tvProviders, setTvProviders] = useState<CableTvProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config} = useUser()

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ProviderRes<CableTvProvider[]>>(
        `${SERVER_BASE_URL}/user/cabletv/providers`, config
      );

      const result = response.data
      console.log("Response data:", result);

      if (result.success && result.response_code === 200) {
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
  const { config} = useUser()

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ProviderRes<CableTvProvider[]>>(
        `${SERVER_BASE_URL}/user/electricity/providers`, config
      );

      const result = response.data
      console.log("Response data:", result);

      if (result.success && result.response_code === 200) {
        setPowerProviders(result.result);
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

  return { powerProviders, loading, refetch: fetchData };
}

const usePayCableTv = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const payCableTv = async (data: CableTvData): Promise<Response> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<Response>(
        `${SERVER_BASE_URL}/user/cabletv/request`,
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

  return { payCableTv, isLoading, error };
};

export {
  useFetchCableTvProviders,
  usePayCableTv,
  useFetchElectricityProviders
};