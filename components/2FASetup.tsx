import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
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
import QRCode from "react-native-qrcode-svg";

interface Props {
  showBack?: () => void;
  title?: string;
}

const Setup2FAScreen: React.FC<Props> = ({ showBack, title }) => {
  const { setup2FA, data2FA } = useSetup2FA();
  const { enable2FA } = useEnable2FA();
  const { user } = useUser();
  const email = user?.email;
  const [showOtpScreen, setShowOtpScreen] = useState(false);

  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const isDark = colorScheme === "dark";

  // Fetch setup data on mount
  useEffect(() => {
    if (!email) {
      Toast.show({ type: "error", text1: "User email not found" });
      return;
    }
    setup2FA({ email });
  }, [email]);

  const handleEnable = async () => {
    if (!data2FA?.secret) {
      Toast.show({ type: "error", text1: "Secret is missing" });
      return;
    }

    const payload = { secret: data2FA.secret, email };
    try {
      await enable2FA(payload);
      Toast.show({ type: "success", text1: "2FA Enabled Successfully!" });
    } catch (err: any) {
      Toast.show({ type: "error", text1: err.message || "Invalid code" });
    }
  };

  const handleCopy = async () => {
    if (data2FA?.secret) {
      console.log(data2FA?.secret)
      await Clipboard.setStringAsync(data2FA.secret);
      Toast.show({ type: "success", text1: "Copied to clipboard" });
    }
  };

  if (showOtpScreen && data2FA?.secret) {
    return (
      <OtpVerification
        mode="setup-2fa"
        email={email}
        onBack={() => setShowOtpScreen(false)}
        otp_medium="authenticator"
        secret={data2FA.secret}
      />
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView style={{ paddingHorizontal: 7 }} showsVerticalScrollIndicator={false}>
        <Navigator onBack={showBack} title={title} />
        <View style={styles.container}>
          <ThemedText style={{ fontFamily: "Inter-Bold", fontSize: 15, paddingVertical: 5 }}>
            Scan this QR with your Authenticator App
          </ThemedText>

          {data2FA?.qrCodeUrl && (
            <View
              style={[
                styles.customContent,
              ]}
            >
              <View style={styles.qrContainer}>
                <QRCode
                  value={data2FA.qrCodeUrl}
                  size={200}
                  color="#000000"
                  backgroundColor="#ffffff"
                />
              </View>
            </View>
          )}

          <ThemedText style={{ fontFamily: "Questrial", fontSize: 12, marginTop: 5 }}>
            Or enter this secret manually:
          </ThemedText>

          <View style={styles.bgBx}>
            <View style={styles.icon}>
              <ThemedText>{data2FA?.secret ?? "Loading..."}</ThemedText>
              <TouchableOpacity onPress={handleCopy}>
                <MaterialIcons name="content-copy" size={25} color={"#208BC9"} />
              </TouchableOpacity>
            </View>
          </View>

          <CustomButton
            title="Enable 2FA"
            handlePress={() => setShowOtpScreen(true)}
            btnStyles={{ width: "100%", marginTop: 20 }}
          />
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bgBx: {
    backgroundColor: Colors.dark.primaryDark2,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 6,
  },
  customContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 6,
  },
  qrContainer: {
    padding: 30,
    margin: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#208BC9",
    alignItems: "center",
  },
});

export default Setup2FAScreen;
