import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import getSymbolFromCurrency from "currency-symbol-map";
import { Colors } from "@/constants/Colors";
import { useFetchTrnxHistory } from "@/hooks/useGeneral";
import { formatDateTime } from "@/utils/formatDateTime";
import { TransactionSkeleton } from "@/components/SkeletonLoader";
import { TransactionIcon } from "@/components/TransactionIcons";
import { useTheme } from "@/contexts/ThemeContexts";
import { useRouter } from "expo-router";
import { HistoryItem } from "@/components/Recents/RecentTransactions";

const TransactionScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const router = useRouter();

  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null
  );
  const { trnxHistory, loading } = useFetchTrnxHistory();

  const handlePress = (item: HistoryItem) => {
    setSelectedTransaction(item);
    router.push({
      pathname: "/transaction-reciept",
      params: {
        data: JSON.stringify(item),
        transactionType: item.transactionType
      }
    });
  };

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

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <Navigator
        title="Transaction History"
        onBack={
          selectedTransaction ? () => setSelectedTransaction(null) : router.back
        }
      />
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <TransactionSkeleton />
          ) : (
            <FlatList
              data={trnxHistory}
              keyExtractor={(item) => item.id?.toString()}
              numColumns={1}
              nestedScrollEnabled
              scrollEnabled={false}
              renderItem={({ item }) => {
                const amountPrefix =
                  item?.transactionType !== "deposit" ? "+" : "-";

                return (
                  <TouchableOpacity
                    style={[{ backgroundColor: bgColor }, styles.actionBox]}
                    onPress={() => handlePress(item)}
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
                        {`${amountPrefix}${getSymbolFromCurrency(
                          item?.currency
                        )}${Number(item?.amount ?? 0).toFixed(2)}`}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10
  },
  actionBox: {
    width: "100%",
    borderRadius: 8,
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
    justifyContent: "space-between",
    gap: 10
  },
  label: {
    textTransform: "capitalize",
    fontFamily: "Inter-SemiBold",
    fontWeight: "500",
    fontSize: 14
  },
  timestamp: {
    fontFamily: "Questrial",
    fontWeight: "600",
    fontSize: 14
  },
  amount: {
    fontFamily: "Inter-SemiBold",
    fontWeight: "500",
    fontSize: 14
  },
  colBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  }
});
