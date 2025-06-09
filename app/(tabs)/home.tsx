import React, { useState } from "react";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Text
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import images from "@/constants/Images";
import CountryFlag from "react-native-country-flag";
import getSymbolFromCurrency from "currency-symbol-map";
import { styles } from "@/styles/home";
import QuickActionsSection from "@/components/QuickAction";
import RecentTransaction from "@/components/RecentTransactions";
import { quickActions, billOptions } from "@/assets/data";
import { trnxHistory } from "@/assets/data";
import OptionsBottomSheet from "@/components/BottomSheets/options";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(false);
  const symbolNGN = getSymbolFromCurrency("NGN");
  const symbolUSD = getSymbolFromCurrency("USD");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isAddSheetVisible, setIsAddSheetVisible] = useState(false);

  const handleAddVisible =  () =>{
    setIsAddSheetVisible(true)
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <View style={styles.profileContainer}>
            <Pressable onPress={() => router.push("/profile")}>
              <View style={styles.avatarBg}>
                <Image source={images.avatar} style={styles.profileImage} />
              </View>
            </Pressable>
            <ThemedText
              lightColor="#252525"
              style={{ fontFamily: "Inter", fontSize: 15 }}
            >
              Hello, <Text style={{ fontFamily: "Inter-Bold" }}>Advanztek</Text>
              {String.fromCodePoint(0x1f44b)}
            </ThemedText>
          </View>

          <Pressable onPress={() => router.push("/notifications")}>
            <MaterialIcons
              name="notifications"
              size={25}
              color={colorScheme === "dark" ? "#218DC9" : "#80D1FF"}
            />
          </Pressable>
        </View>

        <ThemedView style={styles.balCon}>
          <View style={styles.dFlex}>
            <ThemedText
              lightColor="#80D1FF"
              darkColor="#F8F8F8"
              style={styles.balTxt}
            >
              Wallet Balance
            </ThemedText>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <MaterialIcons
                name={showBalance ? "visibility" : "visibility-off"}
                size={18}
                color="#80D1FF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.balances}>
            <View style={styles.actionButton}>
              <View style={styles.dFlex}>
                <CountryFlag
                  isoCode="NG"
                  size={15}
                  style={{ borderRadius: 5 }}
                />
                <ThemedText
                  lightColor="#F8F8F8"
                  darkColor="#F8F8F8"
                  style={styles.currencyCode}
                >
                  NGN
                </ThemedText>
              </View>

              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.balAmount}
              >
                {showBalance ? `${symbolNGN} 42,000.00` : "******"}
              </ThemedText>
            </View>

            <View style={styles.border}></View>

            <View style={styles.actionButton}>
              <View style={styles.dFlex}>
                <CountryFlag
                  isoCode="US"
                  size={15}
                  style={{ borderRadius: 5 }}
                />
                <ThemedText
                  lightColor="#F8F8F8"
                  darkColor="#F8F8F8"
                  style={styles.currencyCode}
                >
                  USD
                </ThemedText>
              </View>

              <ThemedText
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
                style={styles.balAmount}
              >
                {showBalance ? `${symbolUSD} 1,000.00` : "******"}
              </ThemedText>
            </View>
          </View>
          <View style={{ marginTop: 7 }}>
            <Pressable
              onPress={() => router.push("/accounts")}
              style={({ pressed }) => [
                styles.addBtn,
                { opacity: pressed ? 0.7 : 1 }
              ]}
            >
              <View style={styles.iconBg}>
                <Entypo name="plus" size={18} color="#2FCBF2" />
              </View>
              <ThemedText
                lightColor="#F8F8F8"
                darkColor="#F8F8F8"
                style={{ fontFamily: "Inter-Bold", fontSize: 12 }}
              >
                Add money
              </ThemedText>
            </Pressable>
          </View>
        </ThemedView>

        <View style={{ flex: 1 }}>
          <QuickActionsSection
            actions={quickActions.map((action) => {
              if (action.label === "Pay bills") {
                return {
                  ...action,
                  route: undefined,
                  onPress: () => setIsBottomSheetVisible(true)
                };
              }
              return action;
            })}
          />
        </View>

        <View style={{ flex: 1 }}>
          <RecentTransaction actions={trnxHistory} />
        </View>

        <OptionsBottomSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          data={billOptions}
          title="Pay bills"
        />
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
}
