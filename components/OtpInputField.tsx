import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, View, Platform } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from "react-native-confirmation-code-field";

const CELL_COUNT = 6;

interface OTPInputFieldProps {
  value: string;
  onChangeText: (code: string) => void;
  onComplete?: (code: string) => void;
}

const OTPInputField: React.FC<OTPInputFieldProps> = ({
  value,
  onChangeText,
  onComplete
}) => {
  const [isFull, setIsFull] = useState<boolean>(false);
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChangeText
  });

  const handleCodeChange = (code: string) => {
    onChangeText(code);

    if (code.length === CELL_COUNT) {
      setIsFull(true);
      onComplete?.(code);
    } else {
      setIsFull(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={handleCodeChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code"
        })}
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[
              styles.cell,
              isFocused && styles.focusCell,
              isFull && styles.fullCell
            ]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    justifyContent: "center"
  },
  codeFieldRoot: {
    flexDirection: "row",
    justifyContent: "center"
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 51,
    fontSize: 24,
    borderWidth: 1,
    borderColor: "#E7E7E7",
    textAlign: "center",
    borderRadius: 100,
    marginHorizontal: 2,
    backgroundColor: "#fff"
  },
  focusCell: {
    borderColor: "#007AFF",
    backgroundColor: "#E9F7FF"
  },
  fullCell: {
    borderColor: "#34C759"
  }
});

export default OTPInputField;
