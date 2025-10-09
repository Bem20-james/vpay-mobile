import { View, TextInput, Pressable, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import { Colors } from "@/constants/Colors";
import AssetsBottomSheet from "./BottomSheets/Assets";
import { useFetchUserAssets } from "@/hooks/useUser";
import { useLoader } from "@/contexts/LoaderContext";
import CountryFlag from "react-native-country-flag";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import getSymbolFromCurrency from "currency-symbol-map";
import { useUser } from "@/contexts/UserContexts";

type Currency = {
  country_code?: string;
  name: string;
  currency_code?: string;
  image?: string;
  balance: number;
};

type InputProps = {
  quickAmounts?: number[];
  title?: string;
  methodtitle?: string;
  onBack?: () => void;
  onCurrencyChange?: (currency: Currency) => void;
  onAmountChange?: (amount: string, hasError: boolean) => void;
};

const AmountInputField = ({
  quickAmounts = [50, 100, 200, 500, 1000, 2000],
  title = "Airtime amount",
  methodtitle = "Payment method",
  onAmountChange,
  onCurrencyChange
}: InputProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const [amount, setAmount] = useState("");
  const [selectedQuick, setSelectedQuick] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const { assets, loading } = useFetchUserAssets();
  const { user } = useUser();

  const currencySymbol = user?.country?.currency;

  const fiatAssets = assets?.fiat || [];
  const cryptoAssets = assets?.crypto || [];
  const allAssets = [...fiatAssets, ...cryptoAssets];

  useEffect(() => {
    if (allAssets?.length > 0 && !selectedCurrency) {
      setSelectedCurrency(allAssets[0]);
    }
  }, [allAssets, selectedCurrency]);

  useEffect(() => {
    if (allAssets.length > 0 && !selectedCurrency) {
      const firstAsset = allAssets[0];
      setSelectedCurrency(firstAsset);
      onCurrencyChange?.(firstAsset);
    }
  }, [allAssets, selectedCurrency]);

  const [showCurrencySheet, setShowCurrencySheet] = useState(false);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [loading]);

  const validateBalance = (val: number, currency: Currency | null) => {
    if (currency && val > currency?.balance) {
      setError("Insufficient balance. Please select another wallet.");
      onAmountChange?.(val.toString(), true);
      return false;
    }
    setError("");
    onAmountChange?.(val.toString(), false);
    return true;
  };

  const handleAmountChange = (val: string) => {
    setAmount(val);
    setSelectedQuick(null); // clear quick select when typing
    validateBalance(Number(val), selectedCurrency);
  };

  const handleQuickSelect = (val: number) => {
    setAmount(val.toString());
    setSelectedQuick(val);
    validateBalance(val, selectedCurrency);
  };

  return (
    <View>
      <View style={[styles.inputBox, { backgroundColor: bgColor }]}>
        <ThemedText style={styles.label}>{title}</ThemedText>

        {/* Quick Amounts */}
        <View style={{ marginTop: 12 }}>
          <FlatList
            data={quickAmounts}
            numColumns={3}
            keyExtractor={(item) => item.toString()}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 10
            }}
            nestedScrollEnabled
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleQuickSelect(item)}
                style={{
                  flex: 1,
                  marginHorizontal: 4,
                  paddingVertical: 12,
                  backgroundColor:
                    selectedQuick === item ? "#0A3A52" : inputBgColor,
                  borderRadius: 8,
                  borderWidth: selectedQuick === item ? 0.7 : 0,
                  borderColor: selectedQuick === item ? "#208BC9" : "none",
                  alignItems: "center"
                }}
              >
                <ThemedText
                  style={{
                    color: selectedQuick === item ? "#fff" : txtColor,
                    fontFamily: "Inter-Bold"
                  }}
                >
                  {getSymbolFromCurrency(currencySymbol ?? "")}
                  {item}
                </ThemedText>
              </Pressable>
            )}
          />
        </View>

        <View style={styles.amountArea}>
          <ThemedText
            style={{
              color: isDark ? "#fff" : "#000",
              fontFamily: "Inter-Bold",
              fontSize: 20
            }}
          >
            {getSymbolFromCurrency(currencySymbol ?? "")}
          </ThemedText>
          <TextInput
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="number-pad"
            placeholder="0.00"
            placeholderTextColor="#aaaaaa"
            style={[styles.amountInput, { color: txtColor }]}
          />
        </View>
      </View>

      <View
        style={[styles.inputBox, { backgroundColor: bgColor, marginTop: 20 }]}
      >
        <ThemedText style={styles.label}>{methodtitle}</ThemedText>
        <View style={[styles.splitInput, styles.payMethod, { backgroundColor: inputBgColor }]}>
          <Pressable
            style={styles.currencySelector}
            onPress={() => setShowCurrencySheet(true)}
          >
            {selectedCurrency ? (
              <>
                <View style={styles.flagWrapper}>
                  {selectedCurrency.image ? (
                    <Image
                      source={{
                        uri: `${SERVER_IMAGE_URL}/${selectedCurrency?.image}`
                      }}
                      style={styles.flag}
                    />
                  ) : (
                    <CountryFlag
                      isoCode={selectedCurrency?.country_code || ""}
                      size={20}
                      style={styles.flag}
                    />
                  )}
                </View>

                <ThemedText style={styles.currencyCode}>
                  {selectedCurrency?.currency_code ||
                    selectedCurrency?.country_code}
                </ThemedText>
              </>
            ) : (
              <ThemedText style={styles.currencyCode}>Select</ThemedText>
            )}
            <Ionicons name="chevron-down" size={18} color="#aaa" />
          </Pressable>
          <View>
            {selectedCurrency?.balance !== undefined && (
              <ThemedText style={styles.mainBal}>
                <ThemedText
                  style={{
                    fontFamily: "Inter-Bold",
                    fontSize: 20
                  }}
                >
                  {getSymbolFromCurrency(selectedCurrency?.currency_code ?? "")}
                </ThemedText>
                {Number(selectedCurrency?.balance).toFixed(2)}
              </ThemedText>
            )}
          </View>
        </View>

        {selectedCurrency?.balance !== undefined && (
          <ThemedText style={styles.balances}>
            Available Balance: {selectedCurrency?.currency_code || "₦"}{" "}
            {Number(selectedCurrency?.balance).toFixed(2)}
          </ThemedText>
        )}

        {error ? (
          <ThemedText
            style={{
              color: "red",
              marginTop: 3,
              fontFamily: "Questrial",
              fontSize: 12
            }}
          >
            {error}
          </ThemedText>
        ) : null}
      </View>

      <AssetsBottomSheet
        isVisible={showCurrencySheet}
        onClose={() => setShowCurrencySheet(false)}
        assets={assets}
        onSelectCurrency={(currency) => {
          setSelectedCurrency(currency);
          onCurrencyChange?.(currency);
          setShowCurrencySheet(false);
          if (amount) validateBalance(Number(amount), currency);
        }}
        selectedCurrency={selectedCurrency}
        isLoading={loading}
      />
    </View>
  );
};

export default AmountInputField;
