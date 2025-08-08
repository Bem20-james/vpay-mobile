import { Dimensions, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import OtpVerification from "./otp-verification";
import Toast from "react-native-toast-message";
import OtpMediumModal from "@/components/OtpMediumModal";
import { Colors } from "@/constants/Colors";
import { useChangePwd } from "@/hooks/useAuthentication";
import Navigator from "@/components/Navigator";

const ChangePassword = () => {
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
  const screenHeight = Dimensions.get("window").height;

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
        text1: "ChangePassword failed",
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

  return (
    <SafeAreaView
      style={{ backgroundColor: bgColor, height: "100%", position: "relative" }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            paddingHorizontal: 15
          }}
        >
          <Navigator />
          <View style={{ marginTop: 10 }}>
            <ThemedText
              darkColor="#FFFFFF"
              lightColor="#000000"
              style={styles.heading}
            >
              Change your account password
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
            placeholder={"Current Password"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, identifier: value }))
            }
            value={form.pwd}
            error={errors.pwd}
            otherStyles={{ marginTop: 10 }}
            keyboardType="email-address"
            isIcon
            iconName="person"
          />
          <FormField
            placeholder={"New Password"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
            value={form.newPwd}
            error={errors.newPwd}
            isIcon
            iconName="shield"
          />

          <FormField
            placeholder={"Confirm New Password"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, password: value }))
            }
            value={form.confirmNewPwd}
            error={errors.confirmNewPwd}
            isIcon
            iconName="shield"
          />

          <CustomButton
            title="Change Password"
            handlePress={() => setShowModal(true)}
            isLoading={isLoading}
            disabled={!form.pwd || !form.newPwd || !form.confirmNewPwd}
            btnStyles={{
              position: "absolute",
              top: screenHeight - 120,
              left: 10,
              right: 10,
              marginTop: 7
            }}
          />
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

export default ChangePassword;
