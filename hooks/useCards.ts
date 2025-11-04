import axios, { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

export interface CreateData {
  currency?: string;
}

export interface CreateResult {
  id: string;
  user_id: string;
  card_number: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
  name_on_card: string;
  status: "active" | "inactive" | "pending" | string;
  balance: string;
  created_at: string;
  card_type: "MasterCard" | "Visa" | string;
  currency_id: string;
}

export interface CreateRes {
  code: string | number;
  message: string;
  success: string;
  result?: CreateResult;
}

function useCreateCard() {
  const { config } = useUser();

  return async (data: CreateData): Promise<boolean> => {
    try {
      const response = await axios.post<CreateRes>(
        `${SERVER_BASE_URL}/user/cards/create`,
        data,
        config
      );
      console.log("Response:", response);

      const result = response?.data;
      console.log("Res result:", result);

      if (result.code) {
        Toast.show({ type: "error", text1: result.message });
      }

      if (result.code === 0 || result.success === "true") {
        return true;
      }

      return false;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: any }>;
      const errorMessage =
        axiosError.response?.data?.message ||
        "An error occurred while creating card.";

      console.error("Error:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });

      return false;
    }
  };
}

export { useCreateCard };
