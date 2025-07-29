import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { trnxHistory2 } from "@/assets/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getSymbolFromCurrency from "currency-symbol-map";
import TransactionReceipt from "@/components/TransactionReciept";

const TransactionScreen = ({}) => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const [showMsg, setShowMsg] = React.useState(false);

  const handlePress = () => {
    setShowMsg(!showMsg);
  };

  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor, height: "100%" }}>
      <Navigator title={"Transactions"} />
      <View style={styles.container}>
        {!showMsg ? (
          <FlatList
            data={trnxHistory2}
            keyExtractor={(item) => item.id}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[{ backgroundColor: bgColor }, styles.actionBox]}
                onPress={() => handlePress()}
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
        ) : (
          <View style={{ paddingHorizontal: 10 }}>
            <TransactionReceipt />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default TransactionScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 20
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
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  label: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    letterSpacing: 0
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#218DC9",
    paddingVertical: 2
  },
  timestamp: {
    fontFamily: "Questrial",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: 0
  },
  message: {
    fontFamily: "Inter-Regular",
    fontWeight: 500,
    fontSize: 14,
    marginVertical: 7,
    letterSpacing: 0
  },
  amount: {
    fontFamily: "Inter-SemiBold",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0
  },
  colBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },

  iconWrapper: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 8
  }
});
