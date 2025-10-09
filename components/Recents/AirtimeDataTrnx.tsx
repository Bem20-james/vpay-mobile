import React, { useState, useEffect } from "react";
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
import images from "@/constants/Images";

export interface AirtimeDataRecents {
  label: string;
  image: any;
  phone: string;
}

export interface AirtimeDataBeneficiaries {
  label: string;
  image: any;
  phone: string;
}

interface Props {
  title?: string;
  recents: AirtimeDataRecents[];
  beneficiaries: AirtimeDataBeneficiaries[];
}

const AirtimeDataTrnxs: React.FC<Props> = ({ beneficiaries, recents }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const [query, setQuery] = useState("");

  const [activeTab, setActiveTab] = useState<"Recents" | "Beneficiaries">(
    "Recents"
  );
  const data = activeTab === "Recents" ? recents : beneficiaries;

  return (
    <View
      style={[
        TransferStyles.inputBox,
        { backgroundColor: bgColor, marginTop: 20 }
      ]}
    >
      <ThemedText style={TransferStyles.label}>
        {"Select Beneficiary"}
      </ThemedText>

      <View style={[TransferStyles.searchContainer, { marginBottom: 20 }]}>
        <Feather
          name="search"
          size={20}
          color="#208BC9"
          style={TransferStyles.searchIcon}
        />
        <TextInput
          style={TransferStyles.searchInput}
          placeholder="Search phone number"
          placeholderTextColor="#989898"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setActiveTab("Recents")}
          style={styles.tabWrapper}
        >
          <ThemedText
            lightColor={activeTab === "Recents" ? "#218DC9" : "#9B9B9B"}
            darkColor={activeTab === "Recents" ? "#218DC9" : "#9B9B9B"}
            style={styles.tabText}
          >
            Recent
          </ThemedText>
          {activeTab === "Recents" && (
            <View style={styles.activeTabIndicator} />
          )}
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("Beneficiaries")}
          style={styles.tabWrapper}
        >
          <ThemedText
            lightColor={activeTab === "Beneficiaries" ? "#218DC9" : "#9B9B9B"}
            darkColor={activeTab === "Beneficiaries" ? "#218DC9" : "#9B9B9B"}
            style={styles.tabText}
          >
            Beneficiaries
          </ThemedText>
          {activeTab === "Beneficiaries" && (
            <View style={styles.activeTabIndicator} />
          )}
        </Pressable>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              marginTop: 7,
              padding: 10,
              borderTopColor: isDark ? "#0b2230ff" : "#9db5c0ff",
              borderTopWidth: 0.5
            }}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <View
              style={{
                flexDirection: "row",
                gap:20,
                alignItems: "center"
              }}
            >
              <View>
                <Image
                  source={item.image}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 20,
                    objectFit: "contain"
                  }}
                />
              </View>
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
                  {item.phone}
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

export default AirtimeDataTrnxs;
