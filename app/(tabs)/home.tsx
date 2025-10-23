import React, { useState, useRef } from "react";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Text,
  Animated
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
import RecentTransaction from "@/components/Recents/RecentTransactions";
import { quickActions, billOptions } from "@/assets/data";
import { trnxHistory } from "@/assets/data";
import StickyHeader from "@/components/StickyHeader";
import OptionsBottomSheet from "@/components/BottomSheets/Options";
import { useUser } from "@/contexts/UserContexts";
import { Colors } from "@/constants/Colors";
import { useFetchUserAssets } from "@/hooks/useUser";
import { MotiView } from "moti";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Animated values for sticky header
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerTranslateY = useRef(new Animated.Value(-50)).current;
  const { user } = useUser();

  const countryCode = user?.country?.code;
  const { assets, loading } = useFetchUserAssets();
  const fiatAssets: {
    country_code?: string;
    currency_code?: string;
    balance?: number;
  }[] = assets?.fiat || [];

  const localWallet = fiatAssets.find(
    (wallet) => wallet.country_code === countryCode
  );
  const usdWallet = fiatAssets.find((wallet) => wallet.currency_code === "USD");

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (
        event: import("react-native").NativeSyntheticEvent<
          import("react-native").NativeScrollEvent
        >
      ) => {
        const offsetY = event.nativeEvent.contentOffset.y;

        if (offsetY > 60) {
          Animated.parallel([
            Animated.timing(headerOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false
            }),
            Animated.timing(headerTranslateY, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            })
          ]).start();
        } else {
          Animated.parallel([
            Animated.timing(headerOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false
            }),
            Animated.timing(headerTranslateY, {
              toValue: -50,
              duration: 200,
              useNativeDriver: false
            })
          ]).start();
        }
      }
    }
  );

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <StickyHeader
        headerOpacity={headerOpacity}
        headerTranslateY={headerTranslateY}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
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
              Hello,{" "}
              <Text style={{ fontFamily: "Inter-Bold" }}>
                {user?.firstname}
              </Text>
              {String.fromCodePoint(0x1f44b)}
            </ThemedText>
          </View>
          <View style={styles.dFlex}>
            <Pressable onPress={() => router.push("/notifications")}>
              <MaterialIcons
                name="notifications"
                size={25}
                color={colorScheme === "dark" ? "#218DC9" : "#80D1FF"}
                style={{ marginRight: 7 }}
              />
            </Pressable>
            <Pressable onPress={() => router.push("/notifications")}>
              <MaterialIcons
                name="dark-mode"
                size={25}
                color={colorScheme === "dark" ? "#218DC9" : "#80D1FF"}
              />
            </Pressable>
          </View>
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
            {loading && showBalance ? (
              <>
                {[1, 2].map((i) => (
                  <MotiView
                    key={i}
                    from={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      type: "timing",
                      duration: 800,
                      loop: true
                    }}
                    style={{
                      height: 35,
                      width: "50%",
                      borderRadius: 6,
                      backgroundColor: "#0A2D4A",
                      marginLeft: i === 1 ? 0 : 10
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                <View style={styles.actionButton}>
                  <View style={styles.dFlex}>
                    <CountryFlag
                      isoCode={localWallet?.country_code || "NG"}
                      size={15}
                      style={{ borderRadius: 3 }}
                    />
                    <ThemedText
                      lightColor="#F8F8F8"
                      darkColor="#F8F8F8"
                      style={styles.currencyCode}
                    >
                      {localWallet?.currency_code || ""}
                    </ThemedText>
                  </View>

                  <ThemedText
                    lightColor="#FFFFFF"
                    darkColor="#FFFFFF"
                    style={styles.balAmount}
                  >
                    {showBalance
                      ? `${getSymbolFromCurrency(
                          localWallet?.currency_code || ""
                        )} ${Number(
                          localWallet?.balance || 0
                        ).toLocaleString()}`
                      : "******"}
                  </ThemedText>
                </View>

                <View style={styles.border}></View>

                {/* USD wallet */}
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
                    {showBalance
                      ? `${getSymbolFromCurrency("USD")} ${Number(
                          usdWallet?.balance || 0
                        ).toLocaleString()}`
                      : "******"}
                  </ThemedText>
                </View>
              </>
            )}
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

        <View style={{ flex: 1, marginHorizontal: 10 }}>
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
