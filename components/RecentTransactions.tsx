import React from "react";
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
import getSymbolFromCurrency from "currency-symbol-map";
import { useColorScheme } from "@/hooks/useColorScheme";

interface HistoryItem {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  backgroundColor: string;
  iconColor: string;
  amount: string;
  timestamp: string;
}

interface Props {
  title?: string;
  actions: HistoryItem[];
}

const RecentTransaction: React.FC<Props> = ({
  title = "Recent transactions",
  actions
}) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#9B9B9B"
          style={styles.title}
        >
          {title}
        </ThemedText>
        <Pressable
          onPress={() => router.push("/transactions")}
          style={({ pressed }) => [styles.more, { opacity: pressed ? 0.7 : 1 }]}
        >
          <ThemedText
            style={{ fontFamily: "Inter-SemiBold" }}
            lightColor="#218DC9"
            darkColor="#218DC9"
          >
            see more
          </ThemedText>
          <Entypo name="chevron-small-right" size={20} color={"#218DC9"} />
        </Pressable>
      </View>
      <FlatList
        data={actions}
        keyExtractor={(item) => item.id}
        numColumns={1}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[{ backgroundColor: bgColor }, styles.actionBox]}
            onPress={() => {}}
            activeOpacity={0.7}
          >
            <View style={styles.colBox}>
              <View style={styles.row}>
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: item.backgroundColor }
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color={item.iconColor}
                  />
                </View>
                <View>
                  <ThemedText
                    lightColor="#252525"
                    darkColor="#FFFFFF"
                    style={styles.label}
                  >
                    {item.label}
                  </ThemedText>
                  <ThemedText
                    lightColor="#9B9B9B"
                    darkColor="#9B9B9B"
                    style={styles.timestamp}
                  >
                    {item.timestamp}
                  </ThemedText>
                </View>
              </View>
              <ThemedText
                lightColor="#BF281C"
                darkColor="#BF281C"
                style={styles.amount}
              >
                {`${"-" + getSymbolFromCurrency("NGN")}${item.amount}`}
              </ThemedText>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 7
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    marginBottom: 10,
    fontFamily: "Inter-Medium",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  colBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  column: {
    justifyContent: "space-between"
  },
  actionBox: {
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
    padding: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 8
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0
  },
  timestamp: {
    fontFamily: "Questrial",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0
  },
  amount: {
    fontFamily: "Inter-SemiBold",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0
  }
});

export default RecentTransaction;
export type { HistoryItem };
