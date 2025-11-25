import { View, type ViewProps } from "react-native";
import { useTheme } from "@/contexts/ThemeContexts";
import { Colors } from "@/constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // BACKGROUND COLOR PRIORITY
  const backgroundColor =
    (isDark ? darkColor : lightColor) ||
    (isDark ? Colors.dark.background : Colors.light.background);

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
