import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageSourcePropType
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import images from "@/constants/Images";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useState } from "react";
import { PaymentOption } from "@/components/PaymentOption";
import { useFetchUserAssets } from "@/hooks/useUser";

interface FiatAccount {
  currency_label: string;
  currency_name: string;
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
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const [isLoading, setIsLoading] = useState(true);
  const boxBg = colorScheme === "dark" ? "#161622" : "#FFFFFF";
  const [showFiatModal, setShowFiatModal] = useState(false);
  const [showCryptoModal, setshowCryptoModal] = useState(false);
  const { assets } = useFetchUserAssets();

  console.log("Assets:", assets);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navigator title="Accounts" />

        <View style={styles.content}>
          {/* Fiat Accounts Section */}
          <ThemedText style={styles.sectionHeader}>FIAT CURRENCY</ThemedText>
          {isLoading
            ? assets?.fiat?.map((item: FiatAccount, index: number) => (
                <PaymentOption
                  bgColor={boxBg}
                  key={`fiat-${index}`}
                  name={item.currency_code}
                  label={item.currency_name}
                  image={fiatImages[item.currency_name] || images.logodark}
                  balance={item.balance}
                  type="fiat"
                  account_balance={item.account_balance}
                  account_name={item.account_name}
                  bank_name={item.bank_name}
                  account_number={item.account_number}
                />
              ))
            : null}

          {/* Crypto Accounts Section */}
          <ThemedText style={styles.sectionHeader}>CRYPTOCURRENCY</ThemedText>
          {isLoading
            ? assets?.crypto?.map((item: CryptoAccount, index: number) => (
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
                />
              ))
            : null}
        </View>
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
    marginTop: 10
  },
  sectionHeader: {
    color: "#999",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: "600"
  }
});
