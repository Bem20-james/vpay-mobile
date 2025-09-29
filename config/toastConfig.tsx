import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}

const toastConfig = {
  error: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.toastContainer, styles.errorContainer]}>
      {text1 && <Text style={styles.errorText}>{text1}</Text>}
      {text2 && <Text style={styles.secondaryText}>{text2}</Text>}
    </View>
  ),
  success: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.toastContainer, styles.successContainer]}>
      {text1 && <Text style={styles.successText}>{text1}</Text>}
      {text2 && <Text style={styles.secondaryText}>{text2}</Text>}
    </View>
  ),
  delete: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.toastContainer, styles.errorContainer]}>
      {text1 && <Text style={styles.errorText}>{text1}</Text>}
      {text2 && <Text style={styles.secondaryText}>{text2}</Text>}
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: 50,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorContainer: {
    backgroundColor: "#161622",
    borderColor: "#D92D20",
  },
  successContainer: {
    backgroundColor: "#ECFDF3",
    borderColor: "#ABEFC6",
  },
  errorText: {
    color: "#D92D20",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Questrial",
  },
  successText: {
    color: "#067647",
    fontSize: 12,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#D92D20",
    fontSize: 12,
    marginLeft: 8,
  },
});

export default toastConfig;
