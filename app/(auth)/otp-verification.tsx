import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import OTPInputField from "../../components/OtpInputField";
import Navigator from "@/components/Navigator";
import {
  useVerifyEmail,
  useVerifyLogin,
  useResendLoginOTP,
  useResendEmailOTP,
  useResendPwdResetOTP,
  useVerifyForgotPwd,
  useResetPwd
} from "@/hooks/useAuthentication";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";

interface OtpVerificationProps {
  email?: string;
  onBack?: () => void;
  mode?: "verify-email" | "forgot-password" | "reset-password" | "login" | "change-password";
  otp_medium?: string;
  password?: string;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({
  mode = "verify-email",
  email,
  onBack,
  otp_medium,
  password
}) => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { verifyEmail, loading: verifyingEmail } = useVerifyEmail();
  const { verifyLogin, loading: verifyingLogin } = useVerifyLogin();
  const { resendEmailOTP } = useResendEmailOTP();
  const { resendLoginOTP } = useResendLoginOTP();
  const { resendPwdResetOTP } = useResendPwdResetOTP();
  const { verifyForgotPwd, loading: verifyingForgotPwd } = useVerifyForgotPwd();
  const { resetPwd, loading: verifyingResetPwd } = useResetPwd();

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleOTPSubmit = async () => {
    if (otp.length !== 6) {
      return Toast.show({
        type: "error",
        text1: "Invalid OTP, Please enter a 6-digit OTP."
      });
    }
    try {
      if (mode === "verify-email") {
        await verifyEmail(otp, email ?? "");
      } else if (mode === "forgot-password") {
        const success = await verifyForgotPwd(otp, email ?? "");
        if (success) {
          router.push({
            pathname: "/(auth)/reset-password",
            params: { otp, email }
          });
        }
      } else if (mode === "login") {
        await verifyLogin(otp, email ?? "", otp_medium ?? "", password ?? "");
      } else if (mode === "reset-password") {
        const success = await resetPwd({
          otp,
          otp_medium: otp_medium ?? "",
          email: email ?? "",
          password: password ?? ""
        });
        if (success) {
          router.push({
            pathname: "/(auth)/login",
            params: { otp, email }
          });
        }
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1:
          error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "OTP Verification Failed"
      });
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setOtp("");
    setIsResending(true);
    try {
      if (mode === "verify-email") {
        await resendEmailOTP("verify_email", email ?? "");
      } else if (mode === "forgot-password") {
        await resendPwdResetOTP(otp_medium ?? "", email ?? "");
      } else if (mode === "login") {
        await resendLoginOTP(otp_medium ?? "", email ?? "");
      } else if (mode === "reset-password") {
        await resendLoginOTP(otp_medium ?? "", email ?? "");
      }

      setCountdown(60);
    } catch (error) {
      Toast.show({
        type: "error",
        text1:
          error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "OTP Resend Failed"
      });
    }
    setIsResending(false);
  };

  const handleOTPComplete = (completedOtp: string) => {
    // Optional: Auto-submit when OTP is complete
    console.log("OTP completed:", completedOtp);
  };

  const isLoading =
    verifyingEmail || verifyingLogin || verifyingForgotPwd || verifyingResetPwd;

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <Navigator title={""} onBack={onBack} />
        <View style={styles.container}>
          <View>
            <ThemedText
              darkColor="#FFFFFF"
              lightColor="#000000"
              style={styles.heading}
            >
              Verify OTP
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <ThemedText
                lightColor="#9B9B9B"
                darkColor="#9B9B9B"
                style={styles.btmTxt}
              >
                {mode === "forgot-password"
                  ? "Enter the OTP sent to reset your password."
                  : "We have sent a code to your email."}
              </ThemedText>
              <ThemedText
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#218DC9"
                }}
              >
                {email}
              </ThemedText>
            </View>
          </View>

          <OTPInputField
            value={otp}
            onChangeText={setOtp}
            onComplete={handleOTPComplete}
          />

          <CustomButton
            title={isLoading ? "Verifying..." : "Verify"}
            handlePress={() => handleOTPSubmit()}
            btnStyles={{
              width: "100%",
              marginTop: 50,
              opacity: isLoading ? 0.7 : 1
            }}
            isLoading={isLoading}
          />

          <View style={styles.resendCon}>
            <ThemedText
              lightColor="#000000"
              darkColor="#FFFFFF"
              style={{ fontFamily: "Questrial" }}
            >
              Didn't receive OTP?
            </ThemedText>
            <Pressable
              onPress={handleResendOTP}
              disabled={countdown > 0 || isResending}
            >
              {isResending ? (
                <ActivityIndicator size="small" color="#D0A106" />
              ) : (
                <ThemedText
                  style={{
                    fontFamily: "Inter-Bold",
                    color:
                      countdown > 0
                        ? "gray"
                        : colorScheme === "dark"
                        ? "#218DC9"
                        : "#218DC9"
                  }}
                >
                  {countdown > 0 ? `Resend in ${countdown}s` : "Resend"}
                </ThemedText>
              )}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  heading: {
    fontFamily: "Inter-ExtraBold",
    fontSize: 25,
    lineHeight: 70,
    letterSpacing: 0,
    textAlign: "center"
  },
  btmTxt: {
    fontFamily: "Questrial",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center"
  },
  resendCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 5
  }
});
