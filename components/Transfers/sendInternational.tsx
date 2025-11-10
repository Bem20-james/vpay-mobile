import { useState, useRef, useCallback, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { SendScreenProps } from "@/types/transfers";
import { TransferStyles } from "@/styles/transfers";
import TransferInternational from "./TransferInternational";
import { useLookUpUser } from "@/hooks/useTransfers";
import LocalInternational from "./LocalInternational";
import BanksBottomSheet from "../BottomSheets/Banks";
import { useFetchBanks } from "@/hooks/useGeneral";
import { useUser } from "@/contexts/UserContexts";

const SendInternational = ({ onBack, selectedCountry }: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [showSendScreen, setShowSendScreen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBanksSheet, setShowBanksSheet] = useState(false);

  const hasMobileMoney = selectedCountry?.mobile_money === true;
  const { user } = useUser();

  const countryCode = user?.country?.code ?? "NG";
  const {
    banks,
    loading: banksLoading,
    refetch
  } = useFetchBanks(selectedCountry?.country_code);

  const { acctInfo, lookup } = useLookUpUser();
  const prevLookupParams = useRef({ accountNumber: "", bankCode: "" });
  const stableLookup = useCallback(lookup, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAccountName = async () => {
      if (accountNumber.length === 10 && selectedBank && isMounted) {
        if (
          prevLookupParams.current.accountNumber === accountNumber &&
          prevLookupParams.current.bankCode === selectedBank.code
        ) {
          return;
        }

        prevLookupParams.current = {
          accountNumber,
          bankCode: selectedBank.code
        };

        setIsLoading(true);
        setError("");

        const success = await stableLookup({
          bank_code: selectedBank.code,
          account_number: accountNumber
        });

        if (!success) {
          setError("Account not found");
        }
        setIsLoading(false);
      }
    };

    fetchAccountName();

    return () => {
      isMounted = false;
    };
  }, [accountNumber, selectedBank, stableLookup]);

  const handleBankSelect = (bank: { name: string; code: string }) => {
    setSelectedBank(bank);
    setShowBanksSheet(false);
    setError("");
  };

  const handleShowTransfer = () => {
    setShowSendScreen(true);
  };

  return (
    <>
      <Navigator title="Send International" onBack={onBack} />
      {!showSendScreen ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {!hasMobileMoney ? (
            <View style={styles.container}>
              <View
                style={[
                  TransferStyles.inputBox,
                  { backgroundColor: bgColor, marginTop: 10 }
                ]}
              >
                <FormField
                  title="Account Number"
                  value={accountNumber}
                  handleChangeText={setAccountNumber}
                  placeholder="00000000000"
                  maxLength={10}
                />
              </View>
              <View
                style={[
                  TransferStyles.inputBox,
                  { backgroundColor: bgColor, marginTop: 10 }
                ]}
              >
                <FormField
                  title="Bank"
                  value={selectedBank?.name || ""}
                  handleChangeText={() => {}}
                  placeholder="Select Bank"
                  isDropdown
                  onDropdownPress={() => setShowBanksSheet(true)}
                />
              </View>
              <View
                style={[
                  TransferStyles.inputBox,
                  { backgroundColor: bgColor, marginTop: 10 }
                ]}
              >
                <FormField
                  title="Swift Code"
                  value={swiftCode}
                  handleChangeText={setSwiftCode}
                  placeholder="Enter swift code"
                />
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
                    title="Continue"
                    handlePress={handleShowTransfer}
                    btnStyles={{
                      marginTop: 32,
                      opacity:
                        accountNumber.length === 10 && swiftCode ? 1 : 0.6
                    }}
                  />
                </View>
              </View>
            </View>
          ) : (
            <LocalInternational
              callRedirect={() => setShowSendScreen(!showSendScreen)}
              onRedirect={() => {}}
              onShowBanks={() => setShowBanksSheet(true)}
              selectedBank={selectedBank}
            />
          )}

          <BanksBottomSheet
            isVisible={showBanksSheet}
            onClose={() => setShowBanksSheet(false)}
            data={banks as any[]}
            onSelect={handleBankSelect}
            isLoading={banksLoading}
          />
        </ScrollView>
      ) : (
        <TransferInternational
          onBack={() => setShowSendScreen(false)}
          accountDetails={{
            accountNumber,
            bank: selectedBank?.name ?? "",
            swiftCode
          }}
        />
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 7
  },
  inputField: {
    borderBottomWidth: 1,
    width: "100%",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center"
  }
});

export default SendInternational;
