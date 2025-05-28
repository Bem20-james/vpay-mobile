import { Image, View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import Navigator from "@/components/Navigator";

const ForgotPassword = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <Navigator />
        <View style={styles.container}>
          <Image source={images.logo} style={styles.logo} />
          <View style={{ marginTop: 40 }}>
            <ThemedText
              darkColor="#FFFFFF"
              lightColor="#000000"
              style={styles.heading}
            >
              Enter your email
            </ThemedText>
            <ThemedText
              darkColor="#9B9B9B"
              lightColor="#9B9B9B"
              style={styles.subtitle}
            >
              We will send you an OTP to your email address
            </ThemedText>
          </View>

          <FormField
            placeholder={"Email"}
            handleChangeText={() => {}}
            otherStyles={{ marginTop: 5 }}
            keyboardType="default"
            isIcon
            iconName="email"
          />

          <CustomButton
            title="Send OTP"
            handlePress={() => router.push("/(auth)/reset-password")}
            btnStyles={{ width: "100%", marginTop: 100 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
