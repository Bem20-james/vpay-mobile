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
import CustomTab from "@/components/CustomTabs";
import TabContent from "@/components/TabContents";
import { Colors } from "@/constants/Colors";
import ProvidersInputField from "@/components/ProvidersInputField";
import ProvidersBottomSheet from "@/components/BottomSheets/Providers";
import { useFetchElectricityProviders } from "@/hooks/useBillPayments";

const ElectricityScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Prepaid");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);

  const { powerProviders, loading } = useFetchElectricityProviders();
  console.log("electricity providers:", powerProviders);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navigator title="Electricity" />
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#EEF3FB"
          style={styles.subtitle}
        >
          Top up your prepaid or postpaid meters with ease
        </ThemedText>
        <View style={styles.container}>
          <CustomTab
            tabs={["Prepaid", "Postpaid"]}
            onTabChange={setActiveTab}
          />

            <TabContent activeTab={activeTab} tabKey="Prepaid">

            <View style={{ marginTop: 20 }}>
              <ProvidersInputField
                value={selectedProvider}
                placeholder="Select Electricity Provider"
                onPressDropdown={() => setShowSheet(true)}
              />

              <FormField
                placeholder={"Smartcard/IUC Number"}
                handleChangeText={() => {}}
                otherStyles={{ marginTop: 15 }}
                keyboardType="default"
                isIcon
                iconName="credit-card"s
              />
            </View>
          </TabContent>

            <TabContent activeTab={activeTab} tabKey="Postpaid">

            <View style={{ marginTop: 10 }}>
              <ProvidersInputField
                value={selectedProvider}
                placeholder="Select Cable Provider"
                onPressDropdown={() => setShowSheet(true)}
              />

              <FormField
                placeholder={"Smartcard/IUC Number"}
                handleChangeText={() => {}}
                otherStyles={{ marginTop: 15 }}
                keyboardType="default"
                isIcon
                iconName="credit-card"
              />
            </View>
          </TabContent>

          <CustomButton
            title={"Continue"}
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ marginTop: 20 }}
            variant="primary"
            size="medium"
          />
        </View>
      </ScrollView>

      <ProvidersBottomSheet
        isVisible={showSheet}
        onClose={() => setShowSheet(false)}
        onSelect={setSelectedProvider}
        data={powerProviders || []}
        loading={loading}
      />
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 7
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
