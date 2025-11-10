import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import CustomTab from "@/components/CustomTabs";
import TabContent from "@/components/TabContents";
import { Colors } from "@/constants/Colors";
import ProvidersInputField from "@/components/ProvidersInputField";
import ProvidersBottomSheet from "@/components/BottomSheets/Providers";
import { useFetchElectricityProviders } from "@/hooks/useBillPayments";
import Toast from "react-native-toast-message";
import { useLookUpElectricityUser } from "@/hooks/useBillPayments";
import { ThemedView } from "@/components/ThemedView";
import { styles as formStyles } from "@/styles/formfield";
import { TransferStyles } from "@/styles/transfers";
import ServicesDispatcher from "@/components/ServicesDispatcher";
import { useNavigation } from "expo-router";

const ElectricityScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [activeTab, setActiveTab] = useState("Prepaid");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [meterNumber, setMeterNumber] = useState("");

  const { powerProviders, loading } = useFetchElectricityProviders();
  const { customer, lookup } = useLookUpElectricityUser();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSendScreen, setShowSendScreen] = useState(false);
  const navigation = useNavigation();

  console.log("electricity providers:", powerProviders);

  const prevLookupParams = useRef({
    meterNumber: "",
    provider: "",
    activeTab: ""
  });
  const stableLookup = useCallback(lookup, []);

  useEffect(() => {
    let isMounted = true;

    const fetchAccountName = async () => {
      if (
        meterNumber.length === 11 &&
        selectedProvider &&
        activeTab &&
        isMounted
      ) {
        if (
          prevLookupParams.current.meterNumber === meterNumber &&
          prevLookupParams.current.provider ===
            selectedProvider?.provider_name &&
          prevLookupParams.current.activeTab === activeTab
        ) {
          return;
        }

        prevLookupParams.current = {
          meterNumber,
          provider: selectedProvider?.provider_name,
          activeTab
        };

        setIsLoading(true);
        setError("");

        const success = await stableLookup({
          provider: selectedProvider?.provider_name,
          number: meterNumber,
          type: activeTab
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
  }, [meterNumber, selectedProvider, stableLookup]);

  const handleContinue = () => {
    if (!customer?.customerName) {
      Toast.show({
        type: "error",
        text1: "Please wait for account lookup to complete"
      });
      return;
    }
    setShowSendScreen(true);
  };

  console.log("METER TYPE:", activeTab);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <Navigator
        title="Electricity"
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
          Top up your prepaid or postpaid meters with ease
        </ThemedText>
        {!showSendScreen ? (
          <View style={styles.container}>
            <CustomTab
              tabs={["Prepaid", "Postpaid"]}
              onTabChange={setActiveTab}
            />

            <TabContent activeTab={activeTab} tabKey="Prepaid">
              <View style={{ marginTop: 20 }}>
                <ProvidersInputField
                  value={selectedProvider}
                  placeholder="Select Electricity Provider"
                  onPressDropdown={() => setShowSheet(true)}
                />

                <View
                  style={[
                    styles.textBox,
                    { backgroundColor: bgColor, marginTop: 20 }
                  ]}
                >
                  <ThemedText style={styles.title}>{"Meter Number"}</ThemedText>

                  <FormField
                    placeholder={"0000 0000 0000 0000"}
                    value={meterNumber}
                    handleChangeText={setMeterNumber}
                    otherStyles={{ marginTop: 7 }}
                    maxLength={11}
                    keyboardType="default"
                    isIcon
                    iconName="electric-meter"
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
                            color: customer?.customerName
                              ? txtColor
                              : "#9B9B9B",
                            fontSize: customer?.customerName ? 15 : 12,
                            fontFamily: "Questrial",
                            fontWeight: customer?.customerName ? "700" : "400",
                            flex: 1
                          }
                        ]}
                        placeholder="customer's name will appear here"
                        placeholderTextColor="#9B9B9B"
                        value={customer?.customerName ?? ""}
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
            </TabContent>

            <TabContent activeTab={activeTab} tabKey="Postpaid">
              <View style={{ marginTop: 10 }}>
                <FormField
                  placeholder={"Meter Number"}
                  handleChangeText={() => {}}
                  otherStyles={{ marginTop: 15 }}
                  keyboardType="default"
                  isIcon
                  iconName="electric-meter"
                />
              </View>
            </TabContent>

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
                  title={"Continue"}
                  handlePress={handleContinue}
                  btnStyles={{
                    marginTop: 32,
                    opacity:
                      showSendScreen &&
                      meterNumber.length === 11 &&
                      selectedProvider &&
                      customer?.customerName
                        ? 1
                        : 0.6
                  }}
                  disabled={
                    showSendScreen &&
                    !(
                      !isLoading &&
                      meterNumber.length === 11 &&
                      selectedProvider &&
                      customer?.customerName
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
            type="electricity"
            title="Select package"
            name={customer?.customerName}
            number={meterNumber}
            provider={selectedProvider?.provider_name}
            logo={selectedProvider?.image}
            targetCurrency={selectedProvider?.currency_code}
            meterType={activeTab.toUpperCase()}
          />
        )}
      </ScrollView>

      <ProvidersBottomSheet
        isVisible={showSheet}
        onClose={() => setShowSheet(false)}
        onSelect={setSelectedProvider}
        data={powerProviders || []}
        loading={loading}
      />
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 7
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
export default ElectricityScreen;
