import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { SERVER_BASE_URL } from "../constants/Paths";
import { useUser } from "@/contexts/UserContexts";
import { storeData } from "@/utils/store";
import {jwtDecode} from "jwt-decode";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

interface RegisterData {
  firstname?: string;
  lastname?: string;
  username?: string;
  email: string;
  password: string;
  country_id?: string;
  phone?: string;
  referrer?: string;
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
        router.push({
          pathname: "/(auth)/transaction-pin",
          params: { email },
        });
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

function useLoginWithBiometrics() {
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

  const resetPwd = async ({ otp, otp_medium, email, password }: { 
    otp: string; 
    email: string; 
    password: string, 
    otp_medium: string 
  }): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/verify/reset/password/mobile`, {
        otp,
        otp_medium,
        email,
        password,
      });
      const result = response.data;
      console.log("Server Response:", result);

      if (result.code === 0) {
        Toast.show({
          type: "success",
          text1: result.message || "Password reset successful!",
        });
        return true;
      }

      return false;
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || error?.message || "An unexpected error occurred.";
      setError(errMsg);

      Toast.show({
        type: "error",
        text1: "Password Reset Failed",
        text2: errMsg
      });

      console.error("Password Reset Error:", errMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { resetPwd, loading, error };
};

const useSendResetPwdOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendResetOTP = async ({
    otp,
    otp_medium,
    email,
    password
  }: {
    otp: string;
    email: string;
    password: string;
    otp_medium: string;
  }): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/auth/user/reset/password/2fa-otp`,
        {
          otp,
          otp_medium,
          email,
          password
        }
      );

      const result = response.data;

      console.log("Server Response:", result);

      if (result.success) {
        Toast.show({ type: "success", text1: result.message });
        return true;
      }

      return false;
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";
      setError(errMsg);

      Toast.show({
        type: "error",
        text1: "Password Reset Failed",
        text2: errMsg
      });

      console.error("Password Reset Error:", errMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendResetOTP, loading, error };
};

const useVerifyLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateUser } = useUser();
  const router = useRouter();

  const verifyLogin = async (
    otp: string,
    email: string,
    otp_medium: string,
    password: string
  ): Promise<void> => {
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
      console.log("Login data:", result);

      if (!result || result.code === 1) {
        Toast.show({
          type: "error",
          text1: result?.message || "Invalid response from server.",
        });
        return;
      }

      if (response.status === 200) {

        const { token, user, country, kyc } = result.result;
        const tokenPayload: JwtPayload = jwtDecode(token);
        const expiresAt = tokenPayload.exp * 1000;

        const userData = {
          ...user,
          country,
          kyc,
          accessToken: token,
          refreshToken: null,
          expiresAt,
        };
        console.log("logged userdata:", userData)
        await updateUser(userData);
        await storeData("lastUser", {
          username: user.username,
          email: user.email,
        });

        router.push("/(tabs)/home");
      }
    } catch (err: any) {
      const errMsg =
        err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", errMsg);
    } finally {
      setLoading(false);
    }
  };

  return { verifyLogin, loading, error };
};

const useVerifyForgotPwd = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    
  const verifyForgotPwd = async (otp: string, email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/auth/user/forgot/password/mobile`,{ otp, email});
      const result = response.data;
  
      if (!result || result.error) {
        Toast.show({ type: "error", text1: result?.message || "Invalid response from server." });
        return false;
      }
        
      if (result.success) {
        Toast.show({ type: "success", text1: result.message });
        return true;
      }
      
      return false;
    } catch (err: any) {
      const errMsg = err.response?.data?.message || err.message || "Network or server error";
      setError(errMsg);
      Toast.show({ type: "error", text1: errMsg });
      console.error("Error Response:", err.response?.data);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return { verifyForgotPwd, loading, error };
};

function useLogout() {
  const { config } = useUser();

  return async (): Promise<boolean> => {
    try {
      const response = await axios.post<AuthResponse>(
        `${SERVER_BASE_URL}/auth/user/logout`,
        {config}
      );
  
      const result = response?.data;
      console.log("Logout Response:", result);

      if (result.code !== 0) {
        Toast.show({ type: "error", text1: result.message });
        return false;
      }

      if (result.success) {
        Toast.show({ type: "success", text1: result.message });
        return true;
      }

      Toast.show({ type: "error", text1: "Logout failed unexpectedly." });
      return false;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      const errorMessage =
        axiosError.response?.data?.message || "Logout failed, please try again.";

      console.error("Logout error:", errorMessage);
      Toast.show({ type: "error", text1: errorMessage });

      return false;
    }
  };
}

const useChangePwd = () => { 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    
  const changePwd = async (email: any): Promise<boolean> => {
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
  
  return { changePwd, loading, error };
};

const useSetTransactionPin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  const setTransactionPin = async ({
    transaction_pin,
    email
  }: {
    transaction_pin: string;
    email: string;
  }): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/user/transaction-pin/create`,{transaction_pin, email}
      );

      const result = response.data;
      console.log("Server Response:", result);

      if (result.code === 0) {
        await storeData("hasOnboarded", true);
        Toast.show({ type: "success", text1: result.message });
        router.push("/(auth)/login");
      }

      return false;
    } catch (error: any) {
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred.";
      setError(errMsg);

      Toast.show({
        type: "error",
        text1: errMsg,
        text2: "Failed to set Transaction Pin",
      });

      console.error("Set Transaction Pin Error:", errMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { setTransactionPin, loading, error };
};

export  {
  useRegister, 
  useVerifyEmail, 
  useVerifyLogin, 
  useResendEmailOTP, 
  useResendLoginOTP, 
  useLogin, 
  useLoginWithBiometrics,
  useForgotPwd, 
  useResendPwdResetOTP, 
  useResetPwd, 
  useVerifyForgotPwd,
  useSendResetPwdOTP,
  useLogout,
  useChangePwd,
  useSetTransactionPin
};