import axios, { AxiosError } from "axios";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import {
  ResolveTag,
  ResolveRes,
  SendFiatData,
  LookUpResponse,
  LookUpResult,
  FiatResponse
} from "@/types/transfers";

function useResolveVpayTag() {
  const [acctInfo, setAcctInfo] = useState<ResolveTag | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const resolveTag = async (data: { vpay_tag: string }): Promise<boolean> => {
    setLoading(true);
    const { vpay_tag } = data;

    const url = `${SERVER_BASE_URL}/user/tag/resolve/?vpay_tag=${encodeURIComponent(
      vpay_tag
    )}`;

    try {
      const response = await axios.post<ResolveRes>(url, {}, config);

      const res = response.data;
      console.log("Resolved tag response:", res);
      console.log("response code", res.code);

      if (res.code === 0) {
        setAcctInfo(res?.result);
        return true;
      } else {
        Toast.show({
          type: "error",
          text1: res.message || "Failed to resolve tag user."
        });
        return false;
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while resolving user.";

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

  const fetchData = async (data: {
    account_number: string;
    bank_code: string;
  }): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await axios.post<LookUpResponse>(
        `${SERVER_BASE_URL}/user/fiat/recipient/verify`,
        {
          account_number: data.account_number,
          bank: "001" // hardcoded to access bank for now
        },
        config
      );
      const result = response.data;
      console.log("lookup response:", result);
      console.log("acctInfo:", acctInfo);

      if (result.success && result.code === 0) {
        setAcctInfo(result.result);
        return true;
      } else {
        Toast.show({
          type: "error",
          text1: response.data.message || "Failed to look up user."
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
      const { activity_pin, ...rest } = data;

      const response = await axios.post<FiatResponse>(
        `${SERVER_BASE_URL}/user/fiat/send/local`,
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
      console.log(result);
      if (!result.success) {
        return false
      }

      if (result.success && result.code === 0) {
        return true
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

  return { sendFunds, isLoading, error };
};



export { useSendLocal, useLookUpUser, useResolveVpayTag };
