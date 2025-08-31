import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

// ---- shared canonical type ----
export const OTP_METHODS = ["email", "sms", "authenticator"] as const;
export type OtpMethod = (typeof OTP_METHODS)[number];

// Make methods generic so onSubmit is narrowed to the subset
type OtpMethodModalProps<T extends readonly OtpMethod[] = typeof OTP_METHODS> =
  {
    visible: boolean;
    onClose: () => void;
    onSubmit: (method: T[number]) => void;
    isLoading: boolean;
    methods?: T;
    autoSubmitIfSingle?: boolean;
  };

function OtpMediumModal<T extends readonly OtpMethod[] = typeof OTP_METHODS>({
  visible,
  onClose,
  onSubmit,
  isLoading,
  methods,
  autoSubmitIfSingle = true
}: OtpMethodModalProps<T>) {
  // If none provided or empty, fall back to all
  const effectiveMethods = useMemo(() => {
    const list = (methods && methods.length
      ? methods
      : OTP_METHODS) as unknown as readonly T[number][];
    return list;
  }, [methods]);

  const [selectedMethod, setSelectedMethod] = useState<T[number]>(
    effectiveMethods[0]
  );

  useEffect(() => {
    setSelectedMethod(effectiveMethods[0]);
  }, [effectiveMethods]);

  const colorScheme = useColorScheme();
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const isDark = colorScheme === "dark";

  // Auto-submit if only one method (skip UI)
  useEffect(() => {
    if (autoSubmitIfSingle && visible && effectiveMethods.length === 1) {
      onSubmit(effectiveMethods[0]);
      onClose();
    }
  }, [autoSubmitIfSingle, visible, effectiveMethods, onSubmit, onClose]);

  const handleSelect = (method: T[number]) => {
    setSelectedMethod(method);
    onClose();
    onSubmit(method);
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.backdrop}>
        <View style={[styles.modal, { backgroundColor: bgColor }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
            <AntDesign
              name="close"
              size={20}
              color={isDark ? "#9B9B9B" : "#80D1FF"}
            />
          </TouchableOpacity>

          <ThemedText style={styles.title}>
            How do you want to receive OTP
          </ThemedText>

          {effectiveMethods.map((method) => (
            <TouchableOpacity
              key={method as string}
              onPress={() => handleSelect(method)}
              style={[
                styles.option,
                selectedMethod === method && styles.selectedOption
              ]}
            >
              <ThemedText
                lightColor=""
                darkColor="#F5F5F5"
                style={styles.optionText}
              >
                {(method as string).toUpperCase()}
              </ThemedText>
            </TouchableOpacity>
          ))}

          {isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}
        </View>
      </View>
    </Modal>
  );
}

export default OtpMediumModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  closeIconContainer: {
    position: "absolute",
    top: 2,
    right: 10,
    zIndex: 10,
    padding: 6
  },
  modal: {
    width: "85%",
    borderRadius: 10,
    padding: 20,
    elevation: 10
  },
  title: {
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0
  },
  option: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#218DC9",
    marginTop: 10
  },
  selectedOption: {
    backgroundColor: "#218DC9"
  },
  optionText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Questrial"
  }
});
