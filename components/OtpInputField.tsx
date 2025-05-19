import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TextInput, Text, Pressable } from "react-native";

const OTPInputField = ({ length = 4, onCodeFilled, autoFocus = true }) => {
  const [code, setCode] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  // Focus on first input when component mounts
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0].focus();
      }, 100);
    }
  }, [autoFocus]);

  const handleChangeText = (text, index) => {
    // Copy the current code array
    const newCode = [...code];

    // Update the current position with the new value
    newCode[index] = text.slice(-1);
    setCode(newCode);

    // If there's a value and not the last input, focus next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all inputs are filled
    if (newCode.every((digit) => digit !== "")) {
      onCodeFilled(newCode.join(""));
    }
  };

  const handleKeyPress = (e, index) => {
    // If backspace is pressed and current input is empty, focus previous input
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = async (pastedText, index) => {
    if (!pastedText) return;

    const digits = pastedText.replace(/\D/g, "").split("").slice(0, length);
    const newCode = [...code];

    // Fill as many inputs as we have digits
    digits.forEach((digit, i) => {
      if (index + i < length) {
        newCode[index + i] = digit;
      }
    });

    setCode(newCode);

    // Focus on the next empty input or the last one
    const nextEmptyIndex = newCode.findIndex((val) => val === "");
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex].focus();
    } else if (digits.length > 0) {
      // All filled, call the callback
      onCodeFilled(newCode.join(""));
      inputRefs.current[length - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {Array(length)
          .fill(0)
          .map((_, index) => (
            <View key={index} style={styles.inputWrapper}>
              <TextInput
                ref={(ref) => {
                  inputRefs.current[index] = ref;
                }}
                style={styles.input}
                value={code[index]}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                selectTextOnFocus
                onPaste={(e) => handlePaste(e.nativeEvent.text, index)}
              />
            </View>
          ))}
      </View>

      <Pressable style={styles.resendContainer}>
        <Text style={styles.resendText}>
          Resend code in <Text style={styles.timer}>01:32s</Text>
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff"
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 32,
    lineHeight: 20
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 5,
    maxWidth: 250,
    marginBottom: 24
  },
  inputWrapper: {
    width: 50,
    height: 50,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  },
  input: {
    width: "60%",
    height: "100%",
    textAlign: "center",
    fontSize: 20,
    color: "#000"
  },
  resendContainer: {
    marginTop: 24
  },
  resendText: {
    fontSize: 14,
    color: "#666"
  },
  timer: {
    color: "#6200ee",
    fontWeight: "500"
  }
});

export default OTPInputField;
