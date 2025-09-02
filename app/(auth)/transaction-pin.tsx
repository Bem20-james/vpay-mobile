import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "@/components/Navigator";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import images from "@/constants/Images";
import { ThemedText } from "@/components/ThemedText";
import { useSetTransactionPin } from "@/hooks/useAuthentication";
import Toast from "react-native-toast-message";
import { useLoader } from "@/contexts/LoaderContext";
import { useLocalSearchParams } from "expo-router";


interface NumberButtonProps {
  number: string;
  onPress: (number: string) => void;
}

const TransactionPinScreen: React.FC = () => {
  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;

  const [pin, setPin] = useState<string>("");
  const [firstPin, setFirstPin] = useState<string | null>(null);
  const [step, setStep] = useState<"create" | "confirm">("create");
  const maxPinLength: number = 4;
  const { setTransactionPin, loading, error } = useSetTransactionPin();
  const { showLoader, hideLoader } = useLoader();
  const { email } = useLocalSearchParams<{ email: string }>();

  const handleNumberPress = (number: string): void => {
    if (pin.length < maxPinLength) {
      const newPin = pin + number;
      setPin(newPin);

      if (newPin.length === maxPinLength) {
        if (step === "create") {
          setFirstPin(newPin);
          setPin(""); // clear for confirmation
          setStep("confirm");
        } else if (step === "confirm") {
          if (newPin === firstPin) {
            handleSetTransactionPin(newPin);
          } else {
            Toast.show({
              type: "error",
              text1: "Oopps! Transaction Pin mismatch, try again"
            });
            setFirstPin(null);
            setPin("");
            setStep("create");
          }
        }
      }
    }
  };

  const handleDelete = (): void => {
    setPin(pin.slice(0, -1));
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

  const NumberButton: React.FC<NumberButtonProps> = ({ number, onPress }) => (
    <TouchableOpacity
      style={styles.numberButton}
      onPress={() => onPress(number)}
      activeOpacity={0.7}
    >
      <ThemedText style={styles.numberText}>{number}</ThemedText>
    </TouchableOpacity>
  );

  console.log("Current PIN:", pin, "email:", email); // Debugging line

  const handleSetTransactionPin = async (finalPin: string) => {
    showLoader();
    try {
      await setTransactionPin({
        transaction_pin: finalPin,
        email
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1:
          error && typeof error === "object" && "message" in error
            ? (error as { message: string }).message
            : "Failed to set Transaction Pin"
      });
    } finally {
      hideLoader();
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView
        style={{ paddingHorizontal: 7 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {colorScheme === "dark" ? (
            <Image source={images.logolight} style={styles.logo} />
          ) : (
            <Image source={images.logodark} style={styles.logo} />
          )}
          <View style={styles.content}>
            <ThemedText style={styles.title}>
              {step === "create"
                ? "Create a transaction PIN"
                : "Confirm your transaction PIN"}
            </ThemedText>

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
              <View style={styles.dumNumberButton} />
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
        </View>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  logo: {
    width: 106,
    height: 50,
    resizeMode: "contain",
    marginHorizontal: "auto",
    marginVertical: 10
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 0
  },
  title: {
    fontSize: 16,
    fontFamily: "Questrial",
    marginBottom: 50
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
    borderColor: "#c2c2c3ff",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  dumNumberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  numberText: {
    fontSize: 24,
    fontWeight: "500"
  },
  deleteButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#208BC9",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default TransactionPinScreen;
