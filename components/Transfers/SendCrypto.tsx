import { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Dimensions
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

type SendScreenProps = {
  onBack: () => void;
};

const SendMobileMoney = ({ onBack }: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;
  const screenHeight = Dimensions.get("window").height;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Navigator title="Send Cryptocurrency" onBack={onBack} />
      <View style={styles.container}>
        <FormField
          title="Address"
          handleChangeText={() => {}}
          isLeftIcon
          isIcon
          iconName="qr-code-scanner"
          onDropdownPress={() => {}}
          placeholder="Longpress to paste"
        />
        <FormField
          title="Phone Number"
          handleChangeText={() => {}}
          placeholder="123456789"
          otherStyles={{ paddingVertical: 18 }}
        />

        <View>
          <ThemedText type="default" style={{ marginLeft: 6 }}>
            Name
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
              style={[formStyles.input, { color: txtColor, fontWeight: "500" }]}
              placeholder={"Full Name"}
              placeholderTextColor={"#9B9B9B"}
              onChangeText={() => {}}
              keyboardType={"default"}
            />
          </ThemedView>
        </View>

        <CustomButton
          title="Continue"
          handlePress={() => {}}
          btnStyles={{
            position: "absolute",
            top: screenHeight - 180,
            left: 0,
            right: 0,
            width: "100%",
            marginTop: 7
          }}
        />
      </View>
    </ScrollView>
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
