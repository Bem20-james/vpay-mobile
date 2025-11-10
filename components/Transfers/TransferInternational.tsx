import {
  ScrollView,
  View,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import AssetsBottomSheet from "../BottomSheets/Assets";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useFetchUserAssets } from "@/hooks/useUser";
import CountryFlag from "react-native-country-flag";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import { useLoader } from "@/contexts/LoaderContext";
import { useRateConversion } from "@/hooks/useGeneral";
import InternationalReview from "./InternationalReviewScreen";

type AccountDetails = {
  bank: string;
  accountNumber: string;
  swiftCode?: string;
  country?: string;
};

type SendScreenProps = {
  onBack: () => void;
  title?: string;
  type?: string;
  navig?: boolean;
  accountDetails: AccountDetails;
};

const TransferInternational = ({ accountDetails }: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const { assets, loading } = useFetchUserAssets();

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<any>(null);

  const { showLoader, hideLoader } = useLoader();
  const { rate, loading: rateLoading, refetch } = useRateConversion();

  const fiatAssets = assets?.fiat || [];
  const cryptoAssets = assets?.crypto || [];
  const allAssets = [...fiatAssets, ...cryptoAssets];
  console.log("SELECTED CURRENCY:", selectedCurrency);

  // set default only after assets load
  useEffect(() => {
    if (allAssets.length > 0 && !selectedCurrency) {
      setSelectedCurrency(allAssets[0]);
    }
  }, [allAssets, selectedCurrency]);

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [loading]);

  useEffect(() => {
    const fetchConversion = async () => {
      if (amount && selectedCurrency) {
        await refetch({
          base_currency: selectedCurrency.currency_code || "",
          target_currency: "NGN", // modify this later to be dynamic
          amount: Number(amount),
          transaction_type: "transfer",
          direction: "base_to_target"
        });
      }
    };

    const delayDebounce = setTimeout(fetchConversion, 600); // debounce input

    return () => clearTimeout(delayDebounce);
  }, [amount, selectedCurrency]);

  const [showCurrencySheet, setShowCurrencySheet] = useState(false);
  const [showDetailsSheet, setDetailsShowSheet] = useState(false);

  const handlePay = () => {
    setDetailsShowSheet(false);

    router.push({
      pathname: "/(transfers)/authorization-pin",
      params: {
        transactionType: "transfer",
        account_number: accountDetails.accountNumber,
        base_asset: selectedCurrency.currency_code,
        amount
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={[styles.recipient, { backgroundColor: bgColor }]}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: Colors.light.tint, // pick a brand color
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ThemedText
              style={{
                color: "#fff",
                fontSize: 22,
                fontFamily: "Inter-Bold",
                textTransform: "uppercase"
              }}
            >
              {accountDetails?.swiftCode?.charAt(0) || "?"}
            </ThemedText>
          </View>

          <View style={{ marginLeft: 10 }}>
            <ThemedText style={styles.recipientName}>
              {accountDetails.accountNumber}
            </ThemedText>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <ThemedText
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  fontFamily: "Questrial",
                  color: "#9B9B9B"
                }}
              >
                {accountDetails.swiftCode?.toUpperCase()}
              </ThemedText>
              <ThemedText style={styles.recipientDetails}>
                {accountDetails.bank}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={[styles.inputBox, { backgroundColor: bgColor }]}>
          <ThemedText style={styles.label}>Amount</ThemedText>
          <View style={[styles.splitInput, { backgroundColor: inputBgColor }]}>
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
              Available Balance: ₦ {Number(selectedCurrency.balance).toFixed(2)}
            </ThemedText>
          )}

          {rateLoading ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5
              }}
            >
              <ActivityIndicator size="small" color={Colors.light.tint} />
              <ThemedText
                style={{
                  marginLeft: 5,
                  color: "#80D1FF",
                  fontSize: 13,
                  fontFamily: "Questrial"
                }}
              >
                Calculating rates and fees...
              </ThemedText>
            </View>
          ) : rate ? (
            <View
              style={{
                borderTopColor: "#2c404aff",
                borderTopWidth: 1,
                marginTop: 15
              }}
            >
              <ThemedText
                style={{
                  marginTop: 5,
                  color: "#80D1FF",
                  fontSize: 14,
                  fontFamily: "Questrial"
                }}
              >
                {Number(amount)} {rate?.base_currency}{" "}
                <MaterialCommunityIcons
                  name="approximately-equal"
                  size={20}
                  style={{ paddingTop: 5 }}
                />
                {Number(rate?.converted_amount ?? 0).toFixed(2)}{" "}
                {rate?.target_currency}
              </ThemedText>

              <ThemedText
                style={{
                  color: "red",
                  marginTop: 3,
                  fontFamily: "Questrial",
                  fontSize: 12
                }}
              >
                {rate?.warning}
              </ThemedText>
            </View>
          ) : null}
        </View>

        {/* Note Section */}
        <View
          style={[styles.inputBox, { backgroundColor: bgColor, marginTop: 10 }]}
        >
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
          setSelectedCurrency(currency);
          setShowCurrencySheet(false);
        }}
        selectedCurrency={selectedCurrency}
        isLoading={loading}
      />

      <InternationalReview
        amount={amount}
        accountNumber={accountDetails.accountNumber}
        conversion={rate}
        bank={accountDetails.bank}
        selectedAsset={selectedCurrency}
        description={note}
        onPay={handlePay}
      />

      <View style={{ position: "relative" }}>
        <View style={{ position: "absolute", bottom: -300, left: 0, right: 0 }}>
          <CustomButton
            title="Continue"
            handlePress={() => setDetailsShowSheet(true)}
            btnStyles={{ width: "100%" }}
            disabled={!amount || rateLoading || rate?.warning !== null}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TransferInternational;
