import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import CustomButton from "../CustomButton";
import { Colors } from "@/constants/Colors";
import getSymbolFromCurrency from "currency-symbol-map";

interface Currency {
  code: string;
  name: string;
  flag: string;
  balance: number;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onPay: () => void;
  amount: string;
  bank: string;
  accountNumber: string;
  name: string;
  rate: string;
  snapPoints?: string[];
  title?: string;
  selectedAsset: Currency;
}

const ReviewBottomSheet = ({
  isVisible,
  onClose,
  onPay,
  rate,
  amount,
  bank,
  accountNumber,
  name,
  selectedAsset,
  snapPoints = ["60", "75%"],
  title = "Review Details"
}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const colorScheme = useColorScheme();
  const border = colorScheme === "dark" ? "#414141" : "#d7d7d7";

  useEffect(() => {
    if (isVisible) {
      sheetRef.current?.expand();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        backgroundStyle={{
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.primaryBgDark
              : Colors.light.accentBg
        }}
      >
        <BottomSheetView>
          <ThemedText
            style={styles.title}
            lightColor="#252525"
            darkColor="#9B9B9B"
          >
            {title}
          </ThemedText>
          <View style={styles.amountContainer}>
            <ThemedText style={styles.amountText}>send</ThemedText>
            <ThemedText style={styles.amount}>{amount}</ThemedText>
          </View>
          <View style={styles.container}>
            {[
              { label: "Bank", value: bank },
              { label: "Account Number", value: accountNumber },
              {
                label: "Name",
                value: name,
                transform: "uppercase"
              },
              {
                label: "Amount",
                value: getSymbolFromCurrency(selectedAsset.code) + amount
              },
              {
                label: "Transaction fee",
                value: getSymbolFromCurrency(selectedAsset.code) + rate
              }
            ].map((item, index) => (
              <View
                style={[styles.detailRow, { borderBottomColor: border }]}
                key={index}
              >
                <ThemedText style={styles.label}>{item.label}</ThemedText>
                <ThemedText
                  style={[
                    styles.value,
                    item.transform === "uppercase" && {
                      textTransform: "uppercase"
                    }
                  ]}
                >
                  {item.value}
                </ThemedText>
              </View>
            ))}

            <View
              style={[
                styles.paymentMethod,
                { backgroundColor: Colors.light.primaryDark3 }
              ]}
            >
              <ThemedText style={styles.paymentText}>payment Method</ThemedText>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  sheetRef.current?.close();
                }}
              >
                <View style={styles.flagWrapper}>
                  <ThemedText style={styles.flag}>
                    {selectedAsset.flag}
                  </ThemedText>
                </View>

                <View style={styles.labelWrapper}>
                  <ThemedText style={styles.label}>
                    {selectedAsset.name} ({selectedAsset.code})
                  </ThemedText>
                </View>

                <View style={styles.amountWrapper}>
                  <ThemedText style={styles.amount}>
                    {getSymbolFromCurrency(selectedAsset.code) || "₦"}
                    {selectedAsset.balance.toFixed(2)}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  bottom: -120,
                  left: 1,
                  right: 1
                }}
              >
                <CustomButton
                  title="Confirm"
                  handlePress={() => {}}
                  btnStyles={{ width: "100%" }}
                />
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    alignItems: "center"
  },
  title: {
    fontFamily: "Inter-Regular",
    fontSize: 15,
    textAlign: "center"
  },
  container: {
    padding: 15
  },
  amountContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 7,
    paddingVertical: 10
  },
  amountText: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    textTransform: "capitalize"
  },
  amount: {
    fontSize: 20,
    fontFamily: "Inter-Bold"
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0.5
  },
  label: {
    fontSize: 13,
    fontFamily: "Questrial"
  },
  value: {
    fontSize: 14,
    fontFamily: "Inter-Medium"
  },
  paymentMethod: {
    marginTop: 20,
    padding: 10,
    borderRadius: 7
  },
  paymentText: {
    fontSize: 13,
    fontFamily: "Questrial",
    textTransform: "capitalize"
  },
  item: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  flagWrapper: {
    backgroundColor: "#E5F9FF",
    padding: 5,
    borderRadius: 50,
    marginRight: 12
  },
  flag: {
    fontSize: 18
  },
  labelWrapper: {
    flex: 1
  }
});

export default ReviewBottomSheet;
