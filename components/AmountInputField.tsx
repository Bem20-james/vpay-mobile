import { View, TextInput, Pressable, FlatList } from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import { Colors } from "@/constants/Colors";
import AssetsBottomSheet from "./BottomSheets/Assets";

type Currency = {
  code: string;
  name: string;
  flag: string;
  balance: number;
};

type InputProps = {
  currencies?: Currency[];
  defaultCurrency?: Currency;
  quickAmounts?: number[];
  title?: string;
  onBack?: () => void;
  onCurrencyChange?: (currency: Currency) => void;
  onAmountChange?: (amount: string) => void;
};

const AmountInputField = ({
  currencies = [
    { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬", balance: 1500.25 },
    { code: "GHS", name: "Ghana Cedi", flag: "🇬🇭", balance: 2000.12 },
    { code: "USD", name: "US Dollar", flag: "🇺🇸", balance: 123.45 },
  ],
  defaultCurrency,
  quickAmounts = [50, 100, 200, 500, 1000, 2000],
  title = "Airtime amount",
  onCurrencyChange,
  onAmountChange,
}: InputProps) => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [amount, setAmount] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(
    defaultCurrency || currencies[0]
  );
  const [showCurrencySheet, setShowCurrencySheet] = useState(false);

  const handleAmountChange = (val: string) => {
    setAmount(val);
    onAmountChange?.(val);
  };

  const handleQuickSelect = (val: number) => {
    setAmount(val.toString());
    onAmountChange?.(val.toString());
  };

  return (
    <View>
      <View style={[styles.inputBox, { backgroundColor: bgColor }]}>
        <ThemedText style={styles.label}>{title}</ThemedText>
        <View style={{ marginTop: 12 }}>
          <FlatList
            data={quickAmounts}
            numColumns={3}
            keyExtractor={(item) => item.toString()}
            columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10 }}
            nestedScrollEnabled={true}
            scrollEnabled={false} renderItem={({ item }) => (
              <Pressable
                onPress={() => handleQuickSelect(item)}
                style={{
                  flex: 1,
                  marginHorizontal: 4,
                  paddingVertical: 12,
                  backgroundColor: inputBgColor,
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <ThemedText style={{ color: txtColor, fontFamily: "Inter-Bold" }}>
                  {item}
                </ThemedText>
              </Pressable>
            )}
          />
        </View>
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
            onChangeText={handleAmountChange}
            keyboardType="number-pad"
            placeholder="0.00"
            placeholderTextColor="#aaaaaa"
            style={[styles.amountInput, { color: txtColor }]}
          />
        </View>

        <ThemedText style={styles.balances}>
          Balance: {selectedCurrency.flag} {selectedCurrency.balance.toFixed(2)}
        </ThemedText>
      </View>

      <AssetsBottomSheet
        isVisible={showCurrencySheet}
        onClose={() => setShowCurrencySheet(false)}
        currencies={currencies}
        onSelectCurrency={(currency) => {
          setSelectedCurrency(currency);
          setShowCurrencySheet(false);
          onCurrencyChange?.(currency);
        }}
        selectedCurrency={selectedCurrency}
      />
    </View>
  );
};

export default AmountInputField;
