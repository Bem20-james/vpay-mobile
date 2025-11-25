import { Image, View, ScrollView, Pressable, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { getData } from "@/utils/store";
import { Colors } from "@/constants/Colors";
import * as LocalAuthentication from "expo-local-authentication";
import { useLogin } from "@/hooks/useAuthentication";
import { useLoader } from "@/contexts/LoaderContext";
import OtpMediumModal from "@/components/OtpMediumModal";
import OtpVerification from "./otp-verification";
import { useUser } from "@/contexts/UserContexts";
import { useTheme } from "@/contexts/ThemeContexts";

const IndexLogin = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const router = useRouter();
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showBiometricIcon, setShowBiometricIcon] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const login = useLogin();
  const { showLoader, hideLoader } = useLoader();

  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [otpMedium, setOtpMedium] = useState<"email" | "sms" | "authenticator">(
    "email"
  );
  const { user, refreshUserToken, isTokenExpired } = useUser();

  useEffect(() => {
    const loadLastUser = async () => {
      const result = await getData("lastUser");
      if (result && result.success && result.data) {
        setUsername(result.data.username);
        setEmail(result.data.email);
      }
    };
    loadLastUser();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getData<boolean>("useBiometrics");
      if (res.success && typeof res.data === "boolean") {
        setShowBiometricIcon(res.data);
      } else {
        setShowBiometricIcon(false);
      }
    })();
  }, []);

  const handleSubmit = async (method: "email" | "sms" | "authenticator") => {
    setOtpMedium(method);
    setIsLoading(true);
    showLoader();

    if (method === "authenticator") {
      hideLoader();
      setShowOtpScreen(true);
      return;
    }

    try {
      const payload = {
        email: email,
        password: password,
        otp_medium: method
      };
      console.log("payload", payload);

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
      hideLoader();
    }
  };

  const handleBiometricLogin = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!compatible || !enrolled) {
      Toast.show({ type: "error", text1: "Biometrics not available" });
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with biometrics",
      disableDeviceFallback: true
    });

    if (!result.success) return;

    try {
      showLoader();

      if (!user) {
        Toast.show({
          type: "error",
          text1: "No active session, please sign in"
        });
        router.push("/(auth)/login");
        return;
      }

      // ✅ If we have a user saved
      if (isTokenExpired()) {
        const refreshed = await refreshUserToken();
        console.log("refresh user:", refreshed);
        if (!refreshed) {
          Toast.show({
            type: "error",
            text1: "Session expired. Please log in again."
          });
          router.push("/(auth)/login");
          return;
        }
      }

      // At this point user has a valid session
      Toast.show({ type: "success", text1: "Welcome back!" });
      router.push("/(tabs)/home"); // or your main app screen
    } catch (err) {
      console.error("Biometric login error:", err);
      Toast.show({
        type: "error",
        text1: err instanceof Error ? err.message : "Biometric login failed"
      });
    } finally {
      hideLoader();
    }
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="login"
        email={email}
        onBack={() => setShowOtpScreen(false)}
        otp_medium={otpMedium}
        password={password}
      />
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          {isDark ? (
            <Image source={images.logolight} style={styles.logo} />
          ) : (
            <Image source={images.logodark} style={styles.logo} />
          )}
          <View style={styles.userField}>
            <View style={styles.avatarBg}>
              <Image source={images.avatar} style={styles.avatar} />
            </View>

            <View>
              <ThemedText
                lightColor="#000000"
                darkColor="#ffffff"
                style={styles.heading}
              >
                Hello, {username || "Welcome back"}
              </ThemedText>
              <ThemedText
                lightColor="#9B9B9B"
                darkColor="#ffffff"
                style={styles.welcomeTxt}
              >
                Welcome back
              </ThemedText>
            </View>
          </View>

          <FormField
            placeholder={"Password"}
            handleChangeText={(value) => setPassword(value)}
            value={password}
            isIcon
            iconName="shield"
            otherStyles={{ marginTop: 20 }}
            keyboardType="default"
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

          {showBiometricIcon && (
            <View style={styles.fingerprint}>
              <Pressable
                onPress={handleBiometricLogin}
                style={({ pressed }) => [
                  styles.printBg,
                  { opacity: pressed ? 0.7 : 1 }
                ]}
              >
                <MaterialIcons name="fingerprint" size={50} color={"#2FCBF2"} />
              </Pressable>
              <ThemedText lightColor="#9B9B9B" style={{ fontSize: 14 }}>
                use fingerprint
              </ThemedText>
            </View>
          )}

          <View
            style={{
              position: "absolute",
              top: screenHeight - 200,
              left: 20,
              right: 20,
              width: "100%",
              marginTop: 7
            }}
          >
            <CustomButton
              title="Login"
              handlePress={() => setShowModal(true)}
              //handlePress={() => router.push("/(tabs)/home")}
              btnStyles={{ width: "100%" }}
              isLoading={isLoading}
              disabled={!password}
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
                <ThemedText
                  lightColor="#9B9B9B"
                  darkColor="#9B9B9B"
                  style={{ fontFamily: "Questrial" }}
                >
                  Not {username || "Jimie"}?
                </ThemedText>
                <Pressable
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                  onPress={() => router.push("/login")}
                >
                  <ThemedText
                    style={{
                      fontFamily: "Questrial",
                      fontWeight: "bold",
                      fontSize: 13,
                      color: "#218DC9",
                      textDecorationLine: "underline"
                    }}
                  >
                    Login here
                  </ThemedText>
                </Pressable>
              </View>
            </View>
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

export default IndexLogin;
