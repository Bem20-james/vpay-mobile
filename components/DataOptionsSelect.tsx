import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { useLoader } from "@/contexts/LoaderContext";
import ReviewBottomSheet from "@/components/BottomSheets/Review";
import MobileDataField from "@/components/MobileDataField";
import { useFetchDataOptions } from "@/hooks/useDataPurchase";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { TransferStyles as styles } from "@/styles/transfers";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import getSymbolFromCurrency from "currency-symbol-map";
import AssetsBottomSheet from "./BottomSheets/Assets";
import { useFetchUserAssets } from "@/hooks/useUser";

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
  phoneNumber: string;
  provider: string;
  methodtitle?: string;
  onBack?: () => void;
  onCurrencyChange?: (currency: Currency) => void;
  onAmountChange?: (amount: string, hasError: boolean) => void;
};

const DataOptionsSelect = ({
  title = "Payment method",
  phoneNumber,
  provider,
  onCurrencyChange
}: InputProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const inputBgColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  const { options, loading: optionsLoading } = useFetchDataOptions(provider);
  const { assets, loading } = useFetchUserAssets();

  const [selectedAmount, setSelectedAmount] = useState<any>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);
  const [showReviewSheet, setShowReviewSheet] = useState(false);
  const [showCurrencySheet, setShowCurrencySheet] = useState(false);

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

  useEffect(() => {
    if (loading || optionsLoading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [loading, optionsLoading]);

  const handlePay = () => {
    setShowReviewSheet(false);
    router.push({
      pathname: "/(transfers)/authorization-pin",
      params: {
        transactionType: "airtime",
        payload: [phoneNumber, selectedCurrency, selectedAmount, provider]
      }
    });
  };

  return (
    <>
      <View style={optionsstyles.container}>
        <View
          style={[styles.inputBox, { backgroundColor: bgColor, marginTop: 20 }]}
        >
          <ThemedText style={styles.label}>{title}</ThemedText>
          <View
            style={[
              styles.splitInput,
              styles.payMethod,
              { backgroundColor: inputBgColor }
            ]}
          >
            <View>
              <ThemedText style={optionsstyles.descTxt}>Wallet</ThemedText>
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
            </View>

            <View>
              <ThemedText style={optionsstyles.descTxt}>Balance</ThemedText>
              {selectedCurrency?.balance !== undefined && (
                <ThemedText style={styles.mainBal}>
                  <ThemedText
                    style={{
                      fontFamily: "Inter-Bold",
                      fontSize: 20
                    }}
                  >
                    {getSymbolFromCurrency(
                      selectedCurrency?.currency_code ?? ""
                    )}
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
        </View>

        <MobileDataField
          bundles={options}
          onSelectBundle={(bundle) => setSelectedAmount(bundle?.amount)}
        />

        <CustomButton
          title={"Continue"}
          handlePress={() => setShowReviewSheet(true)}
          btnStyles={{ marginTop: 10 }}
          variant="primary"
          size="medium"
          disabled={!selectedAmount}
        />
      </View>

      <AssetsBottomSheet
        isVisible={showCurrencySheet}
        onClose={() => setShowCurrencySheet(false)}
        assets={assets}
        onSelectCurrency={(currency) => {
          setSelectedCurrency(currency);
          onCurrencyChange?.(currency);
          setShowCurrencySheet(false);
        }}
        selectedCurrency={selectedCurrency}
        isLoading={loading}
      />

      <ReviewBottomSheet
        type="data"
        isVisible={showReviewSheet}
        onClose={() => setShowReviewSheet(false)}
        onPay={handlePay}
        amount={selectedAmount}
        phoneNumber={phoneNumber}
        provider={provider}
        rate="10"
        selectedAsset={selectedCurrency}
      />
    </>
  );
};

const optionsstyles = StyleSheet.create({
  container: {
    marginHorizontal: 7
  },

  descTxt: {
    fontFamily: "Questrial",
    fontSize: 12,
    color: "#2c404aff"
  }
});
export default DataOptionsSelect;
