import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Navigator from "./Navigator";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import images from "@/constants/Images";
const { width } = Dimensions.get("window");

const TransactionReceipt = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const isDark = colorScheme === "dark";
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor, height: "100%" }}>
      <View style={styles.container}>
        <View>
          <ThemedText style={styles.amount}>-₦100.00</ThemedText>
          <ThemedText style={styles.dateTime}>Today at 9:45 am</ThemedText>
        </View>

        <View
          style={[
            styles.detailsContainer,
            { backgroundColor: isDark ? "#161622" : "#FFFFFF" }
          ]}
        >
          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Transaction type</ThemedText>
            <ThemedText style={styles.detailValue}>Airtime purchase</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Network</ThemedText>
            <View style={styles.networkContainer}>
              <Image source={images.airtel} style={styles.image} />
              <ThemedText style={styles.detailValue}>Airtel</ThemedText>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Service fee</ThemedText>
            <ThemedText style={styles.detailValue}>₦0.00</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Status</ThemedText>
            <ThemedText style={[styles.detailValue, styles.statusSuccess]}>
              Successful
            </ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Session ID</ThemedText>
            <ThemedText style={styles.detailValue}>8765335</ThemedText>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.detailLabel}>Total</ThemedText>
            <ThemedText style={styles.detailValue}>₦100.00</ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionBox}
          onPress={() => {}}
          activeOpacity={0.7}
        >
          <View style={styles.colBox}>
            <View style={styles.row}>
              <View style={[styles.iconWrapper]}>
                <MaterialIcons
                  name={"report-problem"}
                  size={15}
                  color={"#D22C1F"}
                />
              </View>
              <View>
                <ThemedText
                  lightColor="#252525"
                  darkColor="#FFFFFF"
                  style={styles.label}
                >
                  {"Report Transaction"}
                </ThemedText>
              </View>
            </View>
            <MaterialIcons name={"chevron-right"} size={20} color={"#208BCD"} />
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 100, width: "100%" }}>
          <CustomButton
            title="Share"
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ width: "100%" }}
            icon={
              <MaterialIcons name="ios-share" size={20} color={"#FFFFFF"} />
            }
          />
          <CustomButton
            title="Download Reciept"
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ width: "100%", marginTop: 10 }}
            variant="secondary"
            icon={<MaterialIcons name="download" size={20} color={"#208BC9"} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  amount: {
    fontSize: 25,
    fontFamily: "Inter-Bold",
    color: "#BF281C"
  },
  dateTime: {
    fontSize: 14,
    fontFamily: "Questrial",
    marginBottom: 30
  },
  detailsContainer: {
    width: "100%",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  detailLabel: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: "#9B9B9B"
  },
  detailValue: {
    fontFamily: "Inter-Medium",
    fontSize: 15,
    fontWeight: "500",
  },
  networkContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 100
  },
  statusSuccess: {
    color: "#66C61C",
    backgroundColor: "#F0F9E8",
    paddingHorizontal: 5,
    borderRadius: 30
  },
  flex: {
    flexDirection: "row",
    alignItems: "center"
  },
  actionBox: {
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 10,
    padding: 10
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  label: {
    fontFamily: "Questrial",
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
    padding: 3,
    borderRadius: 30,
    marginBottom: 8,
    backgroundColor: "#FBEAE9"
  }
});

export default TransactionReceipt;
