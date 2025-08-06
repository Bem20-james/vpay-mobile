import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import { KycStyles as styles } from "@/styles/kyc";
import Accounts from "../(user)/accounts";
import { Colors } from "@/constants/Colors";

const CryptoCurrency = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  return <Accounts />;
};

export default CryptoCurrency;
