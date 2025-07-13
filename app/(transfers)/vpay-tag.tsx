import {
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import CountryFlag from "react-native-country-flag";
import { Feather } from "@expo/vector-icons";

type Contact = {
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
  { name: "Mama Praise", handle: "@mama", isRecent: true,  },
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

  const renderItem = ({ item }: { item: Contact }) => (
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
        <ThemedText lightColor="#9B9B9B" darkColor="#9B9B9B" style={styles.handle}>{item.handle}</ThemedText>
      </View>
    </TouchableOpacity>
  );

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
              renderItem={renderItem}
              ListHeaderComponent={
                <ThemedText style={styles.sectionHeader}>Recent Beneficiaries</ThemedText>
              }
            />

            {/* Contacts */}
            <FlatList
              data={contacts}
              keyExtractor={(item) => item.handle}
              renderItem={renderItem}
              ListHeaderComponent={
                <ThemedText style={[styles.sectionHeader, { marginTop: 15 }]}>
                  Vpay Contacts
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    marginHorizontal: 7,
    marginTop: 10
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000"
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Inter-Bold",
    textTransform: "uppercase",
    marginBottom: 10
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center"
  },
  initial: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Questrial"
  },
  flagWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    marginLeft: 12
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Inter-Regular"
  },
  handle: {
    fontSize: 13,
    fontFamily: "Questrial",
  }
});
