import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";
import images from "@/constants/Images";
import { trnxHistory as styles } from "@/styles/trnxstatus";
import { Colors } from "@/constants/Colors";

interface Props {
  data: any;
  onBack: () => void;
}

const TransactionReceipt = ({ data, onBack }: Props) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const router = useRouter();

  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor, height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <ThemedText style={styles.amount}>-₦100.00</ThemedText>
            <ThemedText style={styles.dateTime}>Today at 9:45 am</ThemedText>
          </View>

          <View
            style={[
              styles.detailsContainer,
              {
                backgroundColor: isDark
                  ? Colors.dark.accentBg
                  : Colors.light.accentBg
              }
            ]}
          >
            <View style={styles.detailRow}>
              <ThemedText style={styles.detailLabel}>
                Transaction type
              </ThemedText>
              <ThemedText style={styles.detailValue}>
                Airtime purchase
              </ThemedText>
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
              <MaterialIcons
                name={"chevron-right"}
                size={20}
                color={"#208BCD"}
              />
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
              icon={
                <MaterialIcons name="download" size={20} color={"#208BC9"} />
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TransactionReceipt;
