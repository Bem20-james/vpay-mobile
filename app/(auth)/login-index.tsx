import { Image, View, ScrollView, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const IndexLogin = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

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
                Hello Advanztek
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
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ width: "100%", marginTop: 100 }}
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
                Not Advanztek?
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default IndexLogin;
