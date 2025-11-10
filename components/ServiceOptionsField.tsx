import React, { useState, useMemo } from "react";
import { View, Pressable, FlatList, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { TransferStyles as styles } from "@/styles/transfers";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContexts";
import getSymbolFromCurrency from "currency-symbol-map";

type OptionItem = {
  name: string;
  amount: number;
  code: string;
  description?: string;
};

type ServiceOptionsFieldProps = {
  data: OptionItem[];
  title?: string;
  type?: "data" | "electricity" | "cable";
  onSelect?: (option: OptionItem) => void;
};

const TABS = ["All", "Daily", "Weekly", "Monthly"];

const ServiceOptionsField = ({
  data = [],
  title = "Select Option",
  type = "data",
  onSelect
}: ServiceOptionsFieldProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const { user } = useUser();
  const currencySymbol = user?.country?.currency;

  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedOption, setSelectedOption] = useState<OptionItem | null>(null);

  // Filter only for mobile data
  const filteredData = useMemo(() => {
    if (type !== "data") return data;
    if (selectedTab === "All") return data;
    const key = selectedTab.toLowerCase();
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(key) ||
        item.code.toLowerCase().includes(key)
    );
  }, [data, selectedTab, type]);

  const handleSelect = (option: OptionItem) => {
    setSelectedOption(option);
    onSelect?.(option);
  };

  return (
    <View style={[styles.inputBox, { backgroundColor: bgColor }]}>
      <ThemedText style={styles.label}>{title}</ThemedText>

      {/* Show tabs only for data bundles */}
      {type === "data" && (
        <View style={localStyles.tabContainer}>
          {TABS.map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[
                localStyles.tabButton,
                {
                  backgroundColor:
                    selectedTab === tab ? "#208BC9" : inputBgColor
                }
              ]}
            >
              <ThemedText
                style={{
                  color: selectedTab === tab ? "#fff" : txtColor,
                  fontWeight: "600",
                  fontSize: 14
                }}
              >
                {tab}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      )}

      {/* Options List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.code}
        numColumns={3}
        nestedScrollEnabled
        scrollEnabled={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 10
        }}
        contentContainerStyle={{ marginTop: 10 }}
        renderItem={({ item }) => {
          const isSelected = selectedOption?.code === item.code;
          return (
            <Pressable
              onPress={() => handleSelect(item)}
              style={[
                localStyles.optionCard,
                {
                  backgroundColor: isSelected ? "#0A3A52" : inputBgColor,
                  borderColor: isSelected ? "#208BC9" : "transparent"
                }
              ]}
            >
              <ThemedText
                style={{
                  color: isSelected ? Colors.light.background : txtColor,
                  fontSize: 13,
                  fontFamily: "Questrial",
                  textAlign: "center"
                }}
              >
                {item.name}
              </ThemedText>

              <ThemedText
                style={{
                  color: "#208BC9",
                  fontFamily: "Inter-Bold",
                  fontSize: 13,
                  marginTop: 4
                }}
              >
                {getSymbolFromCurrency(currencySymbol ?? "")}
                {item.amount}
              </ThemedText>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default ServiceOptionsField;

const localStyles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 15
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 3
  },
  optionCard: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1
  }
});
