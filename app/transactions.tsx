import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import getSymbolFromCurrency from "currency-symbol-map";
import TransactionReceipt from "@/components/TransactionReciept";
import { Colors } from "@/constants/Colors";
import { useFetchTrnxHistory } from "@/hooks/useGeneral";
import { formatDateTime } from "@/utils/formatDateTime";
import { TransactionSkeleton } from "@/components/SkeletonLoader";
import { TransactionIcon } from "@/components/TransactionIcons";

const TransactionScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null
  );

  const { trnxHistory, loading } = useFetchTrnxHistory();

  const handlePress = (item: any) => setSelectedTransaction(item);

  return (
    <SafeAreaView style={{ backgroundColor, flex: 1 }}>
      <Navigator title="Transaction History" />
      <ScrollView>
        <View style={styles.container}>
          {loading ? (
            <TransactionSkeleton />
          ) : !selectedTransaction ? (
            <FlatList
              data={trnxHistory}
              keyExtractor={(item) => item.id?.toString()}
              numColumns={1}
              nestedScrollEnabled
              scrollEnabled={false}
              renderItem={({ item }) => {
                const amountPrefix =
                  item?.transaction_type === "credit" ? "+" : "-";

                return (
                  <TouchableOpacity
                    style={[{ backgroundColor: bgColor }, styles.actionBox]}
                    onPress={() => handlePress(item)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.colBox}>
                      <View style={styles.row}>
                        <TransactionIcon type={item?.transaction_type} />
                        <View>
                          <ThemedText
                            lightColor="#252525"
                            darkColor="#FFFFFF"
                            style={styles.label}
                          >
                            {item?.transaction_type || "Transaction"}
                          </ThemedText>
                          <ThemedText
                            lightColor="#9B9B9B"
                            darkColor="#9B9B9B"
                            style={styles.timestamp}
                          >
                            {formatDateTime(item?.created_at)}
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
                        )}${item?.amount || 0}`}
                      </ThemedText>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <TransactionReceipt
              data={selectedTransaction}
              onBack={() => setSelectedTransaction(null)}
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
