import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "./ThemedText";

type OtpMethod = "email" | "sms" | "authenticator";

interface OtpMethodModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (method: OtpMethod) => void;
  isLoading: boolean;
  methods?: OtpMethod[];
}

const OtpMediumModal = ({
  visible,
  onClose,
  onSubmit,
  isLoading,
  methods = ["email", "sms", "authenticator"]
}: OtpMethodModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<OtpMethod>("email");
  const colorScheme = useColorScheme();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

  const handleSelect = (method: OtpMethod) => {
    setSelectedMethod(method);
    onClose();
    onSubmit(method);
  };

  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <View style={[styles.modal, { backgroundColor: bgColor }]}>
            <ThemedText style={styles.title}>
              How do you want to receive OTP
            </ThemedText>

            {methods.map((method) => (
              <TouchableOpacity
                key={method}
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
                  {method.toUpperCase()}
                </ThemedText>
              </TouchableOpacity>
            ))}

            {isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default OtpMediumModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "85%",
    borderRadius: 10,
    padding: 20,
    elevation: 10
  },
  title: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontWeight: 700,
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: 0
  },
  option: {
    padding: 10,
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
