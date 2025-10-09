import React from "react";
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface Item {
  id: string | number;
  provider_name: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
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
        {item.icon ? (
          <MaterialIcons
            name={item.icon}
            size={24}
            color={"#218DC9"}
            style={styles.icon}
          />
        ) : item.image ? (
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        ) : null}

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

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      key={"grid"}
      style={[styles.list, containerStyle]}
      contentContainerStyle={styles.gridContent}
      nestedScrollEnabled={true}
      scrollEnabled={false}
    />
  );
};

export default CustomChip;

const styles = StyleSheet.create({
  list: {
    flexGrow: 0
  },
  gridContent: {
    paddingHorizontal: 5,
    paddingVertical: 5
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
  text: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter-SemiBold",
    fontWeight: "500"
  }
});
