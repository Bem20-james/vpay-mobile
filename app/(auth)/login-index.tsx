import { Image, View, ScrollView, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/components/styles/auth";
import { Link } from "expo-router";
import { Entypo } from "@expo/vector-icons";

const IndexLogin = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={images.logo} style={styles.logo} />

          <View>
            <Image source={images.logo} style={styles.logo} />
            <View>
              <ThemedText>Hello Advanztek</ThemedText>
              <ThemedText>Welcome back</ThemedText>
            </View>
          </View>
          <FormField
            placeholder={"Password"}
            handleChangeText={() => {}}
            otherStyles={{ marginTop: 5 }}
            keyboardType="default"
            isIcon
            iconName="shield"
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

            <ThemedText lightColor="#218DC9" style={styles.forgotPwdTxt}>
              Forgot Password?
            </ThemedText>
          </Pressable>

          <CustomButton
            title="Login"
            handlePress={() => {}}
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
                Not Advanztek?
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
                  Login here
                </ThemedText>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexLogin;
