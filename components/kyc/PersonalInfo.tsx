import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import { KycStyles as styles } from "@/styles/kyc";

type PersonalInfoProps = {
  onBack: () => void;
};

const PersonalInfo = ({ onBack }: PersonalInfoProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Personal Information" onBack={onBack} />
        <View style={styles.container}>
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#9B9B9B"
            style={styles.heroTxt}
          >
            We need these information to ensure a seamless service for you
          </ThemedText>

          <FormField
            placeholder={"Email Address"}
            handleChangeText={() => {}}
            otherStyles={{ marginTop: 5 }}
          />
          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <FormField
              placeholder={"First Name"}
              handleChangeText={() => {}}
              otherStyles={{ width: "50%" }}
            />
            <FormField
              placeholder={"Last Name"}
              handleChangeText={() => {}}
              otherStyles={{ width: "50%" }}
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <FormField
              placeholder={"Phone Number"}
              handleChangeText={() => {}}
              otherStyles={{ width: "50%" }}
            />
            <FormField
              placeholder={"Gender"}
              handleChangeText={() => {}}
              otherStyles={{ width: "50%" }}
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
            <FormField
              placeholder={"Marital Status"}
              handleChangeText={() => {}}
              otherStyles={{ width: "50%" }}
            />
            <FormField
              placeholder={"Occupation"}
              handleChangeText={() => {}}
              otherStyles={{ width: "50%" }}
            />
          </View>

          <FormField
            placeholder={"DOB"}
            handleChangeText={() => {}}
            otherStyles={{ marginTop: 5 }}
          />
          <FormField
            placeholder={"Country"}
            handleChangeText={() => {}}
            otherStyles={{ marginTop: 5 }}
          />
        </View>
        <View style={{ position: "relative" }}>
          <View
            style={{ position: "absolute", bottom: -200, left: 10, right: 10 }}
          >
            <CustomButton
              title="Submit"
              handlePress={() => router.push("/(tabs)/home")}
              btnStyles={{ width: "100%" }}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default PersonalInfo;
