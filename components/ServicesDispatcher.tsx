import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import { useLoader } from "@/contexts/LoaderContext";
import ReviewBottomSheet from "@/components/BottomSheets/Review";
import ServiceOptionsField from "@/components/ServiceOptionsField";
import { ThemedText } from "./ThemedText";
import { Ionicons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { TransferStyles as styles } from "@/styles/transfers";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import getSymbolFromCurrency from "currency-symbol-map";
import AssetsBottomSheet from "./BottomSheets/Assets";
import { useFetchUserAssets } from "@/hooks/useUser";
import { useServiceOptions } from "@/hooks/useServiceOptions";

type Currency = {
  country_code?: string;
  name: string;
  currency_code?: string;
  image?: string;
  balance: number;
};

type ServicesDispatcherProps = {
  type: "data" | "electricity" | "cable";
  title?: string;
  number: string;
  provider: string;
  name?: string;
  onCurrencyChange?: (currency: Currency) => void;
};

const ServicesDispatcher = ({
  type,
  title = "Payment method",
  number,
  provider,
  name,
  onCurrencyChange
}: ServicesDispatcherProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const inputBgColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const router = useRouter();
  const { showLoader, hideLoader } = useLoader();

  // ✅ Unified API data fetch using our custom hook
  console.log("sending provider in lowercase:", provider)
  const { options, loading: optionsLoading } = useServiceOptions(type, provider);
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
        transactionType: type, // ✅ dynamic transaction type
        payload: [number, selectedCurrency, selectedAmount, provider]
      }
    });
  };

  return (
    <>
      <View style={optionsStyles.container}>
        <View
          style={[
            styles.recipient,
            { backgroundColor: bgColor, marginTop: 20 }
          ]}
        >
          <Image
            source={require("@/assets/images/adaptive-icon.png")}
            style={styles.logo}
          />
          <View>
            <ThemedText style={styles.recipientName}>{name}</ThemedText>
            <ThemedText style={styles.recipientDetails}>
              {number} {provider}
            </ThemedText>
          </View>
        </View>

        {/* ✅ Generic options component */}
        <ServiceOptionsField
          type={type}
          title={title}
          data={options}
          onSelect={(option) => setSelectedAmount(option?.amount)}
        />

        <View
          style={[styles.inputBox, { backgroundColor: bgColor, marginTop: 20 }]}
        >
          <ThemedText style={styles.label}>{"Payment Method"}</ThemedText>
          <View
            style={[
              styles.splitInput,
              styles.payMethod,
              { backgroundColor: inputBgColor }
            ]}
          >
            <View>
              <ThemedText style={optionsStyles.descTxt}>Select wallet</ThemedText>
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
              <ThemedText style={optionsStyles.descTxt}>Balance</ThemedText>
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

        <CustomButton
          title={"Continue"}
          handlePress={() => setShowReviewSheet(true)}
          btnStyles={{ marginTop: 30 }}
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
        type={"data"}
        isVisible={showReviewSheet}
        onClose={() => setShowReviewSheet(false)}
        onPay={handlePay}
        amount={selectedAmount}
        phoneNumber={number}
        provider={provider}
        rate="10"
        selectedAsset={selectedCurrency}
      />
    </>
  );
};

const optionsStyles = StyleSheet.create({
  container: {
    marginHorizontal: 7
  },
  descTxt: {
    fontFamily: "Questrial",
    fontSize: 12,
    color: "#2c404aff"
  },
});

export default ServicesDispatcher;
