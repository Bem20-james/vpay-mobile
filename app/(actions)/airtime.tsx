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
import AmountInputField from "@/components/AmountInputField";
import { useFetchAirtimeProviders } from "@/hooks/useAirtimePurchase";

const methods = [
  { id: "mtn", text: "MTN", image: images.mtn },
  { id: "ninemobile", text: "9Mobile", image: images.ninemobile },
  { id: "glo", text: "Glo", image: images.glo },
  { id: "airtel", text: "Airtel", image: images.airtel }
];

const AirtimeScreen = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    number | string | null
  >(null);

  const { providers, loading} = useFetchAirtimeProviders()
  console.log("res providers:", providers)

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Navigator title="Buy Airtime" />
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#EEF3FB"
            style={styles.subtitle}
          >
            Pay for airtime quick and easy
          </ThemedText>

          <CustomChip
            items={providers}
            selectedItem={selectedCategory}
            onSelect={(id) => setSelectedCategory(id)}
            containerStyle={{ marginVertical: 20 }}
            isLoading={loading}
          />

          <View>
            <FormField
              placeholder={"Phone number"}
              handleChangeText={() => {}}
              keyboardType="default"
              isLeftIcon
              iconName="person"
            />
            <AmountInputField />
          </View>

          <CustomButton
            title={"Continue"}
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ marginTop: 10 }}
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
export default AirtimeScreen;
