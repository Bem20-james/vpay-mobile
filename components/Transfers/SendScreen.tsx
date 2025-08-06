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

const currencies = [
  {
    code: "NGN",
    name: "Nigerian Naira",
    flag: "🇳🇬",
    balance: 1500.25
  },
  {
    code: "GHS",
    name: "Ghana Cedi",
    flag: "🇬🇭",
    balance: 2000.12
  },
  { code: "USD", name: "US Dollar", flag: "🇺🇸", balance: 123.45 }
];

const paymentData = {
  amount: "504.40",
  bank: "Opay Bank",
  accountNumber: "1236547892",
  name: "ADVANTEK TECHNOLOGIES",
  rate: "5"
};

type SendScreenProps = {
  onBack: () => void;
  title?: string;
};

const SendScreen = ({ onBack, title = "Send to local" }: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [showCurrencySheet, setShowCurrencySheet] = useState(false);
  const [showDetailsSheet, setDetailsShowSheet] = useState(false);

  const handlePay = () => {
    console.log("Payment initiated");
    setDetailsShowSheet(false);
  };

  return (
    <ScrollView>
      <Navigator title={title} onBack={onBack} />
      <View style={styles.container}>
        <View style={[styles.recipientContainer, { backgroundColor: bgColor }]}>
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            style={styles.logo}
          />
          <View>
            <ThemedText style={styles.recipientName}>
              ELISHA SONTER ADUE
            </ThemedText>
            <ThemedText style={styles.recipientDetails}>
              7015566456 OPay
            </ThemedText>
          </View>
        </View>

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
        currencies={currencies}
        onSelectCurrency={(currency) => {
          setSelectedCurrency(currency);
          setShowCurrencySheet(false);
        }}
        selectedCurrency={selectedCurrency}
      />

      <ReviewBottomSheet
        isVisible={showDetailsSheet}
        onClose={() => setDetailsShowSheet(false)}
        onPay={handlePay}
        amount={paymentData.amount}
        bank={paymentData.bank}
        accountNumber={paymentData.accountNumber}
        name={paymentData.name}
        rate={paymentData.rate}
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
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SendScreen;
