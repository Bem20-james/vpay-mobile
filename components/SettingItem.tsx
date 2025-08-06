import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const SettingItem = ({
  title,
  label,
  hasSwitch,
  switchValue,
  onSwitchChange,
  hasChevron,
  onPress,
  icon,
  iconColor,
  bgColor = "#F2F2F7",
  background,
  itemStyles
}: {
  title: string;
  label?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  hasChevron?: boolean;
  onPress?: () => void;
  icon?: any;
  iconColor?: string;
  bgColor?: string;
  background?: string;
  itemStyles?: any;
}) => (
  <TouchableOpacity
    style={[styles.settingItem, itemStyles, { backgroundColor: background }]}
    onPress={onPress}
    disabled={hasSwitch}
  >
    <View style={styles.settingLeft}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
      )}
      <View style={{ flexDirection: "column" }}>
        <ThemedText
          lightColor="#252525"
          darkColor="#FFFFFF"
          style={styles.settingText}
        >
          {title}
        </ThemedText>
        {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      </View>
    </View>

    {hasSwitch && (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: "#E5E5E5", true: "#80D1FF" }}
        thumbColor={switchValue ? "#208BC9" : "#FFFFFF"}
        ios_backgroundColor="#E5E5E5"
      />
    )}

    {hasChevron && (
      <Ionicons name="chevron-forward" size={18} color="#218DC9" />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 40
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  settingText: {
    fontFamily: "Inter-Bold",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0
  },
  label: {
    fontFamily: "Questrial",
    fontWeight: 600,
    fontSize: 12,
    letterSpacing: 0,
    color: "#9B9B9B"
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  }
});
