import axios, { AxiosError } from "axios";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

interface Response {
  code: boolean | number;
  message: string;
  success: string;
}

interface VerifyIdData {
  id_type: string | undefined;
  id_number?: string | number | null;
  selfie_image: string;
}

interface RegisterData {
  firstname?: string;
  lastname?: string;
  email: string;
  country_id?: string;
  phone?: string;
  gender?: string;
  marital_status?: string;
  occupation?: string;
  postal_code?: string;
  state?: string;
  city?: string;
  dob?: string;
  address?: string;
  selfie_image?: string;
}

interface AddressData {
  document?: string;
  postal_code?: string;
  state?: string;
  city?: string;
  street_address_one?: string;
  country?: string;
  document_type?: string;
}

function usePersonalVerification() {
  const { config } = useUser()
  return async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await axios.post<Response>(
        `${SERVER_BASE_URL}/user/kyc/personal`,
        data,
        config
      );

      const result = response?.data;
      console.log("Response:", result);

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
        axiosError.response?.data?.message || "An error occurred while Submitting KYC data.";
        
      console.error("Error:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage.message });

      return false;
    }
  };
}

const useIdVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {config} = useUser()

  const verifyId = async (data: VerifyIdData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/kyc/identity`,
        data,
        config
      );

      const result = response.data;
      console.log("Id res:", result)

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: result.message || "Verification Submitted Successfully!",
        });
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({
        type: "error",
        text1: errMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return { verifyId, loading, error };
};

const useAddressVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {config} = useUser()

  const verifyAddress = async (data: AddressData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/kyc/address`,
        data,
        config
      );

      const result = response.data;
      console.log("Id res:", result)

      if (response.status === 200) {
        Toast.show({
          type: "success",
          text1: result.message || "Verification Submitted Successfully!",
        });
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({
        type: "error",
        text1: errMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return { verifyAddress, loading, error };
};

export  {
  useIdVerification,
  usePersonalVerification,
  useAddressVerification
};