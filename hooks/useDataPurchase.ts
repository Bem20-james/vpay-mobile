import axios, { AxiosError } from "axios";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

interface MobileData {
  fiatToken: string;
  provider: string;
  code: string;
  amount: string;
  phone: string;
  authorization_pin: string;
}

interface Response {
  success: boolean;
  message?: string;
}

const usePurchaseData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { config } = useUser();

  const purchaseData = async (data: MobileData): Promise<Response> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post<Response>(
        `${SERVER_BASE_URL}/user/mobiledata/request`,
        data,
        config
      );

      const result = response.data;
      console.log(result)
      if (!result.success) {
        throw new Error(result.message || "Payment failed");
      }

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: result.message || "Payment Successful!",
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

  return { purchaseData, isLoading, error };
};

export {usePurchaseData};