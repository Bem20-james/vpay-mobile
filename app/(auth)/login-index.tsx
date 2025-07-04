import { Image, View, ScrollView, Pressable } from "react-native";
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
import OtpVerification from "./otp-verification";
import { useLogin } from "@/hooks/useAuthentication";
import Toast from "react-native-toast-message";
import OtpMediumModal from "@/components/OtpMediumModal";
import { getData } from "@/utils/store";
import { User } from "@/contexts/UserContexts";

const IndexLogin = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpMedium, setOtpMedium] = useState<"email" | "sms" | "authenticator">(
    "email"
  );
  const login = useLogin();
  const [showModal, setShowModal] = useState(false);
  const [lastUser, setLastUser] = useState<User | null>(null);
  console.log("Last User:", lastUser);

  useEffect(() => {
    const loadLastUser = async () => {
      try {
        const email = await getData("lastUser");
        if (!email) return;
        console.log("Loading last user with email:", email);

        const userData = await getData("user_" + email);
        console.log("Loaded User Data:", userData);
        if (userData) {
          setLastUser(userData);
        }
      } catch (error) {
        console.error("Error loading last user:", error);
      }
    };
    loadLastUser();
  }, []);

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="login"
        email={lastUser?.email}
        onBack={() => setShowOtpScreen(false)}
        otp_medium={otpMedium}
        password={password}
      />
    );
  }

  const handleSubmit = async (method: "email" | "sms" | "authenticator") => {
    setOtpMedium(method);

    if (method === "authenticator") {
      setShowOtpScreen(true);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email: lastUser?.email,
        password: password,
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

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          {colorScheme === "dark" ? (
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
                Hello {lastUser?.username || "Jimie"}
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
            error={errors.password}
            isIcon
            iconName="shield"
            otherStyles={{ marginTop: 5 }}
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

          <View style={styles.fingerprint}>
            <Pressable
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

          <CustomButton
            title="Login"
            //handlePress={() => router.push("/(tabs)/home")}
            handlePress={() => setShowModal(true)}
            btnStyles={{ width: "100%", marginTop: 100 }}
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
                Not {lastUser?.username || "Jimie"}?
              </ThemedText>
              <Pressable
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                onPress={() => router.push("/login")}
              >
                <ThemedText
                  style={{
                    fontFamily: "Questrial",
                    fontWeight: "bold",
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
