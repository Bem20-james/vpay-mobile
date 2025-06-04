import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import CustomChip from "@/components/CustomChips";
import images from "@/constants/Images";

const methods = [
  { id: "mtn", text: "MTN", image: images.mtn },
  { id: "ninemobile", text: "9Mobile", image: images.ninemobile },
  { id: "glo", text: "Glo", image: images.glo },
  { id: "airtel", text: "Airtel", image: images.airtel }
];

const DataScreen = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor = colorScheme === "dark" ? "#000000" : "#FFFFFF";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#FFFFFF";
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
          <Navigator title="Buy Data" />
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#EEF3FB"
            style={styles.subtitle}
          >
            Find and buy better data plans
          </ThemedText>

          <CustomChip
            items={methods}
            selectedItem={selectedCategory}
            onSelect={(id) => setSelectedCategory(id)}
            containerStyle={{ marginVertical: 20 }}
          />

          <View>
            <FormField
              handleChangeText={(value) => {}}
              isDropdown
              onDropdownPress={() => {}}
              placeholder="Currency"
            />
            <FormField
              handleChangeText={(value) => {}}
              isDropdown
              onDropdownPress={() => {}}
              placeholder="Select plan"
            />
            <FormField
              placeholder={"Phone number"}
              handleChangeText={() => {}}
              otherStyles={{ marginTop: 5 }}
              keyboardType="default"
              isLeftIcon
              iconName="person"
            />
          </View>

          <CustomButton
            title={"Continue"}
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ marginTop: 50 }}
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
    lineHeight: 20
  }
});
export default DataScreen;
