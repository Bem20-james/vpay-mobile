import axios, { AxiosError } from "axios";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { useUser } from "@/contexts/UserContexts";
import {
  BanksResponse,
  Country,
  GenericResponse,
  Rates,
  RatesRes,
  Bank,
  RateConversionRequest,
  History,
  HistoryResponse
} from "@/types/general";
import { useQuery } from "@tanstack/react-query";

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

      if (result.success && result.code === 0) {
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

const fetchBanks = async (
  countryCode: string,
  config: any
): Promise<Bank[]> => {
  const url = `${SERVER_BASE_URL}/app/banks/${encodeURIComponent(countryCode)}`;
  const response = await axios.get<BanksResponse>(url, config);

  if (response.data.success && !response.data.error) {
    return response.data.result;
  } else {
    const message = response.data.message || "Failed to fetch banks.";
    throw new Error(message);
  }
};

function useFetchBanks(countryCode: string) {
  const { config } = useUser();

  const {
    data: banks = [],
    isLoading,
    isFetching,
    error,
    refetch
  } = useQuery<Bank[], AxiosError>({
    queryKey: ["banks", countryCode],
    queryFn: () => fetchBanks(countryCode, config),
    enabled: !!countryCode,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2
  });

  useEffect(() => {
    if (!error) return;
    Toast.show({
      type: "error",
      text1:
        (error.response?.data as any)?.message ||
        error.message ||
        "Failed to fetch banks"
    });
  }, [error]);

  return {
    banks,
    loading: isLoading || isFetching,
    error,
    refetch
  };
}

function useRateConversion(initialData?: RateConversionRequest) {
  const [rate, setRate] = useState<Rates | any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<RateConversionRequest | undefined>(
    initialData
  );
  const { config } = useUser();

  const fetchData = async (bodyData?: RateConversionRequest) => {
    setLoading(true);

    try {
      const payload = bodyData || data;
      if (!payload) throw new Error("Missing rate conversion data.");

      const response = await axios.post<RatesRes<Rates>>(
        `${SERVER_BASE_URL}/rate-conversion`,
        payload,
        config
      );

      const result = response.data;
      console.log("Response data:", result);

      if (result.code === 0) {
        setRate(result.result);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data ||
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

function useFetchMobileMoneyCountries() {
  const [MmCountries, setMmCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useUser();

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<GenericResponse<Country[]>>(
        `${SERVER_BASE_URL}/mobile-money/countries`,
        config
      );

      const result = response.data;
      console.log("Response data:", result);

      if (result.success && result.code === 0) {
        setMmCountries(result.result);
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data ||
        "An error occurred while fetching countries.";

      console.error("Error fetching data:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { MmCountries, loading, refetch: fetchData };
}

function useMobileMoneyOperators() {
  const [operators, setOperators] = useState<Bank[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { config } = useUser();

  const fetchData = async (countryCode?: string) => {
    setLoading(true);

    if (!countryCode) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get<BanksResponse>(
        `${SERVER_BASE_URL}/mobile-money-providers/${countryCode}`,
        config
      );

      const result = response.data;
      console.log("mobile money response:", result);

      if (result.success) {
        setOperators(result.result);
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

  return { operators, loading, refetch: fetchData };
}

const fetchTrnxHistory = async (config: any): Promise<History[]> => {
  try {
    const url = `${SERVER_BASE_URL}/user/recent-transactions`;
    const response = await axios.get<HistoryResponse>(url, config);
    const result = response.data;

    console.log("TRNX HISTORY:", result);

    if (result?.success && response.data?.result) {
      return response.data.result;
    }

    throw new Error(
      response.data?.message || "Failed to fetch transaction history"
    );
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

function useFetchTrnxHistory() {
  const { config } = useUser();

  const {
    data: trnxHistory = [],
    isLoading,
    isFetching,
    error,
    refetch
  } = useQuery<History[], AxiosError>({
    queryKey: ["transactionHistory"],
    queryFn: () => fetchTrnxHistory(config),
    staleTime: 1000 * 60 * 5,
    retry: 2
  });

  useEffect(() => {
    if (!error) return;
    Toast.show({
      type: "error",
      text1:
        (error.response?.data as any)?.message ||
        error.message ||
        "Failed to fetch transaction history"
    });
    console.error();
  }, [error]);

  return {
    trnxHistory,
    loading: isLoading || isFetching,
    error,
    refetch
  };
}

export {
  useFetchCountries,
  useFetchBanks,
  useRateConversion,
  useMobileMoneyOperators,
  useFetchMobileMoneyCountries,
  useFetchTrnxHistory
};
