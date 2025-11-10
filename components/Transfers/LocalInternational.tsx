import { View, TextInput, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { TransferStyles } from "@/styles/transfers";
import { styles } from "./sendInternational";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { styles as formStyles } from "@/styles/formfield";
import { useLookUpUser } from "@/hooks/useTransfers";

interface Props {
  onRedirect: () => void;
  callRedirect: () => void;
  onShowBanks: () => void;
  selectedBank: any;
}

const LocalInternational = ({
  onRedirect,
  callRedirect,
  onShowBanks,
  selectedBank
}: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;

  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleRedirect = () => {
    callRedirect;
  };

  return (
    <View style={styles.container}>
      <View style={[TransferStyles.inputBox, { backgroundColor: bgColor }]}>
        <FormField
          title="Bank"
          value={selectedBank?.name || ""}
          handleChangeText={() => {}}
          placeholder="Select Bank"
          isDropdown
          onDropdownPress={onShowBanks}
        />
      </View>

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
          placeholder="0000000000"
          keyboardType="phone-pad"
          maxLength={10}
        />
      </View>

      <View
        style={[
          TransferStyles.inputBox,
          { backgroundColor: bgColor, marginTop: 20 }
        ]}
      >
        <ThemedText type="default" style={{ marginLeft: 6, marginBottom: 8 }}>
          Account Name
        </ThemedText>
        <ThemedView
          lightColor="#14547C"
          darkColor="#0A2D4A"
          style={[
            styles.inputField,
            {
              borderRadius: 5,
              borderColor: error
                ? "#FF6B6B"
                : colorScheme === "dark"
                ? "#414141"
                : "#d7d7d7",
              height: 45,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 8
            }
          ]}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#7b7b9b" />
          ) : (
            <TextInput
              style={[
                formStyles.input,
                {
                  color: acctInfo?.account_name ? txtColor : "#208bc9",
                  fontSize: acctInfo?.account_name ? 15 : 12,
                  fontFamily: "Questrial",
                  fontWeight: acctInfo?.account_name ? "700" : "400",
                  flex: 1
                }
              ]}
              placeholder="Account name will appear here"
              placeholderTextColor="#9B9B9B"
              value={acctInfo?.account_name ?? ""}
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
              marginLeft: 6
            }}
          >
            {error}
          </ThemedText>
        ) : null}
      </View>
      <View style={{ position: "relative" }}>
        <View
          style={{
            position: "absolute",
            bottom: -310,
            left: 0,
            right: 0
          }}
        >
          <CustomButton
            title="Continue"
            handlePress={handleRedirect}
            btnStyles={{
              marginTop: 32,
              opacity:
                accountNumber.length === 10 &&
                selectedBank &&
                acctInfo?.account_name
                  ? 1
                  : 0.6
            }}
            disabled={
              !(
                !isLoading &&
                accountNumber.length === 10 &&
                selectedBank &&
                acctInfo?.account_name
              )
            }
          />
        </View>
      </View>
    </View>
  );
};

export default LocalInternational;
