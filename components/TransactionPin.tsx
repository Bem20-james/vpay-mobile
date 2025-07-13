import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const TransactionPinScreen: React.FC = () => {
  const [pin, setPin] = useState<string>("");
  const maxPinLength: number = 4;

  const handleNumberPress = (number: string): void => {
    if (pin.length < maxPinLength) {
      setPin(pin + number);
    }
  };

  const handleDelete = (): void => {
    setPin(pin.slice(0, -1));
  };

  const handleBack = (): void => {
    // Handle back navigation (can integrate with React Navigation)
    console.log("Back pressed");
  };

  const renderPinDots = (): JSX.Element[] => {
    return Array.from({ length: maxPinLength }, (_, index) => (
      <View
        key={index}
        style={[
          styles.pinDot,
          { backgroundColor: index < pin.length ? "#3B82F6" : "#BFDBFE" }
        ]}
      />
    ));
  };

  interface NumberButtonProps {
    number: string;
    onPress: (number: string) => void;
  }

  const NumberButton: React.FC<NumberButtonProps> = ({ number, onPress }) => (
    <TouchableOpacity
      style={styles.numberButton}
      onPress={() => onPress(number)}
      activeOpacity={0.7}
    >
      <Text style={styles.numberText}>{number}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <View style={[styles.logoSquare, styles.logoSquare1]} />
            <View style={[styles.logoSquare, styles.logoSquare2]} />
          </View>
          <Text style={styles.logoText}>Pay</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Create a transaction PIN</Text>

        {/* PIN dots */}
        <View style={styles.pinDotsContainer}>{renderPinDots()}</View>

        {/* Keypad */}
        <View style={styles.keypad}>
          {/* Row 1 */}
          <NumberButton number="1" onPress={handleNumberPress} />
          <NumberButton number="2" onPress={handleNumberPress} />
          <NumberButton number="3" onPress={handleNumberPress} />
          {/* Row 2 */}
          <NumberButton number="4" onPress={handleNumberPress} />
          <NumberButton number="5" onPress={handleNumberPress} />
          <NumberButton number="6" onPress={handleNumberPress} />
          {/* Row 3 */}
          <NumberButton number="7" onPress={handleNumberPress} />
          <NumberButton number="8" onPress={handleNumberPress} />
          <NumberButton number="9" onPress={handleNumberPress} />
          {/* Row 4 */}
          <View /> {/* Empty space */}
          <NumberButton number="0" onPress={handleNumberPress} />
          <TouchableOpacity
            style={[
              styles.deleteButton,
              { opacity: pin.length === 0 ? 0.5 : 1 }
            ]}
            onPress={handleDelete}
            disabled={pin.length === 0}
            activeOpacity={0.7}
          >
            <Ionicons name="backspace" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  backButton: {
    padding: 8,
    borderRadius: 12
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 64
  },
  logo: {
    flexDirection: "row",
    alignItems: "center"
  },
  logoSquare: {
    width: 32,
    height: 32,
    transform: [{ rotate: "45deg" }],
    borderRadius: 4
  },
  logoSquare1: {
    backgroundColor: "#3B82F6"
  },
  logoSquare2: {
    backgroundColor: "#93C5FD",
    marginLeft: -8
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginLeft: 8
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 48
  },
  pinDotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 64
  },
  pinDot: {
    width: 12,
    height: 12,
    borderRadius: 6
  },
  keypad: {
    width: "100%",
    maxWidth: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 16
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center"
  },
  numberText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#1F2937"
  },
  deleteButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TransactionPinScreen;
