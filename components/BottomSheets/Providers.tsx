import React, { useMemo, useRef } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";

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
  const colorScheme = useColorScheme();
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["40%", "70%"], []);

  if (!isVisible) return null;

  return (
    <BottomSheet
      ref={sheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backgroundStyle={{
        backgroundColor:
          colorScheme === "dark"
            ? Colors.dark.background
            : Colors.light.background
      }}
      handleIndicatorStyle={{
        backgroundColor: "#ccc"
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
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              {item.image && (
                <Image
                  source={{ uri: item.image }}
                  style={styles.image}
                  resizeMode="contain"
                />
              )}
              <ThemedText
                style={styles.name}
                lightColor="#252525"
                darkColor="#f1f1f1"
              >
                {item.provider_name}
              </ThemedText>
            </TouchableOpacity>
          )}
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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd"
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 12
  },
  name: {
    fontSize: 14,
    fontFamily: "Inter-Medium"
  }
});

export default ProvidersBottomSheet;
