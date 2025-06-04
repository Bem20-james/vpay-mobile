import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";
import Navigator from "@/components/Navigator";
import { useRouter } from "expo-router";

const fiatImages: { [key: string]: any } = {
  ngn: require("../../../assets/logos/ngn.png"),
  USD: require("../../../assets/logos/usa.jpeg"),
  LRD: require("../../../assets/logos/liberia.jpeg")
};

const cryptoImages: { [key: string]: any } = {
  BNB: require("../../../assets/logos/bnb.png"),
  USDT: require("../../../assets/logos/usdt.png"),
  ETH: require("../../../assets/logos/etheruem.png"),
  POL: require("../../../assets/logos/matic.png"),
  IWC: require("../../../assets/logos/6.png")
};

const PaymentOption = ({
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
}: {
  name: string;
  label: string;
  image: any;
  balance: string;
  type: "fiat" | "crypto";
  address: string;
  account_balance: string;
  account_name: string;
  bank_name: string;
  account_number: string;
}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() =>
        router.push({
          pathname:
            type === "fiat"
              ? "/screens/(iwc-pay)/deposit"
              : "/screens/(iwc-pay)/deposit-crypto",
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
        <ThemedText
          style={{ color: "#666", textTransform: "capitalize" }}
        >
          {label}
        </ThemedText>
      </View>
      <ThemedText>{balance}</ThemedText>
      <ThemedText style={styles.arrow}>
        <MaterialIcons name="chevron-right" size={30} color="#7b7b9b" />
      </ThemedText>
    </TouchableOpacity>
  );
};

const Accounts = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#ffffff";

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Navigator title="Accounts" />

        <ThemedView
          lightColor="#ffffff"
          darkColor="#000000"
          style={{ marginHorizontal: 10, marginTop: 10 }}
        >
          {loading || !balances || !balances.fiat || !balances.crypto ? (
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <View
                    key={`fiat-skeleton-${index}`}
                    style={styles.optionContainer}
                  >
                    <Skeleton show={true} radius={30} height={40} width={40} />
                    <View style={[styles.textContainer, { gap: 5 }]}>
                      <Skeleton show={true} width={100} height={16} />
                      <Skeleton
                        show={true}
                        width={80}
                        height={12}
                        style={{ marginTop: 8 }}
                      />
                    </View>
                    <Skeleton show={true} width={60} height={16} />
                  </View>
                ))}
            </>
          ) : (
            // Actual content
            balances.fiat.map((item: any, index: number) => (
              <PaymentOption
                key={index}
                name={item.currency_label || item.currency_name.toUpperCase()}
                label={item.currency_name.toLowerCase()}
                image={
                  fiatImages[item.currency_name] ||
                  require("../../../assets/logos/6.png")
                }
                balance={item.balance}
                type="fiat"
                account_balance={item.account_balance}
                account_name={item.account_name}
                bank_name={item.bank_name}
                account_number={item.account_number}
              />
            ))
          )}

          <ThemedText  style={styles.sectionHeader}>
            CRYPTOCURRENCY
          </ThemedText>

          {/* Crypto Options */}
          {loading || !balances || !balances.fiat || !balances.crypto ? (
            // Skeleton loading state
            <>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <View
                    key={`crypto-skeleton-${index}`}
                    style={styles.optionContainer}
                  >
                    <Skeleton show={true} radius={30} height={40} width={40} />
                    <View style={[styles.textContainer, { gap: 5 }]}>
                      <Skeleton show={true} width={100} height={16} />
                      <Skeleton
                        show={true}
                        width={80}
                        height={12}
                        style={{ marginTop: 8 }}
                      />
                    </View>
                    <Skeleton show={true} width={60} height={16} />
                  </View>
                ))}
            </>
          ) : (
            // Actual content
            balances.crypto.map((item: any, index: number) => (
              <PaymentOption
                key={index}
                name={item.token}
                label={item.token_label.toLowerCase()}
                image={
                  cryptoImages[item.token] ||
                  require("../../../assets/logos/6.png")
                }
                balance={item.balance}
                type="crypto"
                address={item.address}
              />
            ))
          )}
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  sectionHeader: {
    color: "#999",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 5
  },
  optionContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 }
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
    resizeMode: "contain",
    borderRadius: 30
  },
  textContainer: {
    flex: 1
  },
  optionDescription: {
    fontSize: 12,
    color: "#666"
  },
  arrow: {
    fontSize: 18,
    color: "#999"
  },
  accountText: {
    fontSize: 16
  }
});
