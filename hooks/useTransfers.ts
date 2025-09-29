import axios, { AxiosError } from "axios";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import {  LookUpParams, ResolveTag, ResolveRes } from "@/types/transfers";

interface SendFiatData {
  account_number: string;
  currency: string;
  amount: string;
  description?: string;
  account_password: string;
}

interface FiatResponse {
  success: boolean;
  message?: string;
}

interface LookUpResult {
  account_name: string;
  account_number: string;
  bank_id: number;
}

interface LookUpResponse {
  success: boolean;
  code: number;
  message?: string;
  result: LookUpResult;
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
        setAcctInfo(result.result);
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
  const [acctInfo, setAcctInfo] = useState<LookUpResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async (data: { account_number: string; bank_code: string }): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await axios.post<LookUpResponse>(
        `${SERVER_BASE_URL}/user/fiat/recipient/verify`,
        {
          account_number: data.account_number,
          bank: "001", // hardcoded to access bank for now
        },
        config
      );
      const result = response.data;
      console.log("lookup response:", result)
      console.log("acctInfo:", acctInfo)

      if (result.success && result.code === 0) {
        setAcctInfo(result.result);
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


const useSendLocal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const sendFunds = async (data: SendFiatData): Promise<FiatResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<FiatResponse>(
        `${SERVER_BASE_URL}/user/fiat/send/local`,
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

  return { sendFunds, isLoading, error };
};


export {
  useSendLocal,
  useLookUpUser,
  useResolveVpayTag
};