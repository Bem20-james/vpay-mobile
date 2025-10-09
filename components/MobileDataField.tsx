import React, { useState, useMemo } from "react";
import { View, Pressable, FlatList, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { TransferStyles as styles } from "@/styles/transfers";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContexts";
import getSymbolFromCurrency from "currency-symbol-map";

type Bundle = {
  name: string;
  amount: number;
  code: string;
};

type MobileDataFieldProps = {
  bundles: Bundle[];
  title?: string;
  onSelectBundle?: (bundle: Bundle) => void;
};

const TABS = ["All", "Daily", "Weekly", "Monthly"];

const MobileDataField = ({
  bundles = [],
  title = "Select Data Bundle",
  onSelectBundle
}: MobileDataFieldProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const inputBgColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const [selectedTab, setSelectedTab] = useState("All");
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const { user } = useUser();

  const currencySymbol = user?.country?.currency;

  // group bundles by duration keywords
  const filteredBundles = useMemo(() => {
    if (selectedTab === "All") return bundles;
    const key = selectedTab.toLowerCase();
    return bundles.filter(
      (b) =>
        b.name.toLowerCase().includes(key) || b.code.toLowerCase().includes(key)
    );
  }, [bundles, selectedTab]);

  const handleBundleSelect = (bundle: Bundle) => {
    setSelectedBundle(bundle);
    onSelectBundle?.(bundle);
  };

  return (
    <View>
      <View
        style={[styles.inputBox, { backgroundColor: bgColor, marginTop: 20 }]}
      >
        <ThemedText style={styles.label}>{title}</ThemedText>

        {/* Tabs */}
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

        {/* Bundle List */}
        <FlatList
          data={filteredBundles}
          keyExtractor={(item) => item.code}
          numColumns={3}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 10
          }}
          contentContainerStyle={{ marginTop: 10 }}
          renderItem={({ item }) => {
            const isSelected = selectedBundle?.code === item.code;
            return (
              <Pressable
                onPress={() => handleBundleSelect(item)}
                style={[
                  localStyles.bundleCard,
                  {
                    backgroundColor: isSelected ? "#0A3A52" : inputBgColor,
                    borderColor: isSelected ? "#208BC9" : "transparent"
                  }
                ]}
              >
                <ThemedText
                  style={{
                    color: txtColor,
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
    </View>
  );
};

export default MobileDataField;

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
  bundleCard: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1
  }
});
