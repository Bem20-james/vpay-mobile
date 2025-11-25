import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { useNavigation } from "expo-router";
import ServicesDispatcher from "@/components/ServicesDispatcher";
import { useUser } from "@/contexts/UserContexts";
import { useTheme } from "@/contexts/ThemeContexts";

const DataScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;

  const { providers, loading } = useFetchDataProviders();
  const { showLoader, hideLoader } = useLoader();
  const navigation = useNavigation();

  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [selectedProviderLogo, setSelectedProviderLogo] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [isContactsModalVisible, setIsContactsModalVisible] = useState(false);
  const [showDataBundles, setShowDataBundles] = useState(false);
  const { user } = useUser();
  const countryCode = user?.country?.code;
  const [targetCurrency, setTargetCurrency] = useState<any>(null);

  useEffect(() => {
    if (loading) showLoader();
    else hideLoader();
  }, [loading]);

  useEffect(() => {
    if (providers && providers.length > 0 && !selectedProvider) {
      setSelectedProvider(providers[0]?.provider_name);
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

  const isButtonDisabled =
    !phoneNumber || phoneNumber.length !== 11 || !selectedProvider;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <Navigator
        title="Buy Data"
        onBack={
          showDataBundles ? () => setShowDataBundles(false) : navigation.goBack
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
              userCountryCode={countryCode ?? ""}
              maxLength={11}
              onProviderSelect={(provider) => {
                setSelectedProvider(provider.provider_name);
                setSelectedProviderLogo(provider.image);
                setTargetCurrency(provider.currency_code);
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
          <ServicesDispatcher
            type="data"
            title="Select Bundle"
            name={""}
            logo={selectedProviderLogo}
            number={phoneNumber}
            provider={selectedProvider}
            targetCurrency={targetCurrency}
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
