import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { swapStyles } from "@/styles/swap";
import { useTheme } from "@/contexts/ThemeContexts";
import { useFetchUserAssets } from "@/hooks/useUser";
import CurrencySelectionModal from "@/components/SwapModal";

interface CryptoAsset {
  token_symbol: string;
  token_name: string;
  balance: number;
  token_image?: string;
  price: number;
  wallet_address: string;
  status: string;
}

interface FiatAsset {
  currency_code: string;
  fiat_currency_name: string;
  balance: number | null;
  rate: string;
  bank: string;
  account_number: string;
  country_code: string;
}

type SelectedAsset = {
  symbol: string;
  name: string;
  balance: number;
  image?: string;
  type: "crypto" | "fiat";
  price?: number;
};

const SwapScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const cardBg = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const cardTxt = isDark ? Colors.dark.text : Colors.light.text;

  const { assets, loading } = useFetchUserAssets();

  // Modal states
  const [fromModalVisible, setFromModalVisible] = useState(false);
  const [toModalVisible, setToModalVisible] = useState(false);

  // Selected assets with default values
  const [fromAsset, setFromAsset] = useState<SelectedAsset>({
    symbol: "ETH",
    name: "Ethereum",
    balance: 0,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    type: "crypto",
    price: 3057.58
  });

  const [toAsset, setToAsset] = useState<SelectedAsset>({
    symbol: "BNB",
    name: "BNB",
    balance: 0,
    image: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    type: "crypto",
    price: 898.34
  });

  // Input values
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return undefined;
    // Adjust this base URL to match your API's image serving URL
    const baseUrl = "https://your-api-domain.com/"; // Update this!
    return `${baseUrl}${imagePath}`;
  };

  const handleSelectFromAsset = (
    asset: CryptoAsset | FiatAsset,
    type: "crypto" | "fiat"
  ) => {
    if (type === "crypto") {
      const cryptoAsset = asset as CryptoAsset;
      setFromAsset({
        symbol: cryptoAsset.token_symbol,
        name: cryptoAsset.token_name,
        balance: cryptoAsset.balance,
        image: getImageUrl(cryptoAsset.token_image),
        type: "crypto",
        price: cryptoAsset.price
      });
    } else {
      const fiatAsset = asset as FiatAsset;
      setFromAsset({
        symbol: fiatAsset.currency_code,
        name: fiatAsset.fiat_currency_name,
        balance: fiatAsset.balance ?? 0,
        type: "fiat",
        price: parseFloat(fiatAsset.rate)
      });
    }
    // Clear amounts when changing currency
    setFromAmount("");
    setToAmount("");
  };

  const handleSelectToAsset = (
    asset: CryptoAsset | FiatAsset,
    type: "crypto" | "fiat"
  ) => {
    if (type === "crypto") {
      const cryptoAsset = asset as CryptoAsset;
      setToAsset({
        symbol: cryptoAsset.token_symbol,
        name: cryptoAsset.token_name,
        balance: cryptoAsset.balance,
        image: getImageUrl(cryptoAsset.token_image),
        type: "crypto",
        price: cryptoAsset.price
      });
    } else {
      const fiatAsset = asset as FiatAsset;
      setToAsset({
        symbol: fiatAsset.currency_code,
        name: fiatAsset.fiat_currency_name,
        balance: fiatAsset.balance ?? 0,
        type: "fiat",
        price: parseFloat(fiatAsset.rate)
      });
    }
    // Recalculate if there's an amount
    if (fromAmount) {
      calculateToAmount(fromAmount);
    }
  };

  const calculateToAmount = (amount: string) => {
    if (!amount || isNaN(parseFloat(amount))) {
      setToAmount("");
      return;
    }

    const fromValue = parseFloat(amount);
    const fromPrice = fromAsset.price ?? 1;
    const toPrice = toAsset.price ?? 1;

    // Convert to USD equivalent then to target currency
    const usdValue = fromValue * fromPrice;
    const convertedValue = usdValue / toPrice;

    setToAmount(convertedValue.toFixed(6));
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    calculateToAmount(value);
  };

  const handleSwapAssets = () => {
    const tempAsset = fromAsset;
    setFromAsset(toAsset);
    setToAsset(tempAsset);

    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleUseMax = () => {
    if (fromAsset.balance > 0) {
      const maxAmount = fromAsset.balance.toString();
      setFromAmount(maxAmount);
      calculateToAmount(maxAmount);
    }
  };

  const cryptoAssets = assets?.crypto || [];
  const fiatAssets = assets?.fiat || [];

  return (
    <SafeAreaView
      style={[swapStyles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <ScrollView>
        <View style={swapStyles.container}>
          <ThemedText
            lightColor="#000000"
            darkColor="#FFFFFF"
            style={swapStyles.sectionTitle}
          >
            Swap
          </ThemedText>
          <ThemedText style={swapStyles.subtitle}>
            Convert cash from one currency to another.
          </ThemedText>

          <View style={{ position: "relative", marginBottom: 24 }}>
            {/* FROM */}
            <View style={[swapStyles.card, { backgroundColor: cardBg }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <ThemedText darkColor="#EEF3FB" style={swapStyles.label}>
                  From
                </ThemedText>

                <TouchableOpacity onPress={handleUseMax}>
                  <ThemedText style={swapStyles.useMax}>Use Max</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={swapStyles.cardFlx}>
                <View>
                  <TextInput
                    style={[swapStyles.input, { color: cardTxt }]}
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor={cardTxt}
                    value={fromAmount}
                    onChangeText={handleFromAmountChange}
                  />
                  <ThemedText style={swapStyles.usdEqv}>
                    Balance:{" "}
                    {fromAsset.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: fromAsset.type === "crypto" ? 6 : 2
                    })}
                  </ThemedText>
                </View>

                <TouchableOpacity
                  style={swapStyles.tokenSelector}
                  onPress={() => setFromModalVisible(true)}
                  activeOpacity={0.7}
                >
                  {fromAsset.image ? (
                    <Image
                      source={{ uri: fromAsset.image }}
                      style={swapStyles.tokenImage}
                    />
                  ) : (
                    <View
                      style={[
                        swapStyles.tokenImage,
                        {
                          backgroundColor: cardBg,
                          justifyContent: "center",
                          alignItems: "center"
                        }
                      ]}
                    >
                      <ThemedText style={{ fontSize: 14, fontWeight: "600" }}>
                        {fromAsset.symbol.substring(0, 2)}
                      </ThemedText>
                    </View>
                  )}
                  <View style={{ marginLeft: 8 }}>
                    <ThemedText style={swapStyles.tokenSymbol}>
                      {fromAsset.symbol.toUpperCase()}
                    </ThemedText>
                    <ThemedText style={swapStyles.tokenName}>
                      {fromAsset.name}
                    </ThemedText>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={30}
                    color="#208BC9"
                    style={{ marginLeft: "auto" }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSwapAssets}
              activeOpacity={0.8}
              style={swapStyles.switchContainer}
            >
              <MaterialCommunityIcons
                name="swap-vertical"
                size={28}
                color="#208BC9"
              />
            </TouchableOpacity>

            <View
              style={[
                swapStyles.card,
                { backgroundColor: cardBg, marginTop: 20 }
              ]}
            >
              <ThemedText darkColor="#EEF3FB" style={swapStyles.label}>
                To
              </ThemedText>
              <View style={swapStyles.cardFlx}>
                <View>
                  <TextInput
                    style={[swapStyles.input, { color: cardTxt }]}
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor={cardTxt}
                    value={toAmount}
                    editable={false}
                  />
                  <ThemedText style={swapStyles.usdEqv}>
                    Balance:{" "}
                    {toAsset.balance.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: toAsset.type === "crypto" ? 6 : 2
                    })}
                  </ThemedText>
                </View>

                <TouchableOpacity
                  style={swapStyles.tokenSelector}
                  onPress={() => setToModalVisible(true)}
                  activeOpacity={0.7}
                >
                  {toAsset.image ? (
                    <Image
                      source={{ uri: toAsset.image }}
                      style={swapStyles.tokenImage}
                    />
                  ) : (
                    <View
                      style={[
                        swapStyles.tokenImage,
                        {
                          backgroundColor: cardBg,
                          justifyContent: "center",
                          alignItems: "center"
                        }
                      ]}
                    >
                      <ThemedText style={{ fontSize: 14, fontWeight: "600" }}>
                        {toAsset.symbol.substring(0, 2)}
                      </ThemedText>
                    </View>
                  )}
                  <View style={{ marginLeft: 8 }}>
                    <ThemedText style={swapStyles.tokenSymbol}>
                      {toAsset.symbol.toUpperCase()}
                    </ThemedText>
                    <ThemedText style={swapStyles.tokenName}>
                      {toAsset.name}
                    </ThemedText>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={30}
                    color="#208BC9"
                    style={{ marginLeft: "auto" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <View
              style={{
                position: "absolute",
                bottom: -300,
                left: 0,
                right: 0
              }}
            >
              <CustomButton
                title={"Continue"}
                handlePress={() => {}}
                btnStyles={{
                  width: "100%",
                  marginTop: 20
                }}
                disabled={!fromAmount || parseFloat(fromAmount) <= 0}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Currency Selection Modals */}
      <CurrencySelectionModal
        visible={fromModalVisible}
        onClose={() => setFromModalVisible(false)}
        cryptoAssets={cryptoAssets}
        fiatAssets={fiatAssets}
        onSelectAsset={handleSelectFromAsset}
        title="Select Currency (From)"
      />

      <CurrencySelectionModal
        visible={toModalVisible}
        onClose={() => setToModalVisible(false)}
        cryptoAssets={cryptoAssets}
        fiatAssets={fiatAssets}
        onSelectAsset={handleSelectToAsset}
        title="Select Currency (To)"
      />

      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={backgroundColor}
      />
    </SafeAreaView>
  );
};

export default SwapScreen;
