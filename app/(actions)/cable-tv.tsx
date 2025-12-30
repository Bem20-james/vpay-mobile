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
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { Colors } from "@/constants/Colors";
import ProvidersInputField from "@/components/ProvidersInputField";
import { useFetchCableTvProviders } from "@/hooks/useBillPayments";
import ProvidersBottomSheet from "@/components/BottomSheets/Providers";
import { ThemedView } from "@/components/ThemedView";
import { useLookUpTvSubscriber } from "@/hooks/useBillPayments";
import { styles as formStyles } from "@/styles/formfield";
import { TransferStyles } from "@/styles/transfers";
import Toast from "react-native-toast-message";
import ServicesDispatcher from "@/components/ServicesDispatcher";
import { useNavigation } from "expo-router";
import { useTheme } from "@/contexts/ThemeContexts";

const CableTVScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const txtColor = isDark ? Colors.light.accentBg : Colors.light.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [userNumber, setUserNumber] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { tvProviders, loading } = useFetchCableTvProviders();
  const { subscriber, lookup } = useLookUpTvSubscriber();
  const [showSendScreen, setShowSendScreen] = useState(false);
  const navigation = useNavigation();

  const prevLookupParams = useRef({ userNumber: "", provider: "" });
  const stableLookup = useCallback(lookup, []);

  console.log("SELECTED PROVIDER:", selectedProvider);

  useEffect(() => {
    let isMounted = true;

    const fetchAccountName = async () => {
      if (userNumber.length === 10 && selectedProvider && isMounted) {
        if (
          prevLookupParams.current.userNumber === userNumber &&
          prevLookupParams.current.provider === selectedProvider?.provider_name
        ) {
          return;
        }

        prevLookupParams.current = {
          userNumber,
          provider: selectedProvider?.provider_name
        };

        setIsLoading(true);
        setError("");

        const success = await stableLookup({
          provider: selectedProvider?.provider_name,
          number: userNumber
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
  }, [userNumber, selectedProvider, stableLookup]);

  console.log("SUBSCRIBER INFO:", subscriber);

  const handleContinue = () => {
    if (!subscriber?.customer_name) {
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
      <Navigator
        title="Cable TV"
        onBack={
          showSendScreen ? () => setShowSendScreen(false) : navigation.goBack
        }
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#EEF3FB"
          style={styles.subtitle}
        >
          Pay for your TV subscriptions quick and easy
        </ThemedText>
        {!showSendScreen ? (
          <View style={styles.container}>
            <View style={{ marginTop: 20 }}>
              <ProvidersInputField
                value={selectedProvider}
                placeholder="Select Cable Provider"
                onPressDropdown={() => setShowSheet(true)}
              />

              <View
                style={[
                  styles.textBox,
                  { backgroundColor: bgColor, marginTop: 10 }
                ]}
              >
                <ThemedText style={styles.title}>
                  {"Smartcard/IUC Number"}
                </ThemedText>

                <FormField
                  placeholder={"0000 0000 0000 0000"}
                  value={userNumber}
                  handleChangeText={setUserNumber}
                  otherStyles={{ marginTop: 7 }}
                  keyboardType="default"
                  isIcon
                  iconName="credit-card"
                />
              </View>

              <View
                style={[
                  TransferStyles.inputBox,
                  { backgroundColor: bgColor, marginTop: 10 }
                ]}
              >
                <View style={{ marginTop: 5, marginBottom: 10 }}>
                  <ThemedText
                    style={{
                      marginLeft: 6,
                      fontFamily: "Questrial",
                      fontSize: 13,
                      marginBottom: 10
                    }}
                  >
                    Customer Name
                  </ThemedText>
                  <ThemedView
                    lightColor="#F2F2F7"
                    darkColor="#0A2D4A"
                    style={[
                      TransferStyles.inputField,
                      {
                        borderRadius: 5,
                        elevation: 3,
                        borderColor: error
                          ? "#FF6B6B"
                          : isDark
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
                            color: subscriber?.customer_name
                              ? txtColor
                              : "#9B9B9B",
                            fontSize: subscriber?.customer_name ? 15 : 12,
                            fontFamily: "Questrial",
                            fontWeight: subscriber?.customer_name
                              ? "700"
                              : "400",
                            flex: 1
                          }
                        ]}
                        placeholder="Subscriber's name will appear here"
                        placeholderTextColor="#9B9B9B"
                        value={subscriber?.customer_name ?? ""}
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
              </View>
            </View>

            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  bottom: -340,
                  left: 0,
                  right: 0
                }}
              >
                <CustomButton
                  title={"Continue"}
                  handlePress={handleContinue}
                  btnStyles={{
                    marginTop: 30,
                    opacity:
                      userNumber.length === 10 &&
                      selectedProvider &&
                      subscriber?.customer_name
                        ? 1
                        : 0.6
                  }}
                  disabled={
                    !(
                      !isLoading &&
                      userNumber.length === 10 &&
                      selectedProvider &&
                      subscriber?.customer_name
                    )
                  }
                  variant="primary"
                  size="medium"
                />
              </View>
            </View>
          </View>
        ) : (
          <ServicesDispatcher
            type="cable"
            title="Select package"
            name={subscriber?.customer_name}
            number={userNumber}
            provider={selectedProvider?.provider_name}
            logo={selectedProvider?.image}
            targetCurrency={selectedProvider?.currency_code}
          />
        )}
      </ScrollView>

      <ProvidersBottomSheet
        isVisible={showSheet}
        onClose={() => setShowSheet(false)}
        onSelect={setSelectedProvider}
        data={tvProviders || []}
        loading={loading}
      />
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20
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
    lineHeight: 20
  },
  title: {
    color: "#9B9B9B",
    fontSize: 12,
    fontFamily: "Questrial",
    marginBottom: 3
  },
  textBox: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8
  }
});
export default CableTVScreen;
