import React, { useRef } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface VerificationBtmSheetProps {
  isVisible: boolean;
  onClose: () => void;
  isLoading?: boolean;
  title?: string;
  snapPoints?: string[];
}

const VerificationBtmSheet = ({
  isVisible,
  onClose,
  isLoading = false,
  title = "Select Option",
  snapPoints = ["30%", "30%"]
}: VerificationBtmSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const colorScheme = useColorScheme();
  const router = useRouter();

  if (!isVisible) return null;

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF"
        }}
      >
        <ThemedView style={styles.sheetHeader}>
          <ThemedText
            lightColor="#252525"
            darkColor="#F8F8F8"
            style={styles.title}
          >
            {title}
          </ThemedText>
        </ThemedView>
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  sheetHeader: {
    padding: 10
  },
  title: {
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontSize: 16
  },
  sheetItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1
  },
  sheetCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },
  sheetIcon: {
    borderRadius: 100,
    padding: 10
  },
  sheetLabel: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold"
  },
  bottomSheetContent: {
    paddingBottom: 24
  }
});

export default VerificationBtmSheet;
