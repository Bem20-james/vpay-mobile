import React from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface TransactionIconProps {
  type: string;
}

export const TransactionIcon: React.FC<TransactionIconProps> = ({ type }) => {
  // define icons + colors in one place
  const iconMap: Record<
    string,
    {
      name: keyof typeof MaterialCommunityIcons.glyphMap;
      color: string;
      bg: string;
    }
  > = {
    airtime: { name: "phone", color: "#ff3d9b", bg: "#fff1eb" },
    bet_funding: { name: "minus-circle", color: "#ff7043", bg: "#fff1eb" },
    debit: { name: "arrow-up-bold", color: "#BF281C", bg: "#fff1eb" },
    transfer: { name: "arrow-bottom-left", color: "#208BC9", bg: "#e6f2ff" },
    default: { name: "swap-horizontal", color: "#9B9B9B", bg: "#f5f5f5" }
  };

  const { name, color, bg } = iconMap[type] || iconMap.default;

  return (
    <View style={[styles.iconWrapper, { backgroundColor: bg }]}>
      <MaterialCommunityIcons name={name} size={20} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 8
  }
});
