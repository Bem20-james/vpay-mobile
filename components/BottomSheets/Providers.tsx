import React, { useMemo, useRef } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { btmSheetStyles } from "@/styles/bottomsheets";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import { useTheme } from "@/contexts/ThemeContexts";

interface ProvidersBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  data: any[];
  onSelect: (provider: any) => void;
  loading?: boolean;
}

const ProvidersBottomSheet: React.FC<ProvidersBottomSheetProps> = ({
  isVisible,
  onClose,
  data,
  onSelect,
  loading = false
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["30%", "40%"], []);

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      handleIndicatorStyle={btmSheetStyles.indicatorHandle}
      backgroundStyle={{
        backgroundColor: isDark
          ? Colors.dark.primaryBgDark
          : Colors.light.accentBg
      }}
    >
      <View style={styles.header}>
        <ThemedText
          style={styles.headerText}
          lightColor="#000"
          darkColor="#fff"
        >
          Select Provider
        </ThemedText>
      </View>

      {loading ? (
        <ThemedText style={{ textAlign: "center", marginTop: 20 }}>
          Loading providers...
        </ThemedText>
      ) : (
        <BottomSheetFlatList
          data={data}
          keyExtractor={(item, index) =>
            item?.id?.toString() ||
            item?.code?.toString() ||
            item?.slug ||
            `provider-${index}`
          }
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          renderItem={({ item }) => {
            const name = item?.provider_name || "Unknown Provider";
            const imageUri = item?.image
              ? `${SERVER_IMAGE_URL}/${item.image}`
              : null;

            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                {imageUri ? (
                  <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                ) : (
                  <View style={styles.placeholderIcon} />
                )}

                <View style={{ flex: 1 }}>
                  <ThemedText
                    style={styles.name}
                    lightColor="#252525"
                    darkColor="#f1f1f1"
                  >
                    {name}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 10
  },
  headerText: {
    fontSize: 16,
    fontFamily: "Inter-SemiBold"
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 0.7,
    borderBottomColor: "#000000"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 12
  },
  placeholderIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 12,
    backgroundColor: "#d9d9d9"
  },
  name: {
    fontSize: 14,
    fontFamily: "Inter-Medium"
  },
  subtitle: {
    fontSize: 12,
    marginTop: 3,
    fontFamily: "Inter-Regular"
  }
});

export default ProvidersBottomSheet;
