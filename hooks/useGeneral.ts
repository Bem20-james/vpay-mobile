import axios, { AxiosError } from "axios";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useUser } from "@/contexts/UserContexts";
import {
  BanksRes,
  Country,
  GenericResponse,
  Rates,
  RatesRes,
  Banks,
  RateConversionRequest
} from "@/types/general";

function useFetchCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<GenericResponse<Country[]>>(
        `${SERVER_BASE_URL}/countries`
      );

      const result = response.data;
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
        `${SERVER_BASE_URL}/app/banks/ng`,
        config
      );

      const result = response.data;
      console.log("banks response:", result);

      if (result.success) {
        setBanks(result.result);
      } else {
        if (response.data.error) {
          Toast.show({
            type: "error",
            text1: response.data.message || "Failed to fetch banks."
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

function useRateConversion(initialData?: RateConversionRequest) {
  const [rate, setRate] = useState<Rates | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RateConversionRequest | undefined>(initialData);

  const fetchData = async (bodyData?: RateConversionRequest) => {
    setLoading(true);

    try {
      const payload = bodyData || data;
      if (!payload) throw new Error("Missing rate conversion data.");

      const response = await axios.post<RatesRes<Rates>>(
        `${SERVER_BASE_URL}/rate-conversion`,
        payload
      );

      const result = response.data;
      console.log("Response data:", result);

      if (result.code === 0) {
        setRate(result.result);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while converting rates.";

      console.error("Error fetching data:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Optionally auto-run on mount if you passed initialData
  useEffect(() => {
    if (initialData) fetchData(initialData);
  }, []);

  return { rate, loading, refetch: fetchData, setData };
}


export { useFetchCountries, useFetchNgnBanks, useRateConversion };
