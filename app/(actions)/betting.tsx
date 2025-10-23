import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import CustomChip from "@/components/CustomChips";
import { Colors } from "@/constants/Colors";
import { useFetchBettingProviders } from "@/hooks/useBillPayments";
import { ThemedView } from "@/components/ThemedView";
import { useLookUpBetCustomer } from "@/hooks/useBillPayments";
import { TransferStyles } from "@/styles/transfers";
import { styles as formStyles } from "@/styles/formfield";
import Toast from "react-native-toast-message";
import SendScreen from "@/components/Transfers/SendScreen";

const BettingScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;

  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [acctId, setAcctId] = useState("");

  const { betProvider, loading } = useFetchBettingProviders();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSendScreen, setShowSendScreen] = useState(false);

  const { customer, lookup } = useLookUpBetCustomer();
  const prevLookupParams = useRef({ acctId: "", provider: "" });
  const stableLookup = useCallback(lookup, []);
  const navigation = useNavigation();

  useEffect(() => {
    let isMounted = true;

    const fetchAccountName = async () => {
      if (acctId.length === 10 && selectedProvider && isMounted) {
        if (
          prevLookupParams.current.acctId === acctId &&
          prevLookupParams.current.provider === selectedProvider?.provider_name
        ) {
          return;
        }

        prevLookupParams.current = {
          acctId,
          provider: selectedProvider?.provider_name
        };

        setIsLoading(true);
        setError("");

        console.log("Looking up with:", {
          provider: selectedProvider?.provider_name,
          account: acctId
        });

        const success = await stableLookup({
          provider: selectedProvider?.provider_name,
          account: acctId
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
  }, [acctId, selectedProvider, stableLookup]);

  const handleContinue = () => {
    if (!customer?.account_name) {
      Toast.show({
        type: "error",
        text1: "Please wait for account lookup to complete"
      });
      return;
    }
    setShowSendScreen(true);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navigator
          title="Betting"
          onBack={() =>
            showSendScreen ? setShowSendScreen(false) : navigation.goBack()
          }
        />
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#EEF3FB"
          style={styles.subtitle}
        >
          Fund your betting wallets easily
        </ThemedText>
        {!showSendScreen ? (
          <View style={styles.container}>
            <CustomChip
              items={betProvider}
              selectedItem={selectedProvider?.id}
              onSelect={(provider) => setSelectedProvider(provider)}
              containerStyle={{ marginVertical: 20 }}
              isLoading={loading}
            />

            <View>
              <FormField
                placeholder={"Account ID"}
                value={acctId}
                handleChangeText={setAcctId}
                keyboardType="default"
                isIcon={true}
                iconName="person"
              />
            </View>

            <View style={{ marginTop: 10 }}>
              <ThemedText
                style={{
                  marginLeft: 6,
                  fontFamily: "Questrial",
                  fontSize: 13
                }}
              >
                Account Name
              </ThemedText>
              <ThemedView
                style={[
                  TransferStyles.inputField,
                  {
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
                  <ActivityIndicator size="small" color="#208bc9" />
                ) : (
                  <TextInput
                    style={[
                      formStyles.input,
                      {
                        color: customer?.account_name ? txtColor : "#9B9B9B",
                        fontSize: customer?.account_name ? 15 : 12,
                        fontFamily: "Questrial",
                        fontWeight: customer?.account_name ? "700" : "400",
                        flex: 1
                      }
                    ]}
                    placeholder="Account name will appear here"
                    placeholderTextColor="#9B9B9B"
                    value={customer?.account_name ?? ""}
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
                  bottom: -350,
                  left: 10,
                  right: 10
                }}
              >
                <CustomButton
                  title={"Continue"}
                  handlePress={handleContinue}
                  btnStyles={{
                    marginTop: 30,
                    opacity:
                      acctId.length === 10 &&
                      selectedProvider &&
                      customer?.account_name
                        ? 1
                        : 0.6
                  }}
                  disabled={
                    !(
                      !isLoading &&
                      acctId.length === 10 &&
                      selectedProvider &&
                      customer?.account_name
                    )
                  }
                  variant="primary"
                  size="medium"
                />
              </View>
            </View>
          </View>
        ) : (
          <SendScreen
            onBack={() => setShowSendScreen(false)}
            accountDetails={{
              accountNumber: acctId,
              bank: selectedProvider?.provider_name ?? "",
              accountName: customer?.account_name ?? ""
            }}
            navig={false}
          />
        )}
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 15
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  scrollContent: {
    flexGrow: 1
  },
  subtitle: {
    fontFamily: "Questrial",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 15
  }
});

export default BettingScreen;
