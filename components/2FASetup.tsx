import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
  StyleSheet
} from "react-native";
import { useSetup2FA, useEnable2FA } from "@/hooks/useAuthentication";
import Toast from "react-native-toast-message";
import { useUser } from "@/contexts/UserContexts";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./Navigator";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "./ThemedText";
import CustomButton from "./CustomButton";
import { MaterialIcons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import OtpVerification from "@/app/(auth)/otp-verification";

interface Props {
  showBack?: () => void;
  title?: string;
}

const Setup2FAScreen: React.FC<Props> = ({ showBack, title }) => {
  const { setup2FA } = useSetup2FA();
  const { enable2FA } = useEnable2FA();
  const { user } = useUser();
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const email = user?.email;
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;

  useEffect(() => {
    (async () => {
      try {
        if (!email) throw new Error("User email not found");

        const response = await setup2FA({ email });
        console.log("2fa res:", response)
        if (response) {
          setQrCode(response?.qrCodeUrl);
          setSecret(response?.secret);
        }
      } catch (err: any) {
        Toast.show({ type: "error", text1: err.message || "Setup failed" });
      }
    })();
  }, []);

  const handleEnable = async () => {
    const payload = { secret: token, email: email };
    try {
      await enable2FA(payload);
      Toast.show({ type: "success", text1: "2FA Enabled Successfully!" });
    } catch (err: any) {
      Toast.show({ type: "error", text1: err.message || "Invalid code" });
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(secret ?? "");
    Toast.show({ type: "success", text1: "Copied to clipboard" });
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="login"
        email={email}
        onBack={() => setShowOtpScreen(false)}
        otp_medium={"authenticator"}
        secret={secret ?? ""}
      />
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView
        style={{ paddingHorizontal: 7 }}
        showsVerticalScrollIndicator={false}
      >
        <Navigator onBack={showBack} title={title} />
        <View style={styles.container}>
          <ThemedText style={{ fontFamily: "Inter-Bold", fontSize: 15 }}>
            Scan this QR with your Authenticator App
          </ThemedText>
          {qrCode && (
            <Image
              source={{ uri: qrCode }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <ThemedText style={{ fontFamily: "Questrial", fontSize: 12 }}>
            Or enter this secret manually:
          </ThemedText>
          <View style={styles.icon}>
            <ThemedText>{secret}</ThemedText>
            <MaterialIcons
              name="content-copy"
              size={20}
              color={"#208BC9"}
              onPress={handleCopy}
            />
          </View>

          <CustomButton
            title="Enable 2FA"
            handlePress={handleEnable}
            btnStyles={{ width: "100%", marginTop: 10 }}
          />
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  value: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    marginBottom: 5
  }
});

export default Setup2FAScreen;
