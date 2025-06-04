import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { ThemedText } from "./ThemedText";

interface NavigatorProps {
  title?: string;
  showBackIcon?: boolean;
  backIconColor?: string;
  closeIconColor?: string;
  showCloseIcon?: boolean;
  onClose?: () => void;
  onBack?: () => void;
  backPath?: string;
}

const Navigator: React.FC<NavigatorProps> = ({
  title = "",
  showBackIcon = true,
  backIconColor = "#208BC9",
  showCloseIcon = false,
  closeIconColor = "#208BC9",
  onClose,
  onBack,
  backPath
}) => {
  const navigation = useNavigation();
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      router.push(backPath as any);
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {showBackIcon ? (
        <TouchableOpacity onPress={handleBack} style={styles.icon}>
          <FontAwesome6 name="arrow-left-long" size={16} color={backIconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}

      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>

      {showCloseIcon ? (
        <TouchableOpacity onPress={onClose} style={styles.icon}>
          <MaterialIcons name="close" size={24} color={closeIconColor} />
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
  },
  icon: {
    backgroundColor: "#E9F7FF",
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 34,
    height: 34, 
  },
});