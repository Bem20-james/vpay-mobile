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

const LocalBank = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Local Bank" />
        <View style={styles.container}></View>

      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default LocalBank;
