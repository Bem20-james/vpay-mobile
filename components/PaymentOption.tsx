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
import CountryFlag from "react-native-country-flag";
import { SERVER_BASE_URL } from "@/constants/Paths";

interface PaymentOptionProps {
  name: string;
  label: string;
  image?: ImageSourcePropType;
  balance: string;
  price?: string;
  type: "fiat" | "crypto";
  address?: string;
  account_balance?: string;
  account_name?: string;
  bank_name?: string;
  account_number?: string;
  country_code?: string;
  bgColor?: string;
  handlePress: () => void;
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
  country_code,
  bgColor,
  handlePress
}) => {
  const router: Router = useRouter();

  return (
    <TouchableOpacity
      style={[styles.optionContainer, { backgroundColor: bgColor }]}
      onPress={() => handlePress()}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {type === "crypto" && (
          <Image
            source={{ uri: `${SERVER_BASE_URL}/${image}` }}
            style={styles.icon}
          />
        )}
        {type === "fiat" && (
          <CountryFlag
            isoCode={country_code ?? ""}
            size={20}
            style={styles.flagicon}
          />
        )}

        <View>
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
              <ThemedText style={styles.optionDescription}>
                {Number(price).toFixed(2)}
              </ThemedText>
            )}
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <ThemedText>
          {type === "fiat" ? Number(balance).toFixed(2) : balance}
        </ThemedText>
        <ThemedText style={styles.arrow}>
          <MaterialIcons name="chevron-right" size={30} color="#218DC9" />
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  flagicon: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: "contain",
    borderRadius: 5
  },
  accountText: {
    fontSize: 15,
    fontFamily: "Inter-Medium"
  },
  optionDescription: {
    fontSize: 12,
    fontFamily: "Questrial",
    textTransform: "uppercase"
  },
  arrow: {
    fontSize: 18,
    color: "#999"
  }
});
