import axios, { AxiosError } from "axios";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import { LookUpResponse, LookUpData, ResolveTag, ResolveRes } from "@/types/transfers";

interface SendFiatData {
  type: string;
  amount: string;
  recipient: string;
  bank_code: string;
  description: string;
  currency: string;
}

interface FiatResponse {
  success: boolean;
  message?: string;
}

function useResolveVpayTag() {
  const [acctInfo, setAcctInfo] = useState<ResolveTag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const resolveTag = async (data: ResolveTag): Promise<boolean> => {
    setLoading(true);
    const { vpay_tag } = data;
    const url = `${SERVER_BASE_URL}/user/tag/resolve/${encodeURIComponent(vpay_tag)}`;

    try {
      const response = await axios.get<ResolveRes>(url, config);

      const result = response.data
      console.log("resolved tag res:", result)
      console.log(result)

      if (result.success && result.error === 0) {
        setAcctInfo(result);
        return true;
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message || "Failed to look up user.",
        });
        return false;
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while looking up user.";

      console.error("Error fetching data:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { acctInfo, loading, resolveTag };
}

function useLookUpUser() {
  const [acctInfo, setAcctInfo] = useState<LookUpData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async (data: LookUpData): Promise<boolean> => {
    setLoading(true);
    const { account_number, bank_code } = data;
    const url = `${SERVER_BASE_URL}/lookup/recipient/${encodeURIComponent(bank_code)}/${encodeURIComponent(account_number)}`;

    try {
      const response = await axios.get<LookUpResponse>(url, config);

      console.log(response.data.result)

      if (response.data.success && response.data.error === 0) {
        setAcctInfo(response.data.result);
        return true;
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message || "Failed to look up user.",
        });
        return false;
      }
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while looking up user.";

      console.error("Error fetching data:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { acctInfo, loading, lookup: fetchData };
}

const useSendFiat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const sendFiat = async (data: SendFiatData): Promise<FiatResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<FiatResponse>(
        `${SERVER_BASE_URL}/user/fiat/send`,
        data,
        config
      );

      const result = response.data;
      console.log(result)
      if (!result.success) {
        throw new Error(result.message || "Transaction failed");
      }

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: result.message || "Transfer Successful!",
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

  return { sendFiat, isLoading, error };
};


export {
  useSendFiat,
  useLookUpUser,
  useResolveVpayTag
};