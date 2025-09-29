import { View, TextInput, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import { Colors } from "@/constants/Colors";
import AssetsBottomSheet from "./BottomSheets/Assets";
import { useFetchUserAssets } from "@/hooks/useUser";

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

type CurrencyFieldProps = {
  onBack?: () => void;
  title?: string;
};

const CurrencyField = ({
  onBack,
  title = "Send to local"
}: CurrencyFieldProps) => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [showCurrencySheet, setShowCurrencySheet] = useState(false);

    const { assets, loading } = useFetchUserAssets();
    console.log("User Assets:", assets);

  return (
    <View>
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
    </View>
  );
};

export default CurrencyField;
