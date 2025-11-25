import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import AmountInputField from "@/components/AmountInputField";
import { useFetchAirtimeProviders } from "@/hooks/useAirtimePurchase";
import * as Contacts from "expo-contacts";
import ContactsModal from "@/components/ContactsModal";
import { useLoader } from "@/contexts/LoaderContext";
import ReviewBottomSheet from "@/components/BottomSheets/Review";
import ProviderInput from "@/components/PhoneInputField";
import { useUser } from "@/contexts/UserContexts";
import { ConversionBody } from "@/components/AmountInputField";
import { useTheme } from "@/contexts/ThemeContexts";

const AirtimeScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const router = useRouter();

  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contacts, setContacts] = useState<Contacts.Contact[]>([]);
  const [isContactsModalVisible, setIsContactsModalVisible] = useState(false);
  const [showReviewSheet, setShowReviewSheet] = useState(false);

  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);
  const { providers, loading } = useFetchAirtimeProviders();
  const { showLoader, hideLoader } = useLoader();
  const { user } = useUser();
  const countryCode = user?.country?.code;
  const [currentRate, setCurrentRate] = useState<ConversionBody | any>(null);

  console.log("selected provider:", selectedProvider);
  console.log("selected currecy:", selectedCurrency);

  //Contacts fetcher
  const fetchContacts = async () => {
    try {
      showLoader();
      const { status } = await Contacts.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission denied");
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

  const handlePay = () => {
    setShowReviewSheet(false);
    router.push({
      pathname: "/(transfers)/authorization-pin",
      params: {
        transactionType: "airtime",
        payload: JSON.stringify({
          phone: phoneNumber,
          amount,
          provider: selectedProvider?.provider_name,
          base_asset: selectedProvider?.currency_code,
          target_asset: selectedCurrency?.currency_code
        })
      }
    });
  };

  const isContinueDisabled =
    !selectedProvider ||
    !phoneNumber ||
    !amount ||
    !currentRate?.converted_amount;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <Navigator title="Buy Airtime" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#EEF3FB"
          style={styles.subtitle}
        >
          Pay for airtime quick and easy
        </ThemedText>
        <View style={styles.container}>
          <ProviderInput
            value={phoneNumber}
            handleChangeText={setPhoneNumber}
            placeholder="Phone number"
            maxLength={11}
            providers={providers}
            userCountryCode={countryCode ?? ""}
            onProviderSelect={(provider) => {
              setSelectedProvider(provider);
            }}
            onContactPress={fetchContacts}
          />

          <View style={{ marginTop: 15 }}>
            <AmountInputField
              onAmountChange={(val, hasError) => {
                setAmount(val);
              }}
              onCurrencyChange={setSelectedCurrency}
              onRateChange={setCurrentRate}
            />
          </View>

          {/* Continue Button */}
          <CustomButton
            title="Continue"
            handlePress={() => setShowReviewSheet(true)}
            btnStyles={{ marginTop: 30 }}
            variant="primary"
            size="medium"
            disabled={isContinueDisabled}
          />
        </View>
      </ScrollView>

      <StatusBar style="dark" backgroundColor={statusBarBg} />

      {/* Contacts Modal */}
      <ContactsModal
        visible={isContactsModalVisible}
        onClose={() => setIsContactsModalVisible(false)}
        onSelectContact={(phone) => setPhoneNumber(phone)}
        contacts={contacts}
      />

      <ReviewBottomSheet
        type="airtime"
        isVisible={showReviewSheet}
        onClose={() => setShowReviewSheet(false)}
        onPay={handlePay}
        amount={amount}
        phoneNumber={phoneNumber}
        provider={selectedProvider?.provider_name}
        selectedAsset={selectedCurrency}
        conversion={currentRate}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7
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
    textAlign: "center"
  }
});

export default AirtimeScreen;
