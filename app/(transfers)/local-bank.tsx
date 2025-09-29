import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import SendScreen from "@/components/Transfers/SendScreen";
import BanksBottomSheet from "@/components/BottomSheets/Banks";
import { RenderItem } from "@/components/RenderItems";
import { TransferStyles as styles } from "@/styles/transfers";
import { styles as formStyles } from "@/styles/formfield";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useFetchNgnBanks } from "@/hooks/useGeneral";
import { useLookUpUser } from "@/hooks/useTransfers";

const LocalBank = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;

  // State
  const [showSendScreen, setShowSendScreen] = useState(false);
  const [showBanksSheet, setShowBanksSheet] = useState(false);

  const [accountNumber, setAccountNumber] = useState("");
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { banks, loading: banksLoading } = useFetchNgnBanks();
  const { acctInfo, lookup } = useLookUpUser();

  console.log("Acct information:", acctInfo);

  // Avoid duplicate lookups
  const prevLookupParams = useRef({ accountNumber: "", bankCode: "" });
  const stableLookup = useCallback(lookup, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAccountName = async () => {
      if (
        accountNumber.length === 10 &&
        selectedBank &&
        isMounted
      ) {
        if (
          prevLookupParams.current.accountNumber === accountNumber &&
          prevLookupParams.current.bankCode === selectedBank.code
        ) {
          return; // avoid duplicate lookup
        }

        prevLookupParams.current = {
          accountNumber,
          bankCode: selectedBank.code,
        };

        setIsLoading(true);
        setError("");
        setAccountName("");

        const success = await stableLookup({
          bank_code: selectedBank.code,
          account_number: accountNumber,
        });

        console.log("Lookup success:", success, acctInfo);
        if (success) {
          setAccountName(acctInfo?.account_name ?? "");
        } else {
          setError("Account not found");
        }

        setIsLoading(false);
      }
    };

    fetchAccountName();

    return () => {
      isMounted = false;
    };
  }, [accountNumber, selectedBank, stableLookup, acctInfo]);

  const handleBankSelect = (bank: { name: string; code: string }) => {
    setSelectedBank(bank);
    setShowBanksSheet(false);
    setAccountName("");
    setError("");
  };

  const handleContinue = () => {
    if (!accountName) {
      Alert.alert("Error", "Please wait for account lookup to complete");
      return;
    }

    setShowSendScreen(true);
  };

  const beneficiaries = [
    { name: "Mhembe Kelvin", handle: "@terdoo", isRecent: true, frequency: 1 },
    { name: "Mama Praise", handle: "@mama", isRecent: true, frequency: 1 },
    { name: "Samson Adi", handle: "@samadi", isRecent: true, frequency: 1 },
    { name: "Don Culione", handle: "@deDon", isRecent: true, frequency: 1 },
    { name: "Jimie Doe", handle: "@jimie", isRecent: true, frequency: 1 },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar style="dark" backgroundColor={statusBarBg} />

      {!showSendScreen ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Navigator title="Send to Local Bank" />
          <View style={styles.container}>
            <FormField
              title="Account Number"
              value={accountNumber}
              handleChangeText={setAccountNumber}
              placeholder="1234567890"
              keyboardType="phone-pad"
              maxLength={10}
            />

            {/* Bank */}
            <FormField
              title="Bank"
              value={selectedBank?.name || ""}
              handleChangeText={() => { }}
              placeholder="Select Bank"
              isDropdown
              onDropdownPress={() => setShowBanksSheet(true)}
            />

            {/* Account Name */}
            <View style={{ marginTop: 16 }}>
              <ThemedText
                type="default"
                style={{ marginLeft: 6, marginBottom: 8 }}
              >
                Account Name
              </ThemedText>
              <ThemedView
                style={[
                  styles.inputField,
                  {
                    borderColor: error
                      ? "#FF6B6B"
                      : colorScheme === "dark"
                        ? "#414141"
                        : "#d7d7d7",
                    height: 45,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 8,
                  },
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#7b7b9b" />
                ) : (
                  <TextInput
                    style={[
                      formStyles.input,
                      {
                        color: accountName ? txtColor : "#9B9B9B",
                        fontSize: accountName ? 15 : 12,
                        fontFamily: "Questrial",
                        fontWeight: accountName ? "600" : "400",
                        flex: 1,
                      },
                    ]}
                    placeholder="Account name will appear here"
                    placeholderTextColor="#9B9B9B"
                    value={accountName}
                    editable={false}
                  />
                )}
              </ThemedView>

              {error ? (
                <ThemedText
                  style={{
                    color: "#FF6B6B",
                    fontSize: 12,
                    marginTop: 4,
                    marginLeft: 6,
                  }}
                >
                  {error}
                </ThemedText>
              ) : null}
            </View>

            {/* Continue Button */}
            <CustomButton
              title="Continue"
              handlePress={handleContinue}
              btnStyles={{
                marginTop: 32,
                opacity: accountNumber.length === 10 &&
                  selectedBank &&
                  accountName
                  ? 1
                  : 0.6,
              }}
              disabled={
                !(accountNumber.length === 10 && selectedBank && accountName)
              }
            />

            {/* Recent Beneficiaries */}
            <FlatList
              data={beneficiaries}
              keyExtractor={(item) => item.handle}
              nestedScrollEnabled
              scrollEnabled={false}
              renderItem={({ item }) => <RenderItem item={item} />}
              ListHeaderComponent={
                <ThemedText style={[styles.sectionHeader, { marginTop: 30 }]}>
                  Recent Beneficiaries
                </ThemedText>
              }
            />
          </View>
            <BanksBottomSheet
              isVisible={showBanksSheet}
              onClose={() => setShowBanksSheet(false)}
              data={banks}
              onSelect={handleBankSelect}
              isLoading={banksLoading}
            />
        </ScrollView>
      ) : (
        <SendScreen 
          onBack={() => setShowSendScreen(false)}
          accountDetails={{
            accountNumber,
            bank: selectedBank?.name ?? "",
            name: accountName,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default LocalBank;
