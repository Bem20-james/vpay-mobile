import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { Fontisto } from "@expo/vector-icons";
import { useLoader } from "@/contexts/LoaderContext";
import { useTheme } from "@/contexts/ThemeContexts";

export const OTP_METHODS = ["email", "sms", "authenticator"] as const;
export type OtpMethod = (typeof OTP_METHODS)[number];

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
  const effectiveMethods = useMemo(() => {
    return (methods && methods.length
      ? methods
      : OTP_METHODS) as unknown as readonly T[number][];
  }, [methods]);

  const [selectedMethod, setSelectedMethod] = useState<T[number]>(
    effectiveMethods[0]
  );

  useEffect(() => {
    setSelectedMethod(effectiveMethods[0]);
  }, [effectiveMethods]);

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const { showLoader, hideLoader } = useLoader();

  // 🔥 Loader control based on isLoading
  useEffect(() => {
    if (isLoading) {
      showLoader();
    } else {
      hideLoader();
    }

    return () => hideLoader(); // cleanup when unmounting
  }, [isLoading]);

  // Auto submit if only one method
  useEffect(() => {
    if (autoSubmitIfSingle && visible && effectiveMethods.length === 1) {
      onSubmit(effectiveMethods[0]);
      onClose();
    }
  }, [autoSubmitIfSingle, visible, effectiveMethods, onSubmit, onClose]);

  const handleSelect = (method: T[number]) => {
    setSelectedMethod(method);
    onClose();
    showLoader();
    onSubmit(method);
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.backdrop}>
        <View style={[styles.modal, { backgroundColor: bgColor }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeIconContainer}>
            <Fontisto name="close" size={22} color={"#0A2D4A"} />
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
    marginTop: 15,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontSize: 17,
    lineHeight: 30
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
