import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
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
import { TransferStyles } from "@/styles/transfers";
import ScanQrCodeModal from "@/components/ScanQrCodeModal";
import SendCryptoReview from "@/components/Transfers/SendCryptoReview";

const dummyNetworks = ["Mainnet", "Testnet", "Sepolia"];

const SendCrypto = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const router = useRouter();

  const [showCurrencySheet, setShowCurrencySheet] = useState(false);
  const [cryptoDetailsSheet, setCryptoDetailsSheet] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [selectedToken, setSelectedToken] = useState<any>(null);

  const { assets, loading } = useFetchUserAssets();
  const { showLoader, hideLoader } = useLoader();

  const cryptoAssets = useMemo(() => assets?.crypto || [], [assets]);

  useEffect(() => {
    if (cryptoAssets.length > 0 && !selectedToken) {
      setSelectedToken(cryptoAssets[0]);
    }
  }, [cryptoAssets, selectedToken]);

  const handleSetMax = () => {
    if (selectedToken && typeof selectedToken.balance !== "undefined") {
      setAmount(String(selectedToken.balance));
    }
  };

  useEffect(() => {
    if (loading) showLoader();
    else hideLoader();
  }, [loading]);

  const isContinueDisabled = !amount || !network || !address;
  console.log("SELECTED NETWORK:", network)

  const handleConfirm = () => {
    setCryptoDetailsSheet(false);

    router.push({
      pathname: "/(transfers)/authorization-pin",
      params: {
        transactionType: "crypto",
        payload: JSON.stringify({
          receiver: address,
          amount,
          token: selectedToken?.token_symbol || "",
          network: network.toLowerCase()
        })
      }
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {!cryptoDetailsSheet ? (
        <>
          <Navigator title="Send Cryptocurrency" onBack={router.back} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <View
                style={[TransferStyles.inputBox, { backgroundColor: bgColor }]}
              >
                <FormField
                  title="Address"
                  value={address}
                  handleChangeText={setAddress}
                  isLeftIcon
                  iconName="qr-code-scanner"
                  onIconPress={() => setShowScanner(true)}
                  placeholder="Scan or paste wallet address"
                />
              </View>

              <View
                style={[
                  TransferStyles.inputBox,
                  { backgroundColor: bgColor, marginTop: 10 }
                ]}
              >
                <TouchableOpacity
                  onPress={() => setShowDropdown(!showDropdown)}
                >
                  <FormField
                    title="Network"
                    value={network}
                    handleChangeText={() => {}}
                    placeholder="Select network"
                    editable={false}
                    isDropdown
                    onDropdownPress={() => setShowDropdown(!showDropdown)}
                  />
                </TouchableOpacity>
                {showDropdown && (
                  <View style={styles.dropdownContainer}>
                    {dummyNetworks.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setNetwork(item);
                          setShowDropdown(false);
                        }}
                      >
                        <ThemedText>{item}</ThemedText>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View
                style={[
                  TransferStyles.inputBox,
                  { backgroundColor: bgColor, marginTop: 10 }
                ]}
              >
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
                      borderColor:
                        colorScheme === "dark" ? "#414141" : "#d7d7d7",
                      height: 45
                    }
                  ]}
                >
                  <TextInput
                    style={[
                      formStyles.input,
                      { color: txtColor, fontWeight: "500" }
                    ]}
                    placeholder="Minimum 0"
                    placeholderTextColor="#9B9B9B"
                    onChangeText={setAmount}
                    value={amount}
                    keyboardType="phone-pad"
                  />
                  <View style={styles.actions}>
                    <TouchableOpacity
                      onPress={() => setShowCurrencySheet(true)}
                    >
                      <ThemedText style={styles.asset}>
                        {selectedToken
                          ? selectedToken?.token_symbol ||
                            selectedToken?.token_name
                          : "Select"}
                      </ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSetMax}>
                      <ThemedText style={styles.amount}>Max</ThemedText>
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

              <View style={{ position: "relative" }}>
                <View
                  style={{
                    position: "absolute",
                    bottom: -280,
                    left: 0,
                    right: 0
                  }}
                >
                  <CustomButton
                    title="Continue"
                    handlePress={() => setCryptoDetailsSheet(true)}
                    btnStyles={{ width: "100%" }}
                    disabled={isContinueDisabled}
                  />
                </View>
              </View>
            </View>

            <ScanQrCodeModal
              visible={showScanner}
              onClose={() => setShowScanner(false)}
              onScan={(data) => setAddress(data)}
            />

            <AssetsBottomSheet
              isVisible={showCurrencySheet}
              onClose={() => setShowCurrencySheet(false)}
              assets={{ crypto: cryptoAssets, fiat: [] }}
              onSelectCurrency={(currency) => {
                setSelectedToken(currency);
                setShowCurrencySheet(false);
              }}
              selectedCurrency={selectedToken}
              isLoading={loading}
              assetType="crypto"
            />
          </ScrollView>
        </>
      ) : (
        <SendCryptoReview
          amount={amount}
          address={address}
          network={network}
          selectedAsset={selectedToken}
          onConfirm={handleConfirm}
          onBack={() => setCryptoDetailsSheet(false)}
        />
      )}
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
  },
  dropdownContainer: {
    backgroundColor: Colors.dark.background,
    borderRadius: 10,
    marginTop: 5,
    padding: 5
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10
  }
});

export default SendCrypto;
