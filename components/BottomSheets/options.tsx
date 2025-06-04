import React, { useRef } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export type OptionItem = {
  id?: number;
  label: string;
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  iconColor?: string;
  chevron?: boolean;
  route?: string;
  iconBg?: string;
};

interface OptionsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  data: OptionItem[];
  isLoading?: boolean;
  title?: string;
  snapPoints?: string[];
}

const OptionsBottomSheet = ({
  isVisible,
  onClose,
  data,
  isLoading = false,
  title = "Select Option",
  snapPoints = ["30%", "30%"]
}: OptionsBottomSheetProps) => {
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
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item, index) =>
            item.id !== undefined ? item.id.toString() : `option-${index}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.sheetItem,
                {
                  borderBottomColor:
                    colorScheme === "dark" ? "#333333" : "#F8F8F8"
                }
              ]}
              onPress={() => {
                if (item.route) {
                  router.push(item.route as any);
                }
                bottomSheetRef.current?.close();
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={20} />
              ) : (
                <View style={styles.sheetCon}>
                  {item.icon && (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={20}
                      color={
                        item.iconColor ||
                        (colorScheme === "dark" ? "#FFFFFF" : "#000000")
                      }
                      style={[
                        styles.sheetIcon,
                        { backgroundColor: item.iconBg || "#EDFDFF" }
                      ]}
                    />
                  )}
                  <ThemedText
                    darkColor="#F8F8F8"
                    lightColor="#252525"
                    style={styles.sheetLabel}
                  >
                    {item.label}
                  </ThemedText>
                  {item.chevron && (
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={20}
                      color={"#208BC9"}
                      style={{ marginLeft: "auto" }}
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.bottomSheetContent}
        />
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

export default OptionsBottomSheet;
