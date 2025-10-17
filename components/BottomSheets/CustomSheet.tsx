import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { btmSheetStyles } from "@/styles/bottomsheets";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  items: string[];
  selectedItem: string;
  onSelectItem: (item: string) => void;
  snapPoints?: string[];
  title?: string;
}

const CustomSheet: React.FC<Props> = ({
  isVisible,
  onClose,
  items,
  selectedItem,
  onSelectItem,
  snapPoints = ["33%"],
  title = "Select Item"
}) => {
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
        handleIndicatorStyle={btmSheetStyles.indicatorHandle}
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
          data={items}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => {
            const isSelected = item === selectedItem;

            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelectItem(item);
                  sheetRef.current?.close();
                }}
              >
                <ThemedText style={styles.label}>{item}</ThemedText>
                {isSelected && (
                  <FontAwesome name="dot-circle-o" size={20} color="#208BC9" />
                )}
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
    fontFamily: "Inter-SemiBold"
  }
});

export default CustomSheet;
