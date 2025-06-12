import axios, { AxiosError } from "axios";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

interface Country {
  id: number;
  country_name: string;
  country_code: string;
  country_dial_code: string;
}

interface CountryResponse {
  error: number;
  message: string;
  success: boolean;
  result: Country[];
}

function useFetchCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await axios.get<CountryResponse>(
        `${SERVER_BASE_URL}/countries`,
      );

      if (response.data.success && response.data.error === 0) {
        setCountries(response.data.result);
      } 

      const result = response.data
      console.log("res:",result)

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

export  {useFetchCountries};