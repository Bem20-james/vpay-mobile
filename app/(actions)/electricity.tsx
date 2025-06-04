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
import CustomTab from "@/components/CustomTabs";
import TabContent from "@/components/TabContents";

const methods = [
  { id: "mtn", text: "DSTV", image: images.dstv },
  { id: "ninemobile", text: "GOTV", image: images.gotv },
  { id: "glo", text: "SHOWMAX", image: images.showmax }
];

const ElectricityScreen = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor = colorScheme === "dark" ? "#000000" : "#FFFFFF";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#FFFFFF";
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Airtime");

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Navigator title="Electricity" />
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#EEF3FB"
            style={styles.subtitle}
          >
            Top up your prepaid or postpaid meters with ease
          </ThemedText>

          <CustomTab
            tabs={["Prepaid", "Postpaid"]}
            onTabChange={setActiveTab}
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
              placeholder="Select plan power company"
            />
            <FormField
              placeholder={"Meter number"}
              handleChangeText={() => {}}
              otherStyles={{ marginTop: 5 }}
              keyboardType="phone-pad"
              isIcon
              iconName="developer-board"
            />
            <FormField
              placeholder={"Amount"}
              handleChangeText={() => {}}
              otherStyles={{ marginTop: 5 }}
              keyboardType="phone-pad"
              isIcon
              iconName="bolt"
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
export default ElectricityScreen;
