import { ScrollView, View, TextInput, Pressable, Image } from "react-native";
import React, { useState } from "react";
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

const SendScreen = ({
  onBack,
  title = "Send to local",
  accountDetails
}: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const { assets, loading } = useFetchUserAssets();
  console.log("Fetched Assets:", assets);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(assets[0]);
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
              onPress={() => setShowCurrencySheet(true)}
            >
              <ThemedText style={{ fontSize: 18 }}>
                {selectedCurrency.flag}
              </ThemedText>
              <ThemedText style={styles.currencyCode}>
                {selectedCurrency.code}
              </ThemedText>
              <Ionicons name="chevron-down" size={16} color="#aaa" />
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

          <ThemedText style={styles.balances}>
            Balance: ₦ {selectedCurrency.balance.toFixed(2)}
          </ThemedText>
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

      {/* Currency Selection */}
      <AssetsBottomSheet
        isVisible={showCurrencySheet}
        onClose={() => setShowCurrencySheet(false)}
        currencies={assets}
        onSelectCurrency={currency => {
          setSelectedCurrency(currency);
          setShowCurrencySheet(false);
        }}
        selectedCurrency={selectedCurrency}
        isLoading={loading}
      />

      {/* Review Sheet */}
      <ReviewBottomSheet
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

      {/* Continue Button */}
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
