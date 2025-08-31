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
import OtpMediumModal from "@/components/OtpMediumModal";
import { getData } from "@/utils/store";
import { Colors } from "@/constants/Colors";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { useLoginWithBiometrics } from "@/hooks/useAuthentication";

const IndexLogin = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBiometricIcon, setShowBiometricIcon] = useState(false);
  const screenHeight = Dimensions.get("window").height;

  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const loginWithBiometrics = useLoginWithBiometrics();

  useEffect(() => {
    const loadLastUser = async () => {
      const result = await getData<{ username: string; email: string }>(
        "lastUser"
      );

      if (result.success && result.data) {
        const { username, email } = result.data;
        setUsername(username);
        setEmail(email);
      } else {
        console.warn("No last user data found or failed to load.");
      }
    };

    loadLastUser();
  }, []);

  useEffect(() => {
    (async () => {
      const enabled = await getData("useBiometrics");
      setShowBiometricIcon(Boolean(enabled));
    })();
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const payload = {
        email: email,
        password: password
      };
      console.log("payload", payload);

      const success = await loginWithBiometrics(payload);
      if (success) {
        setIsLoading(false);
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

  const handleBiometricLogin = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!compatible || !enrolled) {
      Toast.show({ type: "error", text1: "Biometrics not available"});
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login with Biometrics",
      fallbackLabel: "Enter password"
    });

    if (result.success) {
      // Retrieve user credentials (if stored securely)
      const storedCredentials = await getData("biometricCredentials");
      console.log("bio payload:", "got here now");

      if (
        storedCredentials?.success &&
        storedCredentials?.data?.identifier &&
        storedCredentials?.data?.password
      ) {
        console.log("bio payload:", storedCredentials);

        const payload = {
          email: storedCredentials.data.identifier,
          password: storedCredentials.data.password,
          otp_medium: "email"
        };
        console.log("bio payload:", payload);
        // Auto-login using stored credentials
        await loginWithBiometrics(payload);
      } else {
        Alert.alert("No stored credentials found");
      }
    } else {
      Alert.alert("Authentication failed", result.error ?? "Please try again");
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
                Hello {username || "Jimie"}
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
              //handlePress={() => router.push("/(tabs)/home")}
              handlePress={() => setShowModal(true)}
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
