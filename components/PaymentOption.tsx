import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleSheet
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, Router } from "expo-router";

interface PaymentOptionProps {
  name: string;
  label: string;
  image: ImageSourcePropType;
  balance: string;
  price?: string;
  type: "fiat" | "crypto";
  address?: string;
  account_balance?: string;
  account_name?: string;
  bank_name?: string;
  account_number?: string;
  bgColor?: string;
}

export const PaymentOption: React.FC<PaymentOptionProps> = ({
  name,
  label,
  image,
  balance,
  price,
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
        <View style={{ flexDirection: "row", gap: 5 }}>
          <ThemedText style={styles.optionDescription}>{label}</ThemedText>

          {type === "crypto" && (
            <ThemedText style={styles.optionDescription}>{price}</ThemedText>
          )}
        </View>
      </View>
      <ThemedText>{balance}</ThemedText>
      <ThemedText style={styles.arrow}>
        <MaterialIcons name="chevron-right" size={30} color="#218DC9" />
      </ThemedText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "Inter-Regular",
    fontWeight: "500"
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: "Questrial",
    textTransform: "capitalize" as const
  },
  arrow: {
    fontSize: 18,
    color: "#999"
  }
});
