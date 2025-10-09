import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import * as Contacts from "expo-contacts";
import ContactsModal from "@/components/ContactsModal";
import { useLoader } from "@/contexts/LoaderContext";
import ProviderInput from "@/components/PhoneInputField";
import { useFetchDataProviders } from "@/hooks/useDataPurchase";
import AirtimeDataTrnxs from "@/components/Recents/AirtimeDataTrnx";
import { airtimDataBeneficiaries, airtimeDataRecents } from "@/assets/data";
import DataOptionsSelect from "@/components/DataOptionsSelect";
import { useNavigation } from "expo-router";

const DataScreen = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const { providers, loading } = useFetchDataProviders();
  const { showLoader, hideLoader } = useLoader();
  const navigation = useNavigation();

  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [isContactsModalVisible, setIsContactsModalVisible] = useState(false);
  const [showDataBundles, setShowDataBundles] = useState(false);

  console.log("Selected Provider:", selectedProvider);

  useEffect(() => {
    if (loading) showLoader();
    else hideLoader();
  }, [loading]);

  useEffect(() => {
    if (providers && providers.length > 0 && !selectedProvider) {
      setSelectedProvider(providers[0]?.provider_name);
      console.log("Default provider set:", providers[0]);
    }
  }, [providers]);

  const fetchContacts = async () => {
    try {
      showLoader();
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        hideLoader();
        return;
      }

      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      });

      setContacts(data);
      setIsContactsModalVisible(true);
    } catch (err) {
      console.log("Error fetching contacts:", err);
    } finally {
      hideLoader();
    }
  };

  const handleContinue = () => {
    setShowDataBundles(true);
  };

  const isButtonDisabled = !phoneNumber || !selectedProvider;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navigator
          title="Buy Data"
          onBack={
            showDataBundles ? () => setShowDataBundles(false) : navigation.goBack}
        />

        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#EEF3FB"
          style={styles.subtitle}
        >
          Find and buy better data plans
        </ThemedText>
        {!showDataBundles ? (
          <View style={styles.container}>
            <ProviderInput
              value={phoneNumber}
              handleChangeText={setPhoneNumber}
              placeholder="Phone number"
              providers={providers}
              userCountryCode={"NG"}
              onProviderSelect={(provider) => {
                console.log("Selected provider:", provider);
                setSelectedProvider(provider.provider_name);
              }}
              onContactPress={fetchContacts}
            />

            <CustomButton
              title="Continue"
              handlePress={handleContinue}
              btnStyles={{ marginTop: 20 }}
              variant="primary"
              size="medium"
              disabled={isButtonDisabled}
            />

            <AirtimeDataTrnxs
              beneficiaries={airtimDataBeneficiaries}
              recents={airtimeDataRecents}
            />
          </View>
        ) : (
          <DataOptionsSelect
            phoneNumber={phoneNumber}
            provider={selectedProvider}
          />
        )}
      </ScrollView>

      <StatusBar style="dark" backgroundColor={statusBarBg} />

      <ContactsModal
        visible={isContactsModalVisible}
        onClose={() => setIsContactsModalVisible(false)}
        onSelectContact={(phone) => setPhoneNumber(phone)}
        contacts={contacts}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  safeArea: {
    flex: 1,
    marginHorizontal: 5
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
