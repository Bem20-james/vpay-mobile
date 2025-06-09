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
import { ThemedView } from "@/components/ThemedView";
import { MaterialIcons } from "@expo/vector-icons";
import Navigator from "@/components/Navigator";
import { useRouter, Router } from "expo-router";
import images from "@/constants/Images";



// Define types for static data
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

// Static placeholder data
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

// Static image mappings
const fiatImages: { [key: string]: ImageSourcePropType } = {
  ngn: images.glo,
  usd: images.airtel
};

const cryptoImages: { [key: string]: ImageSourcePropType } = {
  BNB: images.tether,
  USDT: images.matic
};

// Define props for PaymentOption component
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
}

// Reusable PaymentOption component
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
  account_number
}) => {
  const router: Router = useRouter();

  return (
    <TouchableOpacity
      style={styles.optionContainer}
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
        <ThemedText style={styles.accountText}>{name}</ThemedText>
        <ThemedText style={styles.optionDescription}>{label}</ThemedText>
      </View>
      <ThemedText>{balance}</ThemedText>
      <ThemedText style={styles.arrow}>
        <MaterialIcons name="chevron-right" size={30} color="#7b7b9b" />
      </ThemedText>
    </TouchableOpacity>
  );
};

const Accounts: React.FC = () => {
  // Simulate loading state (set to true initially, can be toggled for testing)
  const isLoading: boolean = true; // Change to false to show actual content

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navigator title="Accounts" />

        <ThemedView style={styles.content}>
          {/* Fiat Accounts Section */}
          <ThemedText style={styles.sectionHeader}>FIAT CURRENCY</ThemedText>
          {isLoading ?
            fiatData.map((item, index) => (
              <PaymentOption
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
            : null
          }

          {/* Crypto Accounts Section */}
          <ThemedText style={styles.sectionHeader}>CRYPTOCURRENCY</ThemedText>
          {isLoading ? 
            // Static crypto accounts
            cryptoData.map((item, index) => (
              <PaymentOption
                key={`crypto-${index}`}
                name={item.token}
                label={item.token_label}
                image={cryptoImages[item.token] || images.logo}
                balance={item.balance}
                type="crypto"
                address={item.address}
              />
            ))
            : null
          }
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
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
    backgroundColor: "#fff",
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
    color: "#666",
    textTransform: "capitalize" as const
  },
  arrow: {
    fontSize: 18,
    color: "#999"
  },
  skeletonContainer: {
    marginBottom: 10
  }
});
