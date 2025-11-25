import { Tabs } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/contexts/ThemeContexts";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const TabIcon = ({
    name,
    IconComponent,
    iconName,
    color,
    focused
  }: {
    name: string;
    IconComponent: any;
    iconName: string;
    color: string;
    focused: boolean;
  }) => {
    return (
      <View style={styles.items}>
        <IconComponent name={iconName} size={20} color={color} />

        <ThemedText
          style={{
            fontFamily: focused ? "Inter-SemiBold" : "Inter-Regular",
            fontSize: 11,
            color
          }}
        >
          {name}
        </ThemedText>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#218DC9",
        tabBarInactiveTintColor: "#9B9B9B",
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderTopWidth: 0,
          height: 50,
          paddingTop: 7
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Home"
              color={color}
              focused={focused}
              IconComponent={Feather}
              iconName="home"
            />
          )
        }}
      />

      <Tabs.Screen
        name="transfer"
        options={{
          title: "Transfer",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Transfer"
              color={color}
              focused={focused}
              IconComponent={Feather}
              iconName="send"
            />
          )
        }}
      />

      <Tabs.Screen
        name="swap"
        options={{
          title: "Swap",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Swap"
              color={color}
              focused={focused}
              IconComponent={Feather}
              iconName="repeat"
            />
          )
        }}
      />

      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Cards"
              color={color}
              focused={focused}
              IconComponent={Feather}
              iconName="credit-card"
            />
          )
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              name="Settings"
              color={color}
              focused={focused}
              IconComponent={Ionicons}
              iconName="settings-sharp"
            />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  items: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    width: 50
  }
});
