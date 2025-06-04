import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable
} from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";

interface TransferItem {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  backgroundColor: string;
  iconColor: string;
  amount: string;
  timestamp: string;
  subtitle?: string;
}

interface Props {
  title?: string;
  recents: TransferItem[];
  beneficiaries: TransferItem[];
}

const RecentTransfers: React.FC<Props> = ({ beneficiaries, recents }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [activeTab, setActiveTab] = useState<"Recents" | "Favourites">(
    "Recents"
  );
  const data = activeTab === "Recents" ? recents : beneficiaries;

  return (
    <View style={styles.container}>
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
            Recents
          </ThemedText>
          {activeTab === "Recents" && (
            <View style={styles.activeTabIndicator} />
          )}
        </Pressable>

        <Pressable
          onPress={() => setActiveTab("Favourites")}
          style={styles.tabWrapper}
        >
          <ThemedText
            lightColor={activeTab === "Favourites" ? "#218DC9" : "#9B9B9B"}
            darkColor={activeTab === "Favourites" ? "#218DC9" : "#9B9B9B"}
            style={styles.tabText}
          >
            Beneficiaries
          </ThemedText>
          {activeTab === "Favourites" && (
            <View style={styles.activeTabIndicator} />
          )}
        </Pressable>
      </View>

      <View
        style={[
          styles.listContainer,
          { backgroundColor: isDark ? "#161622" : "#FFFFFF" }
        ]}
      >
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${item.label}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.itemContainer, { borderBottomColor: isDark ? "#0a0a10" : "#F8F8F8" }]}
              onPress={() => {}}
              activeOpacity={0.7}
            >
              <View style={styles.itemContent}>
                <View >
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
                    {item.subtitle}
                  </ThemedText>
                </View>

                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: item.backgroundColor }
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={16}
                    color={item.iconColor}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
        <Pressable
          onPress={() => router.push("/transactions")}
          style={({ pressed }) => [
            styles.moreBtn,
            { opacity: pressed ? 0.7 : 1 }
          ]}
        >
          <ThemedText
            style={styles.viewAllText}
            lightColor="#218DC9"
            darkColor="#218DC9"
          >
            See more
          </ThemedText>
          <Entypo name="chevron-small-right" size={20} color={"#218DC9"} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 7,
    gap: 24
  },
  tabWrapper: {
    alignItems: "center"
  },
  tabText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    paddingBottom: 8
  },
  activeTabIndicator: {
    height: 1,
    borderRadius: 10,
    backgroundColor: "#F1FAFF",
    width: "100%",
    position: "absolute",
    bottom: 0
  },
  listContainer: {
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomColor: "#F8F8F8",
    borderBottomWidth: 1
  },
  itemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  primaryText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    marginBottom: 2
  },
  label: {
    fontFamily: "Questrial",
    fontSize: 13
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  moreBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  viewAllText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
  }
});

export default RecentTransfers;
export type { TransferItem };
