import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";

export const TransactionSkeleton = () => {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, i) => (
        <MotiView
          key={i}
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: true
          }}
          style={styles.skeletonItem}
        >
          <View style={styles.icon} />
          <View style={styles.textContainer}>
            <View style={styles.lineShort} />
            <View style={styles.lineLong} />
          </View>
          <View style={styles.amount} />
        </MotiView>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 10
  },
  skeletonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  lineShort: {
    width: "40%",
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    marginBottom: 6
  },
  lineLong: {
    width: "70%",
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4
  },
  amount: {
    width: 50,
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 4
  }
});
