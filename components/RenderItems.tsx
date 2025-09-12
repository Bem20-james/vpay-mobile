import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import CountryFlag from "react-native-country-flag";
import { TransferStyles as styles } from "@/styles/transfers";
import { StoredContact } from "@/utils/encryptedStore";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";

interface RenderItemProps {
  item: StoredContact;
  onPress?: (contact: StoredContact) => void;
}

export const RenderItem = ({ item, onPress }: RenderItemProps) => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;

  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.item, { backgroundColor: bgColor }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {item.image
        ? <Image source={{ uri: item.image }} style={styles.avatar} />
        : item.flag
          ? <View style={styles.flagWrapper}>
              <CountryFlag isoCode={item.flag} size={20} />
            </View>
          : <View style={styles.avatarPlaceholder}>
              <ThemedText style={styles.initial}>
                {item.name.charAt(0).toUpperCase()}
              </ThemedText>
            </View>}
      <View style={styles.textContainer}>
        <ThemedText style={styles.name}>
          {item.name}
        </ThemedText>
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#9B9B9B"
          style={styles.handle}
        >
          {item.handle}
        </ThemedText>
        {item.lastUsed &&
          <ThemedText
            lightColor="#C0C0C0"
            darkColor="#C0C0C0"
            style={styles.lastUsed}
          >
            Last used: {new Date(item.lastUsed).toLocaleDateString()}
          </ThemedText>}
      </View>
    </TouchableOpacity>
  );
};
