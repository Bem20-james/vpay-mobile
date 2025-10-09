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
import images from "@/constants/Images";
import { Colors } from "@/constants/Colors";
import ProvidersInputField from "@/components/ProvidersInputField";
import { useFetchCableTvProviders } from "@/hooks/useBillPayments";
import ProvidersBottomSheet from "@/components/BottomSheets/Providers";

const CableTVScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const router = useRouter();

  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);

  const { tvProviders, loading } = useFetchCableTvProviders();
  console.log("cable tv providers:", tvProviders);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navigator title="Cable TV" />
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#EEF3FB"
          style={styles.subtitle}
        >
          Pay for your TV subscriptions quick and easy
        </ThemedText>
        <View style={styles.container}>

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
        data={tvProviders || []}
        loading={loading}
      />
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20
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
export default CableTVScreen;
