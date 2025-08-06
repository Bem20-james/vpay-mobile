import { Tabs } from "expo-router";
import React from "react";
import { Platform, View, Image, StyleSheet } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import icons from "@/constants/Icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const TabIcon = ({
    name,
    icon,
    color,
    focused
  }: {
    name: string;
    icon: any;
    color: string;
    focused: boolean;
  }) => {
    return (
      <View style={styles.items}>
        <Image
          source={icon}
          resizeMode="contain"
          tintColor={color}
          style={styles.icon}
        />
        <ThemedText
          style={{
            fontFamily: focused ? "Inter-SemiBold" : "Inter-Regular",
            fontSize: 10,
            color: color
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
          backgroundColor: colorScheme === "dark" ? "#000000" : "#FFFFFF",
          borderTopWidth: 0,
          borderTopColor: "none",
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
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
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
              icon={icons.transfer}
              color={color}
              name="Transfer"
              focused={focused}
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
              icon={icons.cards}
              color={color}
              name="Cards"
              focused={focused}
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
              icon={icons.settings}
              color={color}
              name="Settings"
              focused={focused}
            />
          )
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20
  },
  items: {
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    width: 50
  }
});
