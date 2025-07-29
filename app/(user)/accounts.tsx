import React, { useState, useRef, useMemo, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageSourcePropType,
  Dimensions
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import images from "@/constants/Images";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { PaymentOption } from "@/components/PaymentOption";
import { useFetchUserAssets } from "@/hooks/useUser";
import { MotiView } from "moti";
import AccountBottomSheet from "@/components/BottomSheets/Accounts";
import { Colors } from "@/constants/Colors";

interface FiatAccount {
  fiat_currency_label: string;
  fiat_currency_name: string;
  balance: string;
  account_balance: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  currency_code: string;
}

interface CryptoAccount {
  token_name: string;
  token_symbol: string;
  balance: string;
  address: string;
  price?: string;
}

const fiatImages: { [key: string]: ImageSourcePropType } = {
  ngn: images.glo,
  usd: images.airtel
};

const cryptoImages: { [key: string]: ImageSourcePropType } = {
  BNB: images.tether,
  USDT: images.matic
};

const Accounts: React.FC = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const boxBg = colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const { assets, loading } = useFetchUserAssets();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedItem, setSelectedItem] = useState<
    FiatAccount | CryptoAccount | null
  >(null);
  const [selectedType, setSelectedType] = useState<"fiat" | "crypto" | null>(
    null
  );

  const handleItemPress = useCallback((item: any, type: "fiat" | "crypto") => {
    setSelectedItem(item);
    setSelectedType(type);
    bottomSheetRef.current?.present();
  }, []);

  const renderSkeleton = () => (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ loop: true, type: "timing", duration: 1000 }}
      style={styles.skeletonContainer}
    >
      <View style={styles.skeletonCircle} />
      <View style={styles.skeletonLines}>
        <View style={styles.skeletonLineShort} />
        <View style={styles.skeletonLineLong} />
      </View>
    </MotiView>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navigator title="Accounts" />

        <View style={styles.content}>
          <ThemedText style={styles.sectionHeader}>FIAT CURRENCY</ThemedText>
          {loading
            ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <View key={`fiat-skeleton-${i}`}>{renderSkeleton()}</View>
                ))
            : assets?.fiat?.map((item: FiatAccount, index: number) => (
                <PaymentOption
                  bgColor={boxBg}
                  key={`fiat-${index}`}
                  name={item.fiat_currency_name}
                  label={item.fiat_currency_label}
                  image={fiatImages[item.fiat_currency_name] || images.logodark}
                  balance={item.balance}
                  type="fiat"
                  account_balance={item.account_balance}
                  account_name={item.account_name}
                  bank_name={item.bank_name}
                  account_number={item.account_number}
                  handlePress={() => handleItemPress(item, "fiat")}
                />
              ))}

          <ThemedText style={styles.sectionHeader}>CRYPTOCURRENCY</ThemedText>
          {loading
            ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <View key={`crypto-skeleton-${i}`}>{renderSkeleton()}</View>
                ))
            : assets?.crypto?.map((item: CryptoAccount, index: number) => (
                <PaymentOption
                  bgColor={boxBg}
                  key={`crypto-${index}`}
                  name={item.token_symbol}
                  label={item.token_name}
                  image={cryptoImages[item.token_name] || images.logodark}
                  balance={item.balance}
                  price={item.price}
                  type="crypto"
                  address={item.address}
                  handlePress={() => handleItemPress(item, "crypto")}
                />
              ))}
        </View>
        <AccountBottomSheet
          ref={bottomSheetRef}
          selectedItem={selectedItem}
          selectedType={selectedType}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  content: {
    marginHorizontal: 10,
  },
  sectionHeader: {
    color: "#999",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 15,
    fontFamily: "Inter-SemiBold",
    fontWeight: "600"
  },
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10
  },
  skeletonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.primaryBgDark,
    marginRight: 10
  },
  skeletonLines: {
    flex: 1
  },
  skeletonLineShort: {
    width: "40%",
    height: 10,
    backgroundColor: Colors.dark.primaryBgDark,
    marginBottom: 5
  },
  skeletonLineLong: {
    width: "80%",
    height: 10,
    backgroundColor: Colors.dark.primaryBgDark,
  }
});
