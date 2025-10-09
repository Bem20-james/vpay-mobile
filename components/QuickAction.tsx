import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface ActionItem {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  backgroundColor: string;
  iconColor: string;
  route?: string;
  onPress?: () => void;
}

interface Props {
  title?: string;
  actions: ActionItem[];
}

const QuickActionsSection: React.FC<Props> = ({ title = "", actions }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.light.primaryDark3 : "#ffffff";

  return (
    <View style={styles.container}>
      <ThemedText lightColor="#9B9B9B" darkColor="#9B9B9B" style={styles.title}>
        {title}
      </ThemedText>
      <FlatList
        data={actions}
        keyExtractor={(item) => item.label}
        numColumns={3}
        columnWrapperStyle={styles.row}
        nestedScrollEnabled={true}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[{ backgroundColor: bgColor }, styles.actionBox]}
            onPress={() => {
              if (item.onPress) {
                item.onPress();
              } else if (item.route) {
                router.push(item.route as any);
              }
            }}
            activeOpacity={0.7}
          >
            <ThemedView
              style={[
                styles.iconWrapper,
                { backgroundColor: item.backgroundColor }
              ]}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={20}
                color={item.iconColor}
              />
            </ThemedView>
            <ThemedText
              lightColor="#252525"
              darkColor="#F8F8F8"
              style={styles.label}
            >
              {item.label}
            </ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  title: {
    fontFamily: "Inter-Medium",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0
  },
  row: {
    flex: 1,
    justifyContent: "flex-start",
    gap: 12,
    marginRight: 0
  },

  actionBox: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    padding: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 8
  },
  label: {
    fontFamily: "Inter-Bold",
    fontWeight: 500,
    fontSize: 11,
    letterSpacing: 0,
    textAlign: "center"
  }
});

export default QuickActionsSection;
export type { ActionItem };
