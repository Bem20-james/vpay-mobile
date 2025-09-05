import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";


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

export {useSendFiat};