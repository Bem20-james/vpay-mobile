import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import CustomButton from "../CustomButton";
import { Ionicons } from "@expo/vector-icons";
import QRCode from "react-native-qrcode-svg";

interface FiatItem {
  bank: string;
  account_name: string;
  account_number: string;
  balance: string;
}

interface CryptoItem {
  token_name: string;
  token_symbol: string;
  address: string;
  balance: string;
}

type Item = FiatItem | CryptoItem;

interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedType: "fiat" | "crypto";
  selectedItem: Item | null;
  snapPoints?: string[];
  title?: string;
  label?: React.ReactNode;
}

const AccountsBottomSheet: React.FC<Props> = ({
  isVisible,
  onClose,
  selectedItem,
  selectedType,
  snapPoints = ["50", "60%"],
  title = "",
  label
}) => {
  const colorScheme = useColorScheme();
  const sheetRef = useRef<BottomSheet>(null);
  const isDark = colorScheme === "dark";

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
        <BottomSheetView style={{ marginHorizontal: 10 }}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>{title}</ThemedText>
            <ThemedText style={styles.label}>{label}</ThemedText>
          </View>
          <View
            style={[
              styles.customContent,
              { backgroundColor: isDark ? "#0A2D4A" : "#F5F5F5" }
            ]}
          >
            {selectedType === "fiat" ? (
              <View style={{ gap: 5 }}>
                <ThemedText style={styles.option}>Account Number.</ThemedText>
                <ThemedText style={styles.value}>
                  {selectedItem?.account_number}
                </ThemedText>

                <ThemedText style={styles.option}>Bank</ThemedText>
                <ThemedText style={styles.value}>
                  {selectedItem?.bank}
                </ThemedText>

                <ThemedText style={styles.option}>Account Name</ThemedText>
                <ThemedText style={styles.value}>
                  {selectedItem?.account_name}
                </ThemedText>
              </View>
            ) : (
              <View style={styles.qrContainer}>
                <QRCode
                  value={selectedItem?.address}
                  size={200}
                  color="#000000"
                  backgroundColor="#ffffff"
                />
              </View>
            )}
          </View>
          <View style={styles.noticeBox}>
            <Ionicons name="warning-outline" size={20} color={"#D22C1F"} />
            <ThemedText style={styles.noticeText}>
              All existing account type are current. Swipe to see alternative
              bank accounts.
            </ThemedText>
          </View>

          <CustomButton
            title="Got it"
            handlePress={() => {}}
            btnStyles={{
              width: "100%",
              marginTop: 20
            }}
          />
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
    fontFamily: "Inter-Bold",
    fontSize: 16
  },
  label: {
    fontFamily: "Questrial",
    fontSize: 12,
    textAlign: "center"
  },

  option: {
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    color: "#999"
  },
  value: {
    fontSize: 15,
    fontFamily: "Inter-Bold",
    marginBottom: 5
  },
  customContent: {
    padding: 20,
    gap: 7,
    marginHorizontal: 7,
    borderRadius: 6
  },
  noticeBox: {
    backgroundColor: "#FFFABE99",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 6,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 5
  },
  noticeText: {
    color: "#423D00CC",
    fontSize: 13,
    fontFamily: "Questrial",
    lineHeight: 15
  },
  qrContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center"
  }
});

export default AccountsBottomSheet;
