import React, { useRef } from "react";
import { TouchableOpacity, View, ActivityIndicator } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useColorScheme } from "@/hooks/useColorScheme";
import CountryFlag from "react-native-country-flag";
import { ThemedText } from "../ThemedText";
import { styles } from "../../styles/formfield";
import { Colors } from "@/constants/Colors";

export type CountryItem = {
  id?: number;
  country_name: string;
  country_code: string;
  country_dial_code: string;
};

interface CountryBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  data: CountryItem[];
  onSelect: (item: CountryItem) => void;
  isLoading?: boolean;
  title?: string;
  snapPoints?: string[];
}

const CountryBottomSheet = ({
  isVisible,
  onClose,
  data,
  onSelect,
  isLoading = false,
  title = "Select Country",
  snapPoints = ["30%", "50%"]
}: CountryBottomSheetProps) => {
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
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.primaryBgDark
              : Colors.light.accentBg
        }}
      >
        <ThemedText style={styles.bottomSheetTitle}>{title}</ThemedText>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item, index) =>
            item.id !== undefined ? item.id.toString() : `country-${index}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={() => {
                onSelect(item);
                bottomSheetRef.current?.close();
              }}
            >
              {isLoading ? (
                <ActivityIndicator size={20} />
              ) : (
                <View style={styles.bottomSheetItemCon}>
                  <CountryFlag
                    isoCode={item.country_code}
                    size={15}
                    style={{ borderRadius: 2, marginRight: 5 }}
                  />
                  <ThemedText style={styles.bottomSheetItemText}>
                    {item.country_name}
                  </ThemedText>
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

export default CountryBottomSheet;
