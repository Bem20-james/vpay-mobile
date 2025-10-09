import { ScrollView, View, TextInput, Pressable, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Navigator from "@/components/Navigator";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import AssetsBottomSheet from "../BottomSheets/Assets";
import ReviewBottomSheet from "../BottomSheets/Review";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useFetchUserAssets } from "@/hooks/useUser";
import CountryFlag from "react-native-country-flag";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import { useLoader } from "@/contexts/LoaderContext"; // ✅ import loader context
import images from "@/constants/Images";

type AccountDetails = { 
  bank: string; 
  accountNumber: string; 
  name: string; 
}; 

type SendScreenProps = { 
  onBack: () => void; 
  title?: string; 
  accountDetails: AccountDetails; 
};

const SendScreen = ({ onBack, title = "Send to local", accountDetails } : SendScreenProps) => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const { assets, loading } = useFetchUserAssets();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);

  const { showLoader, hideLoader } = useLoader();

  const fiatAssets = assets?.fiat || [];
  const cryptoAssets = assets?.crypto || [];
  const allAssets = [...fiatAssets, ...cryptoAssets];

  // set default only after assets load
  useEffect(() => {
    if (allAssets.length > 0 && !selectedCurrency) {
      setSelectedCurrency(allAssets[0]);
    }
  }, [allAssets, selectedCurrency]);

  useEffect(() => {
    if (loading) {
      showLoader({ message: "Loading assets..." });
    } else {
      hideLoader();
    }
  }, [loading]);

  const [showCurrencySheet, setShowCurrencySheet] = useState(false);
  const [showDetailsSheet, setDetailsShowSheet] = useState(false);

  const handlePay = () => {
    setDetailsShowSheet(false);
    router.push("/(transfers)/authorization-pin");
  };

  return (
    <ScrollView>
      <Navigator title={title} onBack={onBack} />

      {/* Recipient Section */}
      <View style={styles.container}>
        <View style={[styles.recipientContainer, { backgroundColor: bgColor }]}>
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            style={styles.logo}
          />
          <View>
            <ThemedText style={styles.recipientName}>
              {accountDetails.name}
            </ThemedText>
            <ThemedText style={styles.recipientDetails}>
              {accountDetails.accountNumber} {accountDetails.bank}
            </ThemedText>
          </View>
        </View>

        {/* Amount Section */}
        <View style={[styles.inputBox, { backgroundColor: bgColor }]}>
          <ThemedText style={styles.label}>Amount</ThemedText>
          <View style={[styles.splitInput, { backgroundColor: inputBgColor }]}>
            <Pressable
              style={styles.currencySelector}
              onPress={() => {
                console.log("🔍 Currency selector pressed. Current:", selectedCurrency);
                setShowCurrencySheet(true);
              }}
            >
              {selectedCurrency ? (
                <>
                  <View style={styles.flagWrapper}>
                    {selectedCurrency.image ? (
                      <Image
                        source={{ uri: `${SERVER_IMAGE_URL}/${selectedCurrency.image}` }}
                        style={styles.flag}
                      />
                    ) : selectedCurrency.code ? (
                      <CountryFlag
                        isoCode={selectedCurrency.code}
                        size={20}
                        style={styles.flag}
                      />
                    ) : (
                      <Image
                        source={images.logodark}
                        style={styles.logo}
                      />
                    )}
                  </View>
                  <ThemedText style={styles.currencyCode}>
                    { selectedCurrency.currency_code ? (
                      selectedCurrency.currency_code
                    ) : (
                      selectedCurrency.code
                    )}
                  </ThemedText>
                </>
              ) : (
                <ThemedText style={styles.currencyCode}>Select</ThemedText>
              )}
              <Ionicons name="chevron-down" size={18} color="#aaa" />
            </Pressable>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="number-pad"
              placeholder="0.00"
              placeholderTextColor="#aaaaaa"
              style={[styles.amountInput, { color: txtColor }]}
            />
          </View>
            {selectedCurrency?.balance !== undefined && (
              <ThemedText style={styles.balances}>
                Balance: ₦ {Number(selectedCurrency.balance).toFixed(2)}
              </ThemedText>
            )}
        </View>

        {/* Note Section */}
        <View style={[styles.inputBox, { backgroundColor: bgColor }]}>
          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="What are you paying for? (optional)"
            placeholderTextColor="#aaaaaa"
            style={[styles.noteInput, { color: txtColor }]}
          />
        </View>
      </View>

      <AssetsBottomSheet
        isVisible={showCurrencySheet}
        onClose={() => setShowCurrencySheet(false)}
        assets={assets}
        onSelectCurrency={(currency) => {
          console.log("Selected currency:", currency);
          setSelectedCurrency(currency);
          setShowCurrencySheet(false);
        }}
        selectedCurrency={selectedCurrency}
        isLoading={loading}
      />

      {/* Review Sheet */}
      <ReviewBottomSheet
        type="transfer"
        isVisible={showDetailsSheet}
        onClose={() => setDetailsShowSheet(false)}
        onPay={handlePay}
        amount={amount}
        bank={accountDetails.bank}
        accountNumber={accountDetails.accountNumber}
        name={accountDetails.name}
        rate="5"
        selectedAsset={selectedCurrency}
      />

      <View style={{ position: "relative" }}>
        <View
          style={{ position: "absolute", bottom: -300, left: 10, right: 10 }}
        >
          <CustomButton
            title="Continue"
            handlePress={() => setDetailsShowSheet(true)}
            btnStyles={{ width: "100%" }}
            disabled={!amount}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SendScreen;
