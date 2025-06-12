import { Image, View, ScrollView, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { useLogin } from "@/hooks/useAuthentication";
import OtpVerification from "./otp-verification";
import Toast from "react-native-toast-message";
import OtpMediumModal from "@/components/OtpMediumModal";

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Login = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

  const [form, setForm] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [otpMedium, setOtpMedium] = useState<"email" | "sms" | "authenticator">(
    "email"
  );

  const login = useLogin();

  const validate = () => {
    let valid = true;
    let newErrors = { identifier: "", password: "" };

    if (!form.identifier) {
      newErrors.identifier = "Username or Email is required.";
      valid = false;
    } else if (
      form.identifier.includes("@") &&
      !isValidEmail(form.identifier)
    ) {
      newErrors.identifier = "Invalid email format.";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
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
      const payload = form.identifier.includes("@")
        ? {
            email: form.identifier,
            password: form.password,
            otp_medium: method
          }
        : {
            username: form.identifier,
            password: form.password,
            otp_medium: method
          };

      const success = await login(payload);
      if (success) {
        setIsLoading(false);
        setShowOtpScreen(true);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: "Please check your credentials"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="login"
        email={form.identifier}
        onBack={() => setShowOtpScreen(false)}
        otp_medium={otpMedium}
        password={form.password}
      />
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={images.logo} style={styles.logo} />
          <View style={{ marginTop: 40 }}>
            <ThemedText
              darkColor="#FFFFFF"
              lightColor="#000000"
              style={styles.heading}
            >
              Login to your account
            </ThemedText>
            <ThemedText
              darkColor="#9B9B9B"
              lightColor="#9B9B9B"
              style={styles.subtitle}
            >
              Welcome back, pick up exactly where you left off champ
            </ThemedText>
          </View>

          <FormField
            placeholder={"Username/Email"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, identifier: value }))
            }
            value={form.identifier}
            error={errors.identifier}
            otherStyles={{ marginTop: 5 }}
            keyboardType="email-address"
            isIcon
            iconName="person"
          />
          <FormField
            placeholder={"Password"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
            value={form.password}
            error={errors.password}
            isIcon
            iconName="shield"
            otherStyles={{ marginTop: 5 }}
          />

          <Pressable
            onPress={() => router.push("/(auth)/forgot-password")}
            style={({ pressed }) => [
              styles.forgotPwd,
              { opacity: pressed ? 0.7 : 1 }
            ]}
          >
            <View
              style={{
                backgroundColor: "#218DC9",
                borderRadius: 40,
                padding: 2
              }}
            >
              <Entypo name="lock" size={10} color="#ffffff" />
            </View>
            <ThemedText
              lightColor="#218DC9"
              darkColor="#218DC9"
              style={styles.forgotPwdTxt}
            >
              Forgot Password?
            </ThemedText>
          </Pressable>

          <CustomButton
            title="Login"
            handlePress={() => setShowModal(true)}
            isLoading={isLoading}
            disabled={!form.identifier || !form.password}
            btnStyles={{ width: "100%", marginTop: 150 }}
          />

          <View style={styles.btmContent}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
                gap: 4
              }}
            >
              <ThemedText lightColor="#9B9B9B" darkColor="#9B9B9B">
                Not registered yet?
              </ThemedText>
              <Link href="/register">
                <ThemedText
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    color: "#218DC9",
                    textDecorationLine: "underline"
                  }}
                >
                  Sign Up
                </ThemedText>
              </Link>
            </View>

            <ThemedText
              lightColor="#9B9B9B"
              darkColor="#9B9B9B"
              style={styles.btmTxt}
            >
              By clicking “Login”, you agree to vPay
              <Text
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "#218DC9"
                }}
              >
                Terms & Service, Privacy Policy and Other Policies.
              </Text>
            </ThemedText>
          </View>
        </View>

        <OtpMediumModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
