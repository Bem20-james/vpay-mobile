import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import Navigator from "@/components/Navigator";
import { useRouter, Router } from "expo-router";
import images from "@/constants/Images";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useState } from "react";

interface FiatAccount {
  currency_label: string;
  currency_name: string;
  balance: string;
  account_balance: string;
  account_name: string;
  bank_name: string;
  account_number: string;
}

interface CryptoAccount {
  token: string;
  token_label: string;
  balance: string;
  address: string;
}

const fiatData: FiatAccount[] = [
  {
    currency_label: "NGN",
    currency_name: "ngn",
    balance: "₦0.00",
    account_balance: "₦0.00",
    account_name: "John Doe",
    bank_name: "Example Bank",
    account_number: "1234567890"
  },
  {
    currency_label: "USD",
    currency_name: "usd",
    balance: "$0.00",
    account_balance: "$0.00",
    account_name: "John Doe",
    bank_name: "Example Bank",
    account_number: "0987654321"
  }
];

const cryptoData: CryptoAccount[] = [
  {
    token: "BNB",
    token_label: "Binance Coin",
    balance: "0.0000 BNB",
    address: "0x1234567890abcdef"
  },
  {
    token: "USDT",
    token_label: "Tether",
    balance: "0.0000 USDT",
    address: "0xabcdef1234567890"
  }
];

const fiatImages: { [key: string]: ImageSourcePropType } = {
  ngn: images.glo,
  usd: images.airtel
};

const cryptoImages: { [key: string]: ImageSourcePropType } = {
  BNB: images.tether,
  USDT: images.matic
};

interface PaymentOptionProps {
  name: string;
  label: string;
  image: ImageSourcePropType;
  balance: string;
  type: "fiat" | "crypto";
  address?: string;
  account_balance?: string;
  account_name?: string;
  bank_name?: string;
  account_number?: string;
  bgColor?: string;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({
  name,
  label,
  image,
  balance,
  type,
  address,
  account_balance,
  account_name,
  bank_name,
  account_number,
  bgColor
}) => {
  const router: Router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.optionContainer, { backgroundColor: bgColor }]}
      onPress={() =>
        router.push({
          pathname: type === "fiat" ? "/" : "/",
          params: {
            name,
            label,
            balance,
            address,
            account_balance,
            account_name,
            bank_name,
            account_number
          }
        })
      }
    >
      <Image source={image} style={styles.icon} />
      <View style={styles.textContainer}>
        <ThemedText
          lightColor="#000000"
          darkColor="#F5F5F5"
          style={styles.accountText}
        >
          {name}
        </ThemedText>
        <ThemedText style={styles.optionDescription}>{label}</ThemedText>
      </View>
      <ThemedText>{balance}</ThemedText>
      <ThemedText style={styles.arrow}>
        <MaterialIcons name="chevron-right" size={30} color="#218DC9" />
      </ThemedText>
    </TouchableOpacity>
  );
};

const Accounts: React.FC = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const [isLoading, setIsLoading] = useState(true);
  const boxBg = colorScheme === "dark" ? "#161622" : "#FFFFFF";

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
            ? fiatData.map((item, index) => (
                <PaymentOption
                  bgColor={boxBg}
                  key={`fiat-${index}`}
                  name={item.currency_label}
                  label={item.currency_name}
                  image={fiatImages[item.currency_name] || images.logo}
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
            ? cryptoData.map((item, index) => (
                <PaymentOption
                  bgColor={boxBg}
                  key={`crypto-${index}`}
                  name={item.token}
                  label={item.token_label}
                  image={cryptoImages[item.token] || images.logo}
                  balance={item.balance}
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
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: "contain",
    borderRadius: 20
  },
  textContainer: {
    flex: 1,
    gap: 5
  },
  accountText: {
    fontSize: 16,
    fontWeight: "500"
  },
  optionDescription: {
    fontSize: 12,
    textTransform: "capitalize" as const
  },
  arrow: {
    fontSize: 18,
    color: "#999"
  }
});
