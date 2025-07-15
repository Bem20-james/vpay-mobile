import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import CountryFlag from "react-native-country-flag";
import { TransferStyles as styles } from "@/styles/transfers";
import { Contact } from "@/app/(transfers)/vpay-tag";

export const RenderItem = ({ item }: { item: Contact }) => (
  <TouchableOpacity style={styles.item}>
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.avatar} />
    ) : item.flag ? (
      <View style={styles.flagWrapper}>
        <CountryFlag isoCode={item.flag} size={20} />
      </View>
    ) : (
      <View style={styles.avatarPlaceholder}>
        <ThemedText style={styles.initial}>{item.name.charAt(0)}</ThemedText>
      </View>
    )}
    <View style={styles.textContainer}>
      <ThemedText style={styles.name}>{item.name}</ThemedText>
      <ThemedText
        lightColor="#9B9B9B"
        darkColor="#9B9B9B"
        style={styles.handle}
      >
        {item.handle}
      </ThemedText>
    </View>
  </TouchableOpacity>
);
