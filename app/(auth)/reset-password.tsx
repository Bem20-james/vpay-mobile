import { Image, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import Navigator from "@/components/Navigator";
import { useSendResetPwdOTP } from "@/hooks/useAuthentication";
import Toast from "react-native-toast-message";
import OtpMediumModal from "@/components/OtpMediumModal";
import OtpVerification from "./otp-verification";

const ResetPassword = () => {
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const { sendResetOTP } = useSendResetPwdOTP();
  const { otp, email: rawEmail } = useLocalSearchParams();

  const email = Array.isArray(rawEmail) ? rawEmail[0] : rawEmail;

  const [form, setForm] = useState({
    password: "",
    confirmPassword: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  type OtpMethod = "sms" | "authenticator" | "email";

  const [otpMedium, setOtpMedium] = useState<OtpMethod>("sms");
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const handleInputChange = (key: string, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [key]: value }));
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*)";
    }
    return null;
  };

  const submitForm = async (method: OtpMethod) => {
    if (!form.password || !form.confirmPassword) {
      Toast.show({ type: "error", text1: "All fields are required" });
      return;
    }

    if (form.password !== form.confirmPassword) {
      Toast.show({ type: "error", text1: "Passwords do not match" });
      return;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      Toast.show({ type: "error", text1: passwordError });
      return;
    }

    setOtpMedium(method);

    if (method === "authenticator") {
      setShowOtpScreen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await sendResetOTP({
        otp: String(otp),
        email: String(email),
        otp_medium: method,
        password: form.password
      });

      if (success) {
        setIsSubmitting(false);
        setShowOtpScreen(true);
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Password Reset Failed",
        text2:
          error.message || "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="reset-password"
        email={email}
        onBack={() => setShowOtpScreen(false)}
        otp_medium={otpMedium}
        password={form.password}
      />
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <Navigator />
        <View style={styles.container}>
          {colorScheme === "dark" ? (
            <Image source={images.logolight} style={styles.logo} />
          ) : (
            <Image source={images.logodark} style={styles.logo} />
          )}
          <View style={{ marginTop: 40 }}>
            <ThemedText
              darkColor="#FFFFFF"
              lightColor="#000000"
              style={styles.heading}
            >
              Password Reset
            </ThemedText>
            <ThemedText
              darkColor="#9B9B9B"
              lightColor="#9B9B9B"
              style={styles.subtitle}
            >
              Reset your password and regain access to your account
            </ThemedText>
          </View>

          <FormField
            placeholder="Password"
            value={form.password}
            handleChangeText={(text) => handleInputChange("password", text)}
            otherStyles={{ marginTop: 5 }}
            keyboardType="default"
            isIcon
            iconName="shield"
          />
          <FormField
            placeholder="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(text) =>
              handleInputChange("confirmPassword", text)
            }
            otherStyles={{ marginTop: 5 }}
            keyboardType="default"
            isIcon
            iconName="shield"
          />

          <CustomButton
            title={isSubmitting ? "Resetting..." : "Reset Password"}
            handlePress={() => setShowModal(true)}
            btnStyles={{ width: "100%", marginTop: 100 }}
            disabled={isSubmitting}
            isLoading={isSubmitting}
          />
        </View>

        <OtpMediumModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          isLoading={isSubmitting}
          onSubmit={submitForm}
          methods={["sms", "authenticator"]}
        />
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default ResetPassword;
