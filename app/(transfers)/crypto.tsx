import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import Navigator from "@/components/Navigator";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles as formStyles } from "@/styles/formfield";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AssetsBottomSheet from "@/components/BottomSheets/Assets";
import { useFetchUserAssets } from "@/hooks/useUser";
import { useLoader } from "@/contexts/LoaderContext";

const SendCrypto = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const screenHeight = Dimensions.get("window").height;
  const router = useRouter();

  const [showCurrencySheet, setShowCurrencySheet] = useState(false);
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<any>(null);

  const { assets, loading } = useFetchUserAssets();
  const { showLoader, hideLoader } = useLoader();

  // ✅ filter only crypto assets
  const cryptoAssets = useMemo(() => assets?.crypto || [], [assets]);

  // set default token after assets load (keep as is)
  useEffect(() => {
    if (cryptoAssets.length > 0 && !selectedToken) {
      setSelectedToken(cryptoAssets[0]);
    }
  }, [cryptoAssets, selectedToken]);

  // MAX handler (set amount to selectedToken.balance)
  const handleSetMax = () => {
    if (selectedToken && typeof selectedToken.balance !== "undefined") {
      // ensure numeric -> string, remove excessive decimals if you like
      setAmount(String(selectedToken.balance));
    }
  };

  useEffect(() => {
    if (loading) {
      showLoader({ message: "Loading assets..." });
    } else {
      hideLoader();
    }
  }, [loading]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Navigator title="Send Cryptocurrency" onBack={router.back} />
        <View style={styles.container}>
          <FormField
            title="Address"
            value={address}
            handleChangeText={setAddress}
            isLeftIcon
            iconName="qr-code-scanner"
            onIconPress={() => {}}
            placeholder="Long press to paste"
          />

          <FormField
            title="Network"
            handleChangeText={() => {}}
            placeholder="Automatically match the network"
            isDropdown
          />

          <View>
            <ThemedText
              type="default"
              style={{ marginLeft: 6, marginBottom: 5 }}
            >
              Withdraw amount
            </ThemedText>
            <ThemedView
              lightColor="transparent"
              darkColor="transparent"
              style={[
                styles.inputField,
                {
                  borderColor: colorScheme === "dark" ? "#414141" : "#d7d7d7",
                  height: 45
                }
              ]}
            >
              <TextInput
                style={[
                  formStyles.input,
                  { color: txtColor, fontWeight: "500" }
                ]}
                placeholder={"Minimum 0"}
                placeholderTextColor={"#9B9B9B"}
                onChangeText={setAmount}
                value={amount}
                keyboardType={"decimal-pad"}
              />
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => setShowCurrencySheet(true)}>
                  <ThemedText style={styles.asset}>
                    {selectedToken
                      ? selectedToken?.token_symbol || selectedToken?.token_name
                      : "Select"}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSetMax}>
                  <ThemedText style={styles.amount}>{"Max"}</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>

            {selectedToken && (
              <View style={styles.btmContent}>
                <ThemedText lightColor="#687076" style={styles.btmTxt}>
                  Available
                </ThemedText>
                <ThemedText darkColor="#687076" style={styles.btmTxt}>
                  {`${selectedToken.balance ?? 0} ${
                    selectedToken.token_symbol
                  }`}
                </ThemedText>
              </View>
            )}
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => {}}
            btnStyles={{
              position: "absolute",
              top: screenHeight - 200,
              left: 10,
              right: 10,
              width: "100%",
              marginTop: 7
            }}
          />
        </View>
        // Bottom sheet usage — updated handler:
        <AssetsBottomSheet
          isVisible={showCurrencySheet}
          onClose={() => setShowCurrencySheet(false)}
          assets={{ crypto: cryptoAssets, fiat: [] }}
          onSelectCurrency={(currency) => {
            // currency is now the original crypto object from assets.crypto
            console.log("Selected currency (raw):", currency);
            setSelectedToken(currency);
            setShowCurrencySheet(false);
          }}
          selectedCurrency={selectedToken}
          isLoading={loading}
          assetType="crypto"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 7
  },
  inputField: {
    borderWidth: 0.78,
    borderRadius: 15,
    width: "100%",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  },
  actions: {
    flexDirection: "row",
    gap: 7,
    alignItems: "center"
  },
  asset: {
    fontFamily: "Inter-Bold",
    fontSize: 15
  },
  amount: {
    fontFamily: "Inter-SemiBold",
    color: Colors.dark.primary,
    fontSize: 15
  },
  btmContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 7
  },
  btmTxt: {
    fontFamily: "Questrial",
    fontSize: 12
  }
});

export default SendCrypto;
