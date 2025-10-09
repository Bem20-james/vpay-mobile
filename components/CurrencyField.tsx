import { View, TextInput, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import { Colors } from "@/constants/Colors";
import AssetsBottomSheet from "./BottomSheets/Assets";
import { useFetchUserAssets } from "@/hooks/useUser";

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
