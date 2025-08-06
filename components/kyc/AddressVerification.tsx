import { View, ScrollView } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import { KycStyles as styles } from "@/styles/kyc";
import { useState } from "react";
import DocumentUpload from "./DocumentUpload";

type AddressProps = {
  onBack: () => void;
};

const AddressVerification = ({ onBack }: AddressProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);

  const [form, setForm] = useState({
    street_address: "",
    city: "",
    state: "",
    country: "",
    postal_code: ""
  });

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  if (showDocumentUpload) {
    return (
      <DocumentUpload
        loading
        onSubmit={() => {}}
        onBack={() => setShowDocumentUpload(false)}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Address Verification" onBack={onBack} />
        <View style={styles.container}>
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#9B9B9B"
            style={styles.heroTxt}
          >
            Please add your current address, we need these information to ensure
            a seamless service for you
          </ThemedText>

          <ThemedText
            style={{
              fontFamily: "Questrial",
              fontSize: 12,
              marginVertical: 10,
              color: "#D22C1F"
            }}
          >
            *Please ensure this address matches with the one on the document you
            are going to upload
          </ThemedText>
          <View style={{flexDirection: "column", gap: 20}}>
            <FormField
              handleChangeText={() => {}}
              isDropdown
              onDropdownPress={() => {}}
              placeholder="Select a country"
              isIcon
              iconName="public"
            />

            <FormField
              placeholder="State"
              value={form.state}
              handleChangeText={(value) => handleChange("state", value)}
              keyboardType="default"
            />

            <FormField
              placeholder="City"
              value={form.city}
              handleChangeText={(value) => handleChange("city", value)}
              keyboardType="default"
            />

            <FormField
              placeholder="Residential address"
              value={form.street_address}
              handleChangeText={(value) =>
                handleChange("street_address", value)
              }
              keyboardType="default"
            />

            <FormField
              placeholder="Office address (optional)"
              value={form.street_address}
              handleChangeText={(value) =>
                handleChange("street_address", value)
              }
              keyboardType="default"
            />

            <FormField
              placeholder="Postal code"
              value={form.postal_code}
              handleChangeText={(value) => handleChange("postal_code", value)}
              keyboardType="default"
            />
          </View>
        </View>
        <View style={{ position: "relative" }}>
          <View
            style={{ position: "absolute", bottom: -150, left: 10, right: 10 }}
          >
            <CustomButton
              title="Continue"
              handlePress={() => setShowDocumentUpload(true)}
              btnStyles={{ width: "100%" }}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default AddressVerification;
