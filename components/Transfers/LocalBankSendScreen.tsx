import { ScrollView, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import { Feather } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";

const LocalBankSendScreen = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Vpay tag" />
        <View style={styles.container}>
          {/* send */}
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={20}
              color="#9B9B9B"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="@VpayTag"
              placeholderTextColor="#9B9B9B"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default LocalBankSendScreen;
