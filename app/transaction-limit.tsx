import { Image, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { styles } from "@/styles/auth";
import { Colors } from "@/constants/Colors";

const TransactionLimit = () => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;

  return (
    <SafeAreaView
      style={{ backgroundColor: bgColor, height: "100%", position: "relative" }}
    >
      <ScrollView>
        <View style={styles.container}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionLimit;
