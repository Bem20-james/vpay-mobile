import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Dimensions,
  TouchableOpacity
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
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const SendCrypto = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const screenHeight = Dimensions.get("window").height;
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Navigator title="Send Cryptocurrency" onBack={router.back} />
        <View style={styles.container}>
          <FormField
            title="Address"
            handleChangeText={() => {}}
            isLeftIcon
            iconName="qr-code-scanner"
            onDropdownPress={() => {}}
            placeholder="Long press to paste"
          />
          <FormField
            title="Network"
            handleChangeText={() => {}}
            placeholder="Automatically match the network"
            isDropdown
          />

          <View>
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
                placeholder={"Minimum 0"}
                placeholderTextColor={"#9B9B9B"}
                onChangeText={() => {}}
                keyboardType={"default"}
              />
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => {}}>
                  <ThemedText style={styles.asset}>{"BTC"}</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <ThemedText style={styles.amount}>{"Max"}</ThemedText>
                </TouchableOpacity>
              </View>
            </ThemedView>
            <View style={styles.btmContent}>
              <ThemedText lightColor="#687076" style={styles.btmTxt}>
                Available
              </ThemedText>
              <ThemedText darkColor="#687076" style={styles.btmTxt}>
                {"1.15312595 BTC"}
              </ThemedText>
            </View>
          </View>

          <CustomButton
            title="Continue"
            handlePress={() => {}}
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
  }
});

export default SendCrypto;
