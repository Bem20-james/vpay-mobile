import { Image, View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import Navigator from "@/components/Navigator";
import OtpVerification from "./otp-verification";
import { useForgotPwd } from "@/hooks/useAuthentication";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const ForgotPassword = () => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const { forgotPwd, error } = useForgotPwd();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const router = useRouter();

  const validateEmail = (): boolean => {
    let isValid = true;
    setEmailError("");

    if (!email.trim()) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateEmail()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await forgotPwd({ email });

      if (success) {
        Toast.show({
          type: "success",
          text1: "OTP Sent Successfully"
        });

        setShowOtpScreen(true);
      }
    } catch (error: any) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error?.message) {
        errorMessage = error.message;
      }
      Toast.show({
        type: "error",
        text1: errorMessage,
        text2:
          error.message || "An unexpected error occurred. Please try again."
      });

      console.error("Forgot password error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) {
      setEmailError("");
    }
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="forgot-password"
        email={email}
        onBack={() => setShowOtpScreen(false)}
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
              Enter your email
            </ThemedText>
            <ThemedText
              darkColor="#9B9B9B"
              lightColor="#9B9B9B"
              style={styles.subtitle}
            >
              We will send you an OTP to your email address
            </ThemedText>
          </View>

          <FormField
            placeholder="Email"
            handleChangeText={handleEmailChange}
            value={email}
            error={emailError}
            otherStyles={{ marginTop: 5 }}
            keyboardType="email-address"
            isIcon
            iconName="email"
          />

          <CustomButton
            title="Send OTP"
            handlePress={handleSubmit}
            isLoading={isSubmitting}
            disabled={!email.trim() || isSubmitting}
            btnStyles={{ width: "100%", marginTop: 100 }}
          />
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default ForgotPassword;
