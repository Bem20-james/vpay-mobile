import React, { useRef } from "react";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useColorScheme } from "@/hooks/useColorScheme";
import { styles } from "../styles/formfield"; // Reuse or create new styles

interface GenericBottomSheetProps<T> {
  isVisible: boolean;
  onClose: () => void;
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  title?: string;
  onSelect: (item: T) => void;
  snapPoints?: string[];
  isLoading?: boolean;
}

const GenericBottomSheet = <T,>({
  isVisible,
  onClose,
  data,
  renderItem,
  keyExtractor,
  title = "Select an Option",
  onSelect,
  snapPoints = ["40%", "55%"],
  isLoading = false
}: GenericBottomSheetProps<T>) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const colorScheme = useColorScheme();

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
        <ThemedView style={styles.bottomSheetHeader}>
          <ThemedText style={styles.bottomSheetTitle}>{title}</ThemedText>
        </ThemedView>
        <BottomSheetFlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={() => {
                onSelect(item);
                bottomSheetRef.current?.close();
              }}
            >
              <ThemedView style={styles.bottomSheetItemCon}>
                {isLoading ? <ActivityIndicator size={20} /> : renderItem(item)}
              </ThemedView>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.bottomSheetContent}
        />
      </BottomSheet>
    </Portal>
  );
};

export default GenericBottomSheet;
