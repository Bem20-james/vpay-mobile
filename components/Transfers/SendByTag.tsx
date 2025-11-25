import { ScrollView, View, TextInput } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import { useTheme } from "@/contexts/ThemeContexts";
import { Colors } from "react-native/Libraries/NewAppScreen";

const TagSendScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = isDark ? Colors.dark.background : Colors.light.background;
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <Navigator title="Vpay tag" />

      <ScrollView>
        <View style={styles.container}>
          {/* send */}
          <View style={styles.searchContainer}>
            <Feather
              name="search"
              size={20}
              color="#9B9B9B"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="@VpayTag"
              placeholderTextColor="#9B9B9B"
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default TagSendScreen;
