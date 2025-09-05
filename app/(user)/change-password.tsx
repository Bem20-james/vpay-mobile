import { Dimensions, View, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import Toast from "react-native-toast-message";
import OtpMediumModal from "@/components/OtpMediumModal";
import { Colors } from "@/constants/Colors";
import { useChangePwd } from "@/hooks/useAuthentication";
import Navigator from "@/components/Navigator";
import OtpVerification from "../(auth)/otp-verification";
import { useUser } from "@/contexts/UserContexts";

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
  const { user } = useUser()
  const userEmail = user?.email

  const validate = () => {
    let valid = true;
    let newErrors = { pwd: "", newPwd: "", confirmNewPwd: "" };

    if (!form.pwd) {
      newErrors.pwd = "Current password is required.";
      valid = false;
    }

    if (!form.newPwd) {
      newErrors.newPwd = "New password is required.";
      valid = false;
    } else if (form.newPwd.length < 8) {
      newErrors.newPwd = "Password must be at least 8 characters.";
      valid = false;
    } else if (!/[A-Z]/.test(form.newPwd) || !/[0-9]/.test(form.newPwd)) {
      newErrors.newPwd =
        "Password must contain at least one uppercase letter and one number.";
      valid = false;
    }

    if (!form.confirmNewPwd) {
      newErrors.confirmNewPwd = "Please confirm your new password.";
      valid = false;
    } else if (form.newPwd !== form.confirmNewPwd) {
      newErrors.confirmNewPwd = "Passwords do not match.";
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
        currentPassword: form.pwd,
        newPassword: form.newPwd,
        otp_medium: otpMedium
      };

      const success = await changePwd(payload);

      if (success) {
        setIsLoading(false);
        setShowOtpScreen(true);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Change password failed",
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
        email={userEmail}
        onBack={() => setShowOtpScreen(false)}
        otp_medium={otpMedium}
        password={form.pwd}
        newPassword={form.newPwd}
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
          <Navigator title="Change Password" />
          <View style={{ marginTop: 20 }}>
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
              Please enter your current and new password below
            </ThemedText>
          </View>

          <FormField
            placeholder={"Current Password"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, pwd: value }))
            }
            value={form.pwd}
            error={errors.pwd}
            otherStyles={{ marginTop: 10 }}
            isIcon
            iconName="shield"
          />
          <FormField
            placeholder={"New Password"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, newPwd: value }))
            }
            value={form.newPwd}
            error={errors.newPwd}
            isIcon
            iconName="shield"
          />

          <FormField
            placeholder={"Confirm New Password"}
            handleChangeText={(value) =>
              setForm((prev) => ({ ...prev, confirmNewPwd: value }))
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
