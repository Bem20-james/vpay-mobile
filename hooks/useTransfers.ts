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
  TransactionResponse,
  CryptoData
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

function useLookUpMobileMoneyUser() {
  const [acctInfo, setAcctInfo] = useState<LookUpResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { config } = useUser();

  const fetchData = async (data: {
    provider_code: string;
    phone: string;
    currency: string;
  }): Promise<boolean> => {
    setLoading(true);

    try {
      const response = await axios.post<LookUpResponse>(
        `${SERVER_BASE_URL}/mobile-money/recipient/verify`,
        {
          provider_code: data.provider_code,
          phone: data.phone,
          currency: data.currency
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

  const sendFunds = async (
    data: SendFiatData
  ): Promise<TransactionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/fiat/send/local`,
        rest,
        {
          ...config,
          headers: { ...config.headers, activity_pin }
        }
      );

      const result = response.data;
      console.log("send local response:", result);

      if (!result.success && result.code !== 0) {
        return {
          success: false,
          message: result.message || "Transaction failed"
        };
      }

      return { success: true, data: result, message: result.message };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { sendFunds, isLoading, error };
};

const useSendCrypto = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const sendCrypto = async (data: CryptoData): Promise<TransactionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;
      const response = await axios.post(
        `${SERVER_BASE_URL}/web3/send-tokens`,
        rest,
        {
          ...config,
          headers: { ...config.headers, activity_pin }
        }
      );

      const result = response.data;
      console.log("send tokens res:", result);

      if (!result.success && result.code !== 0) {
        return {
          success: false,
          message: result.message || "Transaction failed"
        };
      }

      return { success: true, data: result, message: result.message };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return { sendCrypto, isLoading, error };
};

const useSendInternational = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const sendFunds = async (
    data: SendFiatData
  ): Promise<TransactionResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const { activity_pin, ...rest } = data;
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/fiat/send/international`,
        rest,
        {
          ...config,
          headers: { ...config.headers, activity_pin }
        }
      );

      const result = response.data;
      console.log("International RES:", result);

      if (!result.success && result.code !== 0) {
        return {
          success: false,
          message: result.message || "Transaction failed"
        };
      }

      return { success: true, data: result, message: result.message };
    } catch (err) {
      const errorMessage =
        (err as AxiosError<{ message?: string }>)?.response?.data?.message ||
        (err as Error).message ||
        "Network or server error";

      setError(errorMessage);
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
  useResolveVpayTag,
  useSendCrypto,
  useLookUpMobileMoneyUser,
  useSendInternational
};
