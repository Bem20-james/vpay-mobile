import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

interface KYCFormData {
  doc_country: string;
  id_type: string;
  id_number?: string;
  document_number?: string;
  selfie_image: string;
}

const useIdVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {config} = useUser()

  const verifyId = async (data: KYCFormData): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/kyc/identity`,
        data,
        config
      );

      const result = response.data;

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
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { verifyId, loading, error };
};

export  {
useIdVerification
};