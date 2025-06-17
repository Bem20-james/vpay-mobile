import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";

interface RegisterData {
  firstname?: string;
  lastname?: string;
  username?: string;
  email: string;
  password: string;
  country_id?: string;
  phone?: string;
  referral?: string;
}

interface LoginData {
  email?: string;
  password?: string;
}

interface AuthResponse {
  code: boolean | number;
  message: string;
  success: string;
}

function useRegister() {
  return async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${SERVER_BASE_URL}/auth/user/register`,
        data
      );

      const result = response?.data;
      console.log("Register Response:", result);

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
        axiosError.response?.data?.message || "An error occurred while registering.";
        
      console.error("Error:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage.message });

      return false;
    }
  };
}

const useVerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
  
  const verifyEmail = async (token: string, email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/verify/email`, {
        otp: token,
        email: email
      });

      const { message } = response.data;

      if (response.status === 200) {
        Toast.show({ type: "success", text1: message || "Email verified successfully!" });
        router.push("/(auth)/login");
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { verifyEmail, loading, error };
};

const useResendEmailOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const resendEmailOTP = async (otp_type: string, email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/user/resend/verification-otp`, {
        otp_type,
        email
      });

      const result = response.data;
      console.log("data:",result)

      if (response.status === 200) {
        Toast.show({ type: "success", text1: result.message || "OTP resent successfully!" });
      }
      
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { resendEmailOTP, loading, error };
}

const useResendLoginOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const resendLoginOTP = async (otp_medium: string, email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/user/resend/login/otp`, {
        otp_medium,
        email
      });

      const result = response.data;
      console.log("data:",result)

      if (response.status === 200) {
        Toast.show({ type: "success", text1: result.message || "OTP resent successfully!" });
      }
      
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { resendLoginOTP, loading, error };
}

function useLogin() {
  return async (data: LoginData): Promise<boolean> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${SERVER_BASE_URL}/auth/user/login`,
        data
      );

      const result = response?.data;
      console.log("Login Response:", result);

      if (result.code) {
        Toast.show({ type: "error", text1: result.message });
        return false;
      }

      if (result.success) {
        Toast.show({ type: "success", text1: result.message });
        return true;
      }

      Toast.show({ type: "error", text1: "Something went wrong!" });
      return false;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Login failed, try again.";

      console.error("Catch err:", error);
      Toast.show({ type: "error", text1: errorMessage });

      return false;
    }
  };
};

const useForgotPwd = () => { 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    
  const forgotPwd = async (email: any): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/user/forgot/password/mobile`,email );

      const result = response?.data;

      if (result.success) {
        Toast.show({ type: "success", text1: result.message || "OTP sent successfully!" });
        return true; 
      }
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", errMsg);
    } finally {
      setLoading(false);
    }
    
    return false;
  };
  
  return { forgotPwd, loading, error };
};

const useResendPwdResetOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const resendPwdResetOTP = async (otp_medium: string, email: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/user/resend/password/reset-otp/mobile`, {
        otp_medium,
        email
      });

      const result = response.data;
      console.log("data:",result)

      if (response.status === 200) {
        Toast.show({ type: "success", text1: result.message || "OTP resent successfully!" });
      }
      
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return { resendPwdResetOTP, loading, error };
}

const useResetPwd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const resetPwd = async ({ otp, otp_medium, email, password }: { otp: string; email: string; password: string, otp_medium: string }): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const { data, status } = await axios.post(`${SERVER_BASE_URL}/auth/verify/reset/password/mobile`, {
        otp,
        otp_medium,
        email,
        password,
      });

      console.log("Server Response:", data);

      if (status === 200) {
        Toast.show({
          type: "success",
          text1: data.message || "Password reset successfully!",
        });

        router.push("/(auth)/login");
      }
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || error?.message || "An unexpected error occurred.";
      setError(errMsg);

      Toast.show({
        type: "error",
        text1: "Password Reset Failed",
        text2: errMsg
      });

      console.error("Password Reset Error:", errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { resetPwd, loading, error };
};

const useVerifyLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useUser()
  const router = useRouter()
    
  const verifyLogin = async (otp: string, email: string, otp_medium: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/user/login`, {
        otp,
        email,
        otp_medium,
        password,
      });

      const result = response.data;
  
      if (!result || result.error) {
          Toast.show({ type: "error", text1: result?.message || "Invalid response from server." });
          return;
      }
        
      if (response.status === 200) {
        updateUser(result.result)
        router.push("/(tabs)/home");
      }
      
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };
  
    return { verifyLogin, loading, error };
};

const useVerifyForgotPwd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()
    
  const verifyForgotPwd = async (otp: string, email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/user/forgot/password/mobile`,{ otp, email});

      const result = response.data;

      console.log("res", result)
  
      if (!result || result.error) {
          Toast.show({ type: "error", text1: result?.message || "Invalid response from server." });
          return;
      }
        
      if (result.success) {
        Toast.show({ type: "success", text1: result.message });
        return;
      }
      
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };
  
    return { verifyForgotPwd, loading, error };
};


export  {useRegister, useVerifyEmail, useVerifyLogin, useResendEmailOTP, useResendLoginOTP, useLogin, useForgotPwd, useResendPwdResetOTP, useResetPwd, useVerifyForgotPwd};