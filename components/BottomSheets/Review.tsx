import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import CustomButton from "../CustomButton";
import { Colors } from "@/constants/Colors";
import getSymbolFromCurrency from "currency-symbol-map";
import { btmSheetStyles } from "@/styles/bottomsheets";

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
            style={btmSheetStyles.title}
            lightColor="#252525"
            darkColor="#9B9B9B"
          >
            {title}
          </ThemedText>
          <View style={btmSheetStyles.amountContainer}>
            <ThemedText style={btmSheetStyles.amountText}>send</ThemedText>
            <ThemedText style={btmSheetStyles.amount}>{amount}</ThemedText>
          </View>
          <View style={btmSheetStyles.container}>
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
                style={[
                  btmSheetStyles.detailRow,
                  { borderBottomColor: border }
                ]}
                key={index}
              >
                <ThemedText style={btmSheetStyles.label}>
                  {item.label}
                </ThemedText>
                <ThemedText
                  style={[
                    btmSheetStyles.value,
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
                btmSheetStyles.paymentMethod,
                { backgroundColor: Colors.light.primaryDark3 }
              ]}
            >
              <ThemedText style={btmSheetStyles.paymentText}>
                payment Method
              </ThemedText>
              <TouchableOpacity
                style={btmSheetStyles.item}
                onPress={() => {
                  sheetRef.current?.close();
                }}
              >
                <View style={btmSheetStyles.flagWrapper}>
                  <ThemedText style={btmSheetStyles.flag}>
                    {selectedAsset.flag}
                  </ThemedText>
                </View>

                <View style={btmSheetStyles.labelWrapper}>
                  <ThemedText style={btmSheetStyles.label}>
                    {selectedAsset.name} ({selectedAsset.code})
                  </ThemedText>
                </View>

                <View style={btmSheetStyles.amountWrapper}>
                  <ThemedText style={btmSheetStyles.amount}>
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

export default ReviewBottomSheet;
