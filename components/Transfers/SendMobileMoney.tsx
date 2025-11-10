import { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles as formStyles } from "@/styles/formfield";
import SendScreen from "./SendScreen";
import { SendScreenProps } from "@/types/transfers";
import { useMobileMoneyOperators } from "@/hooks/useGeneral";
import ProvidersInputField from "../ProvidersInputField";
import ProvidersBottomSheet from "../BottomSheets/Providers";
import { TransferStyles } from "@/styles/transfers";
import { useLoader } from "@/contexts/LoaderContext";
import { useLookUpMobileMoneyUser } from "@/hooks/useTransfers";

const SendMobileMoney = ({ onBack, selectedCountry }: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const screenHeight = Dimensions.get("window").height;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showSendScreen, setShowSendScreen] = useState(false);
  const { loading, operators, refetch } = useMobileMoneyOperators();
  const { showLoader, hideLoader } = useLoader();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { acctInfo, lookup } = useLookUpMobileMoneyUser();

  useEffect(() => {
    if (selectedCountry) {
      refetch(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (loading) {
      showLoader();
    } else {
      hideLoader();
    }
  }, [loading]);

  // Avoid duplicate lookups
  const prevLookupParams = useRef({
    phoneNumber: "",
    provider_code: "",
    currency: ""
  });
  const stableLookup = useCallback(lookup, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAccountName = async () => {
      if (phoneNumber.length === 10 && selectedProvider && isMounted) {
        if (
          prevLookupParams.current.phoneNumber === phoneNumber &&
          prevLookupParams.current.provider_code === selectedProvider.code &&
          prevLookupParams.current.currency === selectedProvider.country_code //update this to currency_code when APIs ready
        ) {
          return;
        }

        prevLookupParams.current = {
          phoneNumber,
          provider_code: selectedProvider.provider_code,
          currency: selectedProvider.country_code //update this to currency_code when APIs ready
        };

        setIsLoading(true);
        setError("");

        const success = await stableLookup({
          provider_code: selectedProvider.provider_code,
          phone: phoneNumber,
          currency: selectedProvider.country_code //update this to currency_code when APIs ready
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
  }, [phoneNumber, selectedProvider, stableLookup]);

  return (
    <React.Fragment>
      {!showSendScreen ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Navigator title="Mobile Money" onBack={onBack} />
          <View style={styles.container}>
            <ProvidersInputField
              value={selectedProvider}
              placeholder="Select Mobile Money Provider"
              onPressDropdown={() => setShowSheet(true)}
            />

            <View
              style={[
                TransferStyles.inputBox,
                { backgroundColor: bgColor, marginTop: 20 }
              ]}
            >
              <FormField
                title="Phone Number"
                value={phoneNumber}
                handleChangeText={setPhoneNumber}
                placeholder="00000000000"
              />
            </View>
            <View
              style={[
                TransferStyles.inputBox,
                { backgroundColor: bgColor, marginTop: 20 }
              ]}
            >
              <ThemedText
                type="default"
                style={{ marginLeft: 6, marginBottom: 8 }}
              >
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

            <CustomButton
              title="Continue"
              handlePress={() => setShowSendScreen(true)}
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
        </ScrollView>
      ) : (
        <SendScreen
          title="Send to mobile money"
          accountDetails={{
            accountNumber: phoneNumber,
            bank: selectedProvider?.name ?? "",
            accountName: "accountName"
          }}
          onBack={() => setShowSendScreen(false)}
        />
      )}
      <ProvidersBottomSheet
        isVisible={showSheet}
        onClose={() => setShowSheet(false)}
        onSelect={setSelectedProvider}
        data={operators || []}
        loading={loading}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
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

export default SendMobileMoney;
