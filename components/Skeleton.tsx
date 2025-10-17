import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";

interface SkeletonRowProps {
  circleSize?: number;
  lineShortWidth?: string | number;
  lineLongWidth?: string | number;
  style?: object;
}

const SkeletonRow: React.FC<SkeletonRowProps> = ({
  circleSize = 35,
  lineShortWidth = "50%",
  lineLongWidth = "80%",
  style,
}) => {
  return (
    <MotiView
      from={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ loop: true, type: "timing", duration: 1000 }}
      style={[styles.container, style]}
    >
      <View
        style={[styles.circle, { width: circleSize, height: circleSize }]}
      />
      <View style={styles.lines}>
        <View style={[styles.line, { width: lineShortWidth }]} />
        <View style={[styles.line, { width: lineLongWidth }]} />
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginVertical: 8,
  },
  circle: {
    borderRadius: 50,
    backgroundColor: "#333",
  },
  lines: {
    flex: 1,
    gap: 6,
  },
  line: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 4,
  },
});

export default SkeletonRow;
