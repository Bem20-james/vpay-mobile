import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface CustomTabProps {
  tabs: string[];
  onTabChange: (tab: string) => void;
}
const CustomTab = ({ tabs, onTabChange }: CustomTabProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <ThemedView
      style={[
        styles.tabContainer,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.accentBg
            : Colors.light.accentBg
        }
      ]}
    >
      {tabs.map((tab: any) => (
        <TouchableOpacity
          key={tab}
          style={[
            styles.tabItem,
            {
              backgroundColor:
                activeTab === tab
                  ? isDarkMode
                    ? Colors.dark.primaryDark2
                    : Colors.dark.primaryDark1
                  : "transparent"
            }
          ]}
          onPress={() => {
            setActiveTab(tab);
            onTabChange(tab);
          }}
        >
          <ThemedText
            style={{
              color:
                activeTab === tab
                  ? isDarkMode
                    ? "#ffffff"
                    : "#ffffff"
                  : isDarkMode
                  ? "#ffffff"
                  : "#000000",
              textAlign: "center",
              padding: 5,
              fontFamily: activeTab === tab ? "Inter-Bold" : "Inter-SemiBold",
              fontSize: 15
            }}
          >
            {tab}
          </ThemedText>
        </TouchableOpacity>
      ))}
    </ThemedView>
  );
};

export default CustomTab;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 10,
    margin: 8
  },
  tabItem: {
    flex: 1,
    padding: 7,
    borderRadius: 50,
    alignItems: "center"
  }
});
