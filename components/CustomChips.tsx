import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  View
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { MotiView } from "moti";
import BottomSheet from "@gorhom/bottom-sheet";
import { SERVER_IMAGE_URL } from "@/constants/Paths";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Item {
  id: string;
  provider_name: string;
  image?: any;
}

interface CustomChipProps {
  items: Item[];
  selectedItem?: string | number | null;
  onSelect: (item: Item) => void;
  containerStyle?: object;
  itemStyle?: object;
  isLoading?: boolean;
}

const CustomChip: React.FC<CustomChipProps> = ({
  items,
  selectedItem,
  onSelect,
  containerStyle,
  itemStyle,
  isLoading = false
}) => {
  const colorScheme = useColorScheme();
  const BgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;

  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
    bottomSheetRef.current?.expand();
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    bottomSheetRef.current?.close();
  };

  const renderItem = ({ item }: { item: Item }) => {
    const isSelected = selectedItem === item.id;

    return (
      <TouchableOpacity
        style={[
          { backgroundColor: BgColor },
          styles.itemContainer,
          isSelected && styles.selectedItem,
          itemStyle
        ]}
        onPress={() => onSelect(item)}
      >
        {item.image && (
          <Image
            source={{ uri: `${SERVER_IMAGE_URL}/${item?.image}` }}
            style={styles.image}
            resizeMode="contain"
          />
        )}

        <ThemedText
          lightColor="#252525"
          darkColor="#F8F8F8"
          style={styles.text}
        >
          {item.provider_name}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  const renderSkeleton = () => {
    return Array.from({ length: 4 }).map((_, index) => (
      <MotiView
        key={index}
        style={[styles.itemContainer, { backgroundColor: BgColor }]}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{
          type: "timing",
          duration: 800,
          loop: true
        }}
      >
        <MotiView style={styles.skeletonIcon} />
        <MotiView style={styles.skeletonText} />
      </MotiView>
    ));
  };

  // Show first 3 providers + "More"
  const visibleItems = items.slice(0, 3);

  return (
    <>
      <View style={[styles.list, containerStyle]}>
        {isLoading ? (
          <View style={styles.gridContent}>{renderSkeleton()}</View>
        ) : (
          <FlatList
            data={[...visibleItems, { id: "more", provider_name: "More" }]}
            renderItem={({ item }) =>
              item.provider_name === "More" && visibleItems ? (
                <TouchableOpacity
                  onPress={openBottomSheet}
                  style={[
                    styles.itemContainer,
                    itemStyle,
                    { backgroundColor: BgColor }
                  ]}
                >
                  <MaterialIcons
                    name="more-horiz"
                    size={25}
                    color={"#218DC9"}
                    style={styles.imageI}
                  />
                  <ThemedText
                    lightColor="#252525"
                    darkColor="#F8F8F8"
                    style={styles.text}
                  >
                    More
                  </ThemedText>
                </TouchableOpacity>
              ) : (
                renderItem({ item })
              )
            }
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            key={"grid"}
            contentContainerStyle={styles.gridContent}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />
        )}
      </View>

      {/* Gorhom Bottom Sheet for More Items */}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["50%"]}
        enablePanDownToClose
        onClose={closeBottomSheet}
      >
        <View style={{ padding: 15 }}>
          <ThemedText
            style={{
              fontSize: 16,
              fontFamily: "Inter-SemiBold",
              marginBottom: 10
            }}
          >
            More Providers
          </ThemedText>

          <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => String(item.id)}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: 20 }}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />
        </View>
      </BottomSheet>
    </>
  );
};

export default CustomChip;

const styles = StyleSheet.create({
  list: {
    flexGrow: 0
  },
  gridContent: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    borderRadius: 100,
    width: (SCREEN_WIDTH - 70) / 2,
    height: 45
  },
  selectedItem: {
    borderWidth: 0.7,
    borderColor: "#208BC9",
    backgroundColor: "#0A3A52"
  },
  icon: {
    marginRight: 10
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
    borderRadius: 100,
    resizeMode: "contain"
  },
  imageI: {
    width: 25,
    height: 25,
    marginRight: 10,
    borderRadius: 100,
    resizeMode: "contain",
    backgroundColor: "#E1F5FE"
  },
  text: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    fontWeight: "500"
  },
  skeletonIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ccc",
    marginRight: 10
  },
  skeletonText: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ccc"
  }
});
