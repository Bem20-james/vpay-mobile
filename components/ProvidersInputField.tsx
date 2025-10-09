import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

interface ProvidersInputFieldProps {
  value?: any;
  placeholder?: string;
  onPressDropdown: () => void;
}

const ProvidersInputField: React.FC<ProvidersInputFieldProps> = ({
  value,
  placeholder = "Select Provider",
  onPressDropdown
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const textColor = isDark ? "#F8F8F8" : "#252525";

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onPressDropdown}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        {value?.image && (
          <Image
            source={{ uri: value.image }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <ThemedText
          lightColor={textColor}
          darkColor={textColor}
          style={styles.text}
        >
          {value?.provider_name || placeholder}
        </ThemedText>
      </View>

      <MaterialIcons name="keyboard-arrow-down" size={24} color="#218DC9" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: "space-between"
  },
  left: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 50,
    marginRight: 8
  },
  text: {
    fontFamily: "Inter-Medium",
    fontSize: 14
  }
});

export default ProvidersInputField;
