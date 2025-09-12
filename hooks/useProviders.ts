import axios, { AxiosError } from "axios";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useEffect, useState } from "react";

interface Provider {
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

function useGetAirtimeProviders() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<ProviderRes<Provider[]>>(
        `${SERVER_BASE_URL}/user/airtime/provider`,
      );

      const result = response.data
      console.log("Response data:", result);

      if (result.success && result.response_code === 200) {
        setProviders(result.result);
      } 

    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while fetching countries.";

      console.error("Error fetching data:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { providers, loading, refetch: fetchData };
}


export  {useGetAirtimeProviders};