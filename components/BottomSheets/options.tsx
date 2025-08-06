import React, { useRef } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "../ThemedText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { btmSheetStyles } from "@/styles/bottomsheets";

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
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.primaryBgDark
              : Colors.light.accentBg
        }}
      >
        <ThemedText
          style={btmSheetStyles.title}
          lightColor="#252525"
          darkColor="#F8F8F8"
        >
          {title}
        </ThemedText>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item, index) =>
            item.id !== undefined ? item.id.toString() : `option-${index}`
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                btmSheetStyles.sheetItem,
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
                <View style={btmSheetStyles.sheetCon}>
                  {item.icon && (
                    <MaterialCommunityIcons
                      name={item.icon}
                      size={20}
                      color={
                        item.iconColor ||
                        (colorScheme === "dark" ? "#FFFFFF" : "#000000")
                      }
                      style={[
                        btmSheetStyles.sheetIcon,
                        { backgroundColor: item.iconBg || "#EDFDFF" }
                      ]}
                    />
                  )}
                  <ThemedText
                    darkColor="#F8F8F8"
                    lightColor="#252525"
                    style={btmSheetStyles.sheetLabel}
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
          contentContainerStyle={btmSheetStyles.bottomSheetContent}
        />
      </BottomSheet>
    </Portal>
  );
};

export default OptionsBottomSheet;
