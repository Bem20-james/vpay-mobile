import { FlatList, TextInput, View, ScrollView } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import { TransferStyles as styles } from "@/styles/transfers";
import { RenderItem } from "@/components/RenderItems";
import { styles as formStyles } from "@/styles/formfield";
import { Octicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import SendScreen from "@/components/Transfers/SendScreen";

const LocalBank = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;
  const [showSendScreen, setShowSendScreen] = React.useState(false);

  const beneficiaries = [
    {
      name: "Mhembe Kelvin",
      handle: "@terdoo",
      isRecent: true
    },
    { name: "Mama Praise", handle: "@mama", isRecent: true },
    { name: "Samson Adi", handle: "@samadi", isRecent: true },
    { name: "Don Culione", handle: "@deDon", isRecent: true },
    { name: "Jimie Doe", handle: "@jimie", isRecent: true }
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar style="dark" backgroundColor={statusBarBg} />

      {!showSendScreen ? (
        <ScrollView>
          <Navigator title="Send to Local Bank" />
          <View style={styles.container}>
            <FormField
              title="Bank"
              handleChangeText={() => {}}
              isDropdown
              onDropdownPress={() => {}}
              placeholder="Select Bank"
            />
            <FormField
              title="Account Number"
              handleChangeText={() => {}}
              placeholder="123456789"
            />
            <View>
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
                  placeholder={"Tap to look up account name"}
                  placeholderTextColor={"#9B9B9B"}
                  onChangeText={() => {}}
                  keyboardType={"default"}
                />
                <View>
                  <Octicons name={"search"} size={20} color="#208BC9" />
                </View>
              </ThemedView>
            </View>

            <FlatList
              data={beneficiaries}
              keyExtractor={(item) => item.handle}
              nestedScrollEnabled={true}
              scrollEnabled={false}
              renderItem={({ item }) => <RenderItem item={item} />}
              ListHeaderComponent={
                <ThemedText style={[styles.sectionHeader, { marginTop: 30 }]}>
                  Recent Beneficiaries
                </ThemedText>
              }
            />

            <CustomButton
              title="Continue"
              handlePress={() => setShowSendScreen(true)}
              btnStyles={{ marginTop: 20 }}
            />
          </View>
        </ScrollView>
      ) : (
        <SendScreen onBack={() => setShowSendScreen(false)} />
      )}
    </SafeAreaView>
  );
};

export default LocalBank;
