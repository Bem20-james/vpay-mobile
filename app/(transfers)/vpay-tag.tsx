import { ScrollView, View, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import { RenderItem } from "@/components/RenderItems";

export type Contact = {
  name: string;
  handle: string;
  flag?: string;
  image?: string;
  isRecent?: boolean;
};

const sampleData: Contact[] = [
  {
    name: "Hungwa Henry",
    handle: "@hungwahenry",
    isRecent: true
  },
  {
    name: "Mhembe Kelvin",
    handle: "@terdoo",
    isRecent: true
  },
  { name: "Mama Praise", handle: "@mama", isRecent: true },
  { name: "Aaron Emmanuel", handle: "@aaron", flag: "NG" },
  { name: "Akumah Akumeh", handle: "@akumah", flag: "NG" },
  { name: "Samson Adi", handle: "@samadi", flag: "NG" },
  { name: "Elijah Elisha", handle: "@elaeli", flag: "NG" },
  { name: "Don Culione", handle: "@deDon", flag: "NG" },
  { name: "Jimie Doe", handle: "@jimie", flag: "NG" }
];

const VpayTag = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();
  const [query, setQuery] = useState("");

  const recent = sampleData.filter((item) => item.isRecent);
  const contacts = sampleData.filter((item) => !item.isRecent);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Vpay tag" />
        <View style={styles.container}>
          {/* Search */}
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
              value={query}
              onChangeText={setQuery}
            />
          </View>

          {/* Recent */}
          <FlatList
            data={recent}
            keyExtractor={(item) => item.handle}
            renderItem={({ item }) => <RenderItem item={item} />}
            ListHeaderComponent={
              <ThemedText style={[styles.sectionHeader, { marginTop: 5 }]}>
                Recent Beneficiaries
              </ThemedText>
            }
          />

          {/* Contacts */}
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.handle}
            renderItem={({ item }) => <RenderItem item={item} />}
            ListHeaderComponent={
              <ThemedText style={[styles.sectionHeader, { marginTop: 15 }]}>
                Recent Beneficiaries
              </ThemedText>
            }
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default VpayTag;
