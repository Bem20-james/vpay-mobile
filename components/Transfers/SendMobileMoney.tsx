import { useState, useEffect } from "react";
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

const SendMobileMoney = ({ onBack, selectedCountry }: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [showSendScreen, setShowSendScreen] = useState(false);
  const screenHeight = Dimensions.get("window").height;

  const [accountNumber, setAccountNumber] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showSheet, setShowSheet] = useState(false);

  const { loading, operators, refetch } = useMobileMoneyOperators();

    useEffect(() => {
    if (selectedCountry) {
      refetch(selectedCountry);
    }
  }, [selectedCountry]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#007BFF" size="large" />
        <ThemedText style={{ marginTop: 10 }}>Loading mobile money operators...</ThemedText>
      </View>
    );
  }

  console.log("Selected country:", selectedCountry);

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
                value={accountNumber}
                handleChangeText={setAccountNumber}
                placeholder="00000000000"
              />
            </View>

            <View style={{ marginTop: 20 }}>
              <ThemedText type="default" style={{ marginLeft: 6 }}>
                Account Name
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
                  placeholder={"Full Name"}
                  placeholderTextColor={"#9B9B9B"}
                  onChangeText={() => {}}
                  keyboardType={"default"}
                />
              </ThemedView>
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
            accountNumber: accountNumber,
            bank: selectedProvider?.name ?? "",
            accountName: "accountName" // Placeholder, replace with actual name when mobile money lookup APIs are resolved available
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
