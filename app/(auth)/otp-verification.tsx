import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import OTPInputField from "../../components/OtpInputField";
import Navigator from "@/components/Navigator";

const OtpVerification = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <Navigator />
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
                We have sent a code to your email
              </ThemedText>
              <Text
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  fontSize: 14,
                  color: "#218DC9"
                }}
              >
                advanztek@gmail.com
              </Text>
            </View>
          </View>

          <OTPInputField length={6} onCodeFilled={() => {}} autoFocus={true} />

          <CustomButton
            title={"Verify"}
            handlePress={() => router.push("/(auth)/login-index")}
            btnStyles={{ width: "100%", marginTop: 50 }}
          />
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
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center"
  }
});
