import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";

const Verification = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <ScrollView>
        <Navigator title="Verification" />
        <View style={styles.container}>
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#9B9B9B"
            style={styles.heroTxt}
          >
            Complete your account setup to be able to have access to unlimited
            features
          </ThemedText>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    marginHorizontal: 15,
    marginTop: 20
  },
  heroTxt: {
    fontSize: 15,
    fontFamily: "Questrial",
    textAlign: "center",
    marginBottom: 20
  }
});
