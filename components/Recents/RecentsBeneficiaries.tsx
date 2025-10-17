import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Pressable,
  FlatList,
  Image,
  StyleSheet
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { TransferStyles } from "@/styles/transfers";
import { Feather } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { RecentTransferstyles as styles } from "./RecentTransfers";
import { StoredContact } from "@/utils/encryptedStore";
import SkeletonRow from "../Skeleton";

interface Props {
  title?: string;
  recents?: StoredContact[];
  beneficiaries?: StoredContact[];
  loading?: boolean;
  onSelect?: (contact: StoredContact) => void;
}

const RecentsBeneficiaries: React.FC<Props> = ({
  title = "Select Beneficiary",
  recents = [],
  beneficiaries = [],
  loading = false,
  onSelect
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [activeTab, setActiveTab] = useState<"Recents" | "Beneficiaries">(
    "Recents"
  );
  const currentData = activeTab === "Recents" ? recents : beneficiaries;

  return (
    <>
      <ThemedText
        style={{
          color: "#F5F5F5",
          fontSize: 13,
          fontFamily: "Inter-SemiBold",
          marginTop: 20,
          textTransform: "uppercase"
        }}
      >
        {title}
      </ThemedText>

      <View
        style={[
          TransferStyles.inputBox,
          { backgroundColor: bgColor, marginTop: 7 }
        ]}
      >
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

        {loading ? (
          <View style={{ marginTop: 10 }}>
            {[...Array(4)].map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </View>
        ) : currentData.length === 0 ? (
          // 🧩 Empty State
          <View style={localStyles.emptyContainer}>
            <Feather name="users" size={20} color="#9B9B9B" />
            <ThemedText
              style={{
                color: "#9B9B9B",
                marginTop: 10,
                fontFamily: "Questrial"
              }}
            >
              {activeTab === "Recents"
                ? "Your recent transfers will appear here"
                : "Your saved beneficiaries will appear here"}
            </ThemedText>
          </View>
        ) : (
          // ✅ Data List
          <FlatList
            data={currentData}
            keyExtractor={(item, index) => `${item.phoneNumber}-${index}`}
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
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center"
                  }}
                >
                  {item.image && (
                    <Image
                      source={{ uri: item.image }}
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
                      {item.name}
                    </ThemedText>
                    <ThemedText
                      lightColor="#9B9B9B"
                      darkColor="#9B9B9B"
                      style={styles.label}
                    >
                      {item.phoneNumber}
                    </ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
};

const localStyles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40
  }
});

export default RecentsBeneficiaries;
