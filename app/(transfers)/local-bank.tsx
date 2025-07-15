import { FlatList, TextInput, View, ScrollView } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import { TransferStyles as styles } from "@/styles/transfers";
import { RenderItem as renderItem } from "@/components/RenderItems";
import { styles as formStyles } from "@/styles/formfield";
import { Octicons } from "@expo/vector-icons";

const LocalBank = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();
  const txtColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";

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
            otherStyles={{ paddingVertical: 18 }}
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
                { borderColor: "#9B9B9B", height: 44 }
              ]}
            >
              <TextInput
                style={[formStyles.input, { color: txtColor, fontWeight: "700" }]}
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

          {/* Recent */}
          <FlatList
            data={beneficiaries}
            keyExtractor={(item) => item.handle}
            renderItem={renderItem}
            ListHeaderComponent={
              <ThemedText style={[styles.sectionHeader, { marginTop: 30 }]}>
                Recent Beneficiaries
              </ThemedText>
            }
          />

          <CustomButton
            title="Continue"
            handlePress={() => router.push("/")}
            btnStyles={{ marginTop: 30 }}
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default LocalBank;
