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
import { useColorScheme } from "@/hooks/useColorScheme.web";
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

const CableTVScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
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

  console.log("lookep up subscriber:", subscriber);
    console.log("selected provider:", selectedProvider?.provider_name);


  const prevLookupParams = useRef({ userNumber: "", provider: "" });
  const stableLookup = useCallback(lookup, []);

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

  const handleContinue = () => {
    if (!subscriber?.customerName) {
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
          title="Cable TV"
          onBack={
            showSendScreen ? () => setShowSendScreen(false) : navigation.goBack
          }
        />
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
                  { backgroundColor: bgColor, marginTop: 20 }
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

              <View style={{ marginTop: 20 }}>
                <ThemedText
                  style={{
                    marginLeft: 6,
                    fontFamily: "Questrial",
                    fontSize: 13
                  }}
                >
                  Customer Name
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
                          color: subscriber?.customerName
                            ? txtColor
                            : "#9B9B9B",
                          fontSize: subscriber?.customerName ? 15 : 12,
                          fontFamily: "Questrial",
                          fontWeight: subscriber?.customerName ? "700" : "400",
                          flex: 1
                        }
                      ]}
                      placeholder="Subscriber's name will appear here"
                      placeholderTextColor="#9B9B9B"
                      value={subscriber?.customerName ?? ""}
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

            <CustomButton
              title={"Continue"}
              handlePress={handleContinue}
              btnStyles={{
                marginTop: 32,
                opacity:
                  userNumber.length === 10 &&
                  selectedProvider &&
                  subscriber?.customerName
                    ? 1
                    : 0.6
              }}
              disabled={
                !(
                  !isLoading &&
                  userNumber.length === 10 &&
                  selectedProvider &&
                  subscriber?.customerName
                )
              }
              variant="primary"
              size="medium"
            />
          </View>
        ) : (
          <ServicesDispatcher
            type="cable"
            title="Select package"
            name={subscriber?.customerName}
            number={userNumber}
            provider={selectedProvider?.provider_name}
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
