import React from "react";
import { Image, View, Pressable, Text, Animated } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import images from "@/constants/Images";
import { styles } from "@/styles/home";
import { useUser } from "@/contexts/UserContexts";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContexts";

interface StickyHeaderProps {
  headerOpacity: Animated.Value;
  headerTranslateY: Animated.Value;
}

export default function StickyHeader({
  headerOpacity,
  headerTranslateY
}: StickyHeaderProps) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const getStickyHeaderStyle = () => ({
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    opacity: headerOpacity,
    transform: [{ translateY: headerTranslateY }],
    backgroundColor: isDark ? Colors.dark.accentBg : Colors.light.accentBg,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 7,
    shadowColor: isDark ? "#FFFFFF" : "#000000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5
  });

  const getStickyHeaderContentStyle = () => ({
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const
  });

  const getThemeIcon = () => {
    if (theme === "dark") return "dark-mode";
    if (theme === "light") return "light-mode";
    return "brightness-auto";
  };

  return (
    <Animated.View style={getStickyHeaderStyle()}>
      <View style={getStickyHeaderContentStyle()}>
        <View style={styles.profileContainer}>
          <Pressable onPress={() => router.push("/profile")}>
            <View style={[styles.avatarBg, { width: 35, height: 35 }]}>
              <Image
                source={images.avatar}
                style={[styles.profileImage, { width: 30, height: 30 }]}
              />
            </View>
          </Pressable>
          <ThemedText
            lightColor="#252525"
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              marginLeft: 10
            }}
          >
            Hello,{" "}
            <Text style={{ fontFamily: "Inter-Bold" }}>{user?.firstname}</Text>
            {String.fromCodePoint(0x1f44b)}
          </ThemedText>
        </View>
        <View style={styles.dFlex}>
          <Pressable
            onPress={() => router.push("/notifications")}
            style={{
              borderRadius: 100,
              padding: 4,
              borderWidth: 0.6,
              borderColor: isDark ? Colors.dark.background : "#ffffff"
            }}
          >
            <MaterialIcons name="notifications" size={25} color={"#218DC9"} />
          </Pressable>
          <Pressable
            onPress={toggleTheme}
            style={{
              borderRadius: 100,
              padding: 4,
              borderWidth: 0.6,
              borderColor: isDark ? Colors.dark.background : "#ffffff"
            }}
          >
            <MaterialIcons name={getThemeIcon()} size={25} color={"#218DC9"} />
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}
