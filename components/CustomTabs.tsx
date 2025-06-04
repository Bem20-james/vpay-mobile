import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const CustomTab = ({ tabs, onTabChange }: { tabs: any; onTabChange: any }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <ThemedView
      style={[
        styles.tabContainer,
        { backgroundColor: isDarkMode ? "#F8F8F8" : "#F8F8F8" }
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
                    ? "#FFFFFF"
                    : "#DDD"
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
                    ? "#242424"
                    : "#000"
                  : isDarkMode
                  ? "#BBB"
                  : "#666",
              textAlign: "center",
              fontFamily: "Inter-SemiBold",
              fontSize: 16,
              padding: 2
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
    borderRadius: 100,
    padding: 6,
    margin: 5
  },
  tabItem: {
    flex: 1,
    padding: 7,
    borderRadius: 100,
    alignItems: "center"
  }
});
