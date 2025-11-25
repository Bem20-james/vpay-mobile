import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "../ThemedText";
import getSymbolFromCurrency from "currency-symbol-map";
import { Colors } from "@/constants/Colors";
import { formatDateTime } from "@/utils/formatDateTime";
import { TransactionIcon } from "../TransactionIcons";
import { useTheme } from "@/contexts/ThemeContexts";
import { MotiView } from "moti";
import TransactionReceipt from "../TransactionReciept";

interface HistoryItem {
  id: string;
  currency: string;
  amount: number;
  status: string;
  transactionType: string;
  date: string;
}

interface Props {
  title?: string;
  actions: HistoryItem[];
  loading?: boolean;
}

//converting transactionType to readable label
const getTransactionLabel = (type: string) => {
  switch (type?.toLowerCase()) {
    case "airtime":
      return "Airtime purchase";
    case "data":
      return "Data purchase";
    case "electricity":
      return "Electricity bill";
    case "bet_funding":
      return "Betting payment";
    case "cable-tv":
      return "Cable TV subscription";
    case "transfer":
      return "Transfer";
    default:
      return type;
  }
};

const TransactionSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <MotiView
          key={i}
          from={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ loop: true, type: "timing", duration: 800 }}
          style={styles.skeleton}
        />
      ))}
    </>
  );
};

const RecentTransaction: React.FC<Props> = ({
  title = "Recent transactions",
  actions,
  loading = false
}) => {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null
  );

  const latestTrxn = actions?.slice(0, 5) ?? [];
  const handlePress = (item: any) => setSelectedTransaction(item);

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <ThemedText
          lightColor={Colors.light.textGray}
          darkColor={Colors.light.textGray}
          style={styles.title}
        >
          {title}
        </ThemedText>

        <Pressable
          onPress={() => router.push("/transactions")}
          style={({ pressed }) => [styles.more, { opacity: pressed ? 0.6 : 1 }]}
        >
          <ThemedText
            style={{ fontFamily: "Inter-SemiBold", fontSize: 13 }}
            lightColor="#218DC9"
            darkColor="#218DC9"
          >
            see more
          </ThemedText>
          <Entypo name="chevron-small-right" size={20} color={"#218DC9"} />
        </Pressable>
      </View>

      {loading ? (
        <TransactionSkeleton />
      ) : !selectedTransaction ? (
        <FlatList
          data={latestTrxn}
          keyExtractor={(item) => item.id}
          numColumns={1}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={handlePress}
              style={[{ backgroundColor: bgColor }, styles.actionBox]}
              activeOpacity={0.7}
            >
              <View style={styles.colBox}>
                <View style={styles.row}>
                  <TransactionIcon type={item?.transactionType} />

                  <View>
                    <ThemedText
                      lightColor="#252525"
                      darkColor="#FFFFFF"
                      style={styles.label}
                    >
                      {getTransactionLabel(item?.transactionType)}
                    </ThemedText>

                    <ThemedText
                      lightColor="#9B9B9B"
                      darkColor="#9B9B9B"
                      style={styles.timestamp}
                    >
                      {formatDateTime(item?.date)}
                    </ThemedText>
                  </View>
                </View>

                <ThemedText
                  style={styles.amount}
                  lightColor="#BF281C"
                  darkColor="#BF281C"
                >
                  {`${getSymbolFromCurrency(item?.currency)}${Number(
                    item?.amount ?? 0
                  ).toFixed(2)}`}
                </ThemedText>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <TransactionReceipt
          data={selectedTransaction}
          onBack={() => setSelectedTransaction(null)}
        />
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  title: {
    fontFamily: "Inter-Medium",
    fontSize: 13
  },
  more: {
    flexDirection: "row",
    alignItems: "center"
  },

  colBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  actionBox: {
    width: "100%",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 1,
    shadowOpacity: 0.08,
    shadowRadius: 4
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14
  },
  timestamp: {
    fontFamily: "Questrial",
    fontSize: 12
  },
  amount: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14
  },
  skeleton: {
    height: 60,
    width: "100%",
    backgroundColor: "#d9d9d9",
    borderRadius: 12,
    marginBottom: 10,
    opacity: 0.6
  }
});

export default RecentTransaction;
export type { HistoryItem };
