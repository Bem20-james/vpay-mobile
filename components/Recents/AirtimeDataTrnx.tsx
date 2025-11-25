import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { TransferStyles } from "@/styles/transfers";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { RecentTransferstyles as styles } from "./RecentTransfers";
import { useTheme } from "@/contexts/ThemeContexts";

export interface ContactItem {
  label: string;
  image?: any;
  identifier: string; // could be phone, username, or account number
}

interface Props {
  /** Component title (e.g. "Select Beneficiary", "Select Recipient") */
  title?: string;
  /** Array of recent transactions */
  recents?: ContactItem[];
  /** Array of saved beneficiaries */
  beneficiaries?: ContactItem[];
  /** Placeholder text for search input */
  searchPlaceholder?: string;
  /** Called when a contact is selected */
  onSelect?: (contact: ContactItem) => void;
  /** Optional filter for query search */
  searchBy?: keyof ContactItem;
}

const ContactsSection: React.FC<Props> = ({
  title = "Select Beneficiary",
  recents = [],
  beneficiaries = [],
  searchPlaceholder = "Search contact",
  onSelect,
  searchBy = "identifier"
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"Recents" | "Beneficiaries">(
    "Recents"
  );

  const currentData = activeTab === "Recents" ? recents : beneficiaries;

  const filteredData = currentData.filter((item) => {
    if (!query.trim()) return true;
    const field = item[searchBy] ?? "";
    return field.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <View
      style={[
        TransferStyles.inputBox,
        { backgroundColor: bgColor, marginTop: 20, marginBottom: 20 }
      ]}
    >
      <ThemedText style={TransferStyles.label}>{title}</ThemedText>

      {/* Search Input */}
      <View style={[TransferStyles.searchContainer, { marginBottom: 20 }]}>
        <Feather
          name="search"
          size={20}
          color="#208BC9"
          style={TransferStyles.searchIcon}
        />
        <TextInput
          style={TransferStyles.searchInput}
          placeholder={searchPlaceholder}
          placeholderTextColor="#989898"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {["Recents", "Beneficiaries"].map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab as "Recents" | "Beneficiaries")}
            style={styles.tabWrapper}
          >
            <ThemedText
              lightColor={activeTab === tab ? "#218DC9" : "#9B9B9B"}
              darkColor={activeTab === tab ? "#218DC9" : "#9B9B9B"}
              style={styles.tabText}
            >
              {tab}
            </ThemedText>
            {activeTab === tab && <View style={styles.activeTabIndicator} />}
          </Pressable>
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.identifier}-${index}`}
        nestedScrollEnabled
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginTop: 7,
              padding: 10,
              borderTopColor: isDark ? "#0b2230ff" : "#9db5c0ff",
              borderTopWidth: 0.5
            }}
            onPress={() => onSelect?.(item)}
            activeOpacity={0.7}
          >
            <View
              style={{ flexDirection: "row", gap: 20, alignItems: "center" }}
            >
              {item.image && (
                <Image
                  source={item.image}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    objectFit: "contain"
                  }}
                />
              )}
              <View>
                <ThemedText
                  lightColor="#252525"
                  darkColor="#FFFFFF"
                  style={styles.primaryText}
                >
                  {item.label}
                </ThemedText>
                <ThemedText
                  lightColor="#9B9B9B"
                  darkColor="#9B9B9B"
                  style={styles.label}
                >
                  {item.identifier}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ContactsSection;
