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
import { Colors } from "@/constants/Colors";
import AmountInputField from "@/components/AmountInputField";
import { useFetchAirtimeProviders } from "@/hooks/useAirtimePurchase";

const DataScreen = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    number | string | null
  >(null);

  const { providers, loading } = useFetchAirtimeProviders()

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
            items={providers}
            selectedItem={selectedCategory}
            onSelect={(id) => setSelectedCategory(id)}
            containerStyle={{ marginVertical: 20 }}
                        isLoading={loading}

          />

          <View>
            <FormField
              handleChangeText={(value) => {}}
              isDropdown
              onDropdownPress={() => {}}
              placeholder="Select plan"
            />
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
    lineHeight: 20
  }
});
export default DataScreen;
