import axios, { AxiosError } from "axios";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useUser } from "@/contexts/UserContexts";

interface Country {
  id: number;
  country_name: string;
  country_code: string;
  country_dial_code: string;
}

interface GenericResponse<T> {
  error: number;
  code: number;
  message: string;
  success: boolean;
  result: any[];
}

interface Banks {
  name: string;
  code: string;
}
interface BanksRes {
  error: number;
  message: string;
  success: boolean;
  result: string
  data: Banks[];
}

function useFetchCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<GenericResponse<Country[]>>(
        `${SERVER_BASE_URL}/countries`,
      );

      const result = response.data
      console.log("Response data:", result);

      if (result.success && result.error === 0) {
        setCountries(result.result);
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

  return { countries, loading, refetch: fetchData };
}

function useFetchNgnBanks() {
  const [banks, setBanks] = useState<Banks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<BanksRes>(
        `${SERVER_BASE_URL}/ngn-banks`,
        config
      );

      const result = response.data
      console.log("banks res:", result)

      if (result.success) {
        setBanks(result.data);
      } else {
        if (response.data.error) {

        Toast.show({
          type: "error",
          text1: response.data.message || "Failed to fetch banks.",
        });
      }
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while fetching banks.";

      console.error("Error fetching data:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [config]);

  return { banks, loading, refetch: fetchData };
}


export {
  useFetchCountries,
  useFetchNgnBanks
};