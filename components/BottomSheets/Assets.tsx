import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import getSymbolFromCurrency from "currency-symbol-map";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Currency {
  code: string;
  name: string;
  flag: string;
  balance: number;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  currencies: Currency[];
  onSelectCurrency: (currency: Currency) => void;
  snapPoints?: string[];
  selectedCurrency: Currency;
  title?: string;
  isLoading?: boolean;
}

const AssetsBottomSheet = ({
  isVisible,
  onClose,
  currencies,
  onSelectCurrency,
  selectedCurrency,
  snapPoints = ["35%"],
  title = "Select Currency",
  isLoading = false
}: Props) => {
  const colorScheme = useColorScheme();
  const sheetRef = useRef<BottomSheet>(null);

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
        <View style={styles.header}>
          <ThemedText style={styles.title}>{title}</ThemedText>
        </View>
        <BottomSheetFlatList
          data={currencies}
          keyExtractor={(item) => item.code}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const isSelected = item.code === selectedCurrency.code;

            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelectCurrency(item);
                  sheetRef.current?.close();
                }}
              >
                <View style={styles.flagWrapper}>
                  <ThemedText style={styles.flag}>{item.flag}</ThemedText>
                </View>

                <View style={styles.labelWrapper}>
                  <ThemedText style={styles.label}>
                    {item.name} ({item.code})
                  </ThemedText>
                </View>

                <View style={styles.amountWrapper}>
                  <ThemedText style={styles.amount}>
                    {getSymbolFromCurrency(item.code) || "₦"}
                    {item.balance.toFixed(2)}
                  </ThemedText>
                  {isSelected && (
                    <FontAwesome
                      name="dot-circle-o"
                      size={15}
                      color="#208BC9"
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    alignItems: "center"
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 16
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.7,
    borderBottomColor: "#000000"
  },
  label: {
    fontSize: 15,
    fontFamily: "Inter-Medium"
  },
  amount: {
    fontSize: 14,
    color: "#9B9B9B",
    fontFamily: "Questrial"
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  flagWrapper: {
    backgroundColor: "#E5F9FF",
    padding: 6,
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

export default AssetsBottomSheet;
