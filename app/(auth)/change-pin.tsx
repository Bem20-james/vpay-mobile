import { Image, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import OtpVerification from "./otp-verification";
import Toast from "react-native-toast-message";
import OtpMediumModal from "@/components/OtpMediumModal";
import { Colors } from "@/constants/Colors";
import { useChangePwd } from "@/hooks/useAuthentication";
import TransactionPinScreen from "@/components/TransactionPin";

const ChangePIN = () => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const [form, setForm] = useState({ pwd: "", newPwd: "", confirmNewPwd: "" });
  const [errors, setErrors] = useState({
    pwd: "",
    newPwd: "",
    confirmNewPwd: ""
  });
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [otpMedium, setOtpMedium] = useState<"email" | "sms" | "authenticator">(
    "email"
  );
  const { changePwd } = useChangePwd();

  const validate = () => {
    let valid = true;
    let newErrors = { pwd: "", newPwd: "", confirmNewPwd: "" };

    if (!form.pwd) {
      newErrors.pwd = "Current password is required.";
      valid = false;
    }

    if (!form.newPwd) {
      newErrors.newPwd = "Enter a new password.";
      valid = false;
    }
    if (!form.newPwd) {
      newErrors.newPwd = "Enter a new password.";
      valid = false;
    }

    if (!form.confirmNewPwd) {
      newErrors.newPwd = "Enter a new password.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (method: "email" | "sms" | "authenticator") => {
    if (!validate()) return;
    setOtpMedium(method);

    if (method === "authenticator") {
      setShowOtpScreen(true);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        password: form.pwd,
        new_password: form.newPwd
      };

      const success = await changePwd(payload);

      if (success) {
        setIsLoading(false);
        setShowOtpScreen(true);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "ChangePIN failed",
        text2: "Please check your credentials"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="change-password"
        email={form.pwd}
        onBack={() => setShowOtpScreen(false)}
        otp_medium={otpMedium}
        password={form.pwd}
      />
    );
  }

  return <TransactionPinScreen />;
};

export default ChangePIN;
