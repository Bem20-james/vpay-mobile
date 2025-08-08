import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/Images";
import Navigator from "@/components/Navigator";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import CustomChip from "@/components/CustomChips";
import { Colors } from "@/constants/Colors";
import CurrencyField from "@/components/CurrencyField";

const methods = [
  { id: "1", text: "Betnaija", image: images.mtn },
  { id: "2", text: "SportBet", image: images.ninemobile },
  { id: "3", text: "BetBaba", image: images.glo },
  { id: "4", text: "PariPesa", image: images.airtel }
];

const BettingScreen = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    number | string | null
  >(null);
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Navigator title="Betting" />
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#EEF3FB"
            style={styles.subtitle}
          >
            Fund your betting wallets easily
          </ThemedText>

          <CustomChip
            items={methods}
            selectedItem={selectedCategory}
            onSelect={(id) => setSelectedCategory(id)}
            containerStyle={{ marginVertical: 20 }}
          />

          <View>
            <FormField
              placeholder={"Phone number"}
              handleChangeText={() => {}}
              keyboardType="default"
              isLeftIcon
              iconName="person"
            />

            <CurrencyField />
          </View>

          <CustomButton
            title={"Continue"}
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ marginTop: 20 }}
            variant="primary"
            size="medium"
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 15
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  scrollContent: {
    flexGrow: 1
  },
  subtitle: {
    fontFamily: "Questrial",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 15
  }
});

export default BettingScreen;
