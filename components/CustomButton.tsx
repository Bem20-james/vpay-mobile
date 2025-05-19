import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View
} from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

const CustomButton = ({
  title,
  handlePress,
  btnStyles,
  textStyles,
  isLoading = false,
  disabled = false,
  icon
}: {
  title: string;
  handlePress: () => void;
  btnStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      style={[
        styles.customBtn,
        btnStyles,
        (isLoading || disabled) && { opacity: 0.5 }
      ]}
    >
      {isLoading ? (
        <ThemedText>
          <ActivityIndicator size="small" color="white" />
        </ThemedText>
      ) : (
        <View style={styles.contentWrap}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <ThemedText
            type="default"
            lightColor="white"
            darkColor="white"
            style={[textStyles, { fontFamily: "Inter-Bold" }]}
          >
            {title}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  customBtn: {
    backgroundColor: "#208BC9",
    borderRadius: 100,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16
  },
  contentWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrap: {
    marginRight: 8
  }
});
