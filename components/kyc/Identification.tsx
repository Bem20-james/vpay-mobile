import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView, Alert } from "react-native";
import { ThemedText } from "../ThemedText";
import { Entypo } from "@expo/vector-icons";
import FormField from "../FormFields";
import CustomButton from "../CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "../Navigator";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { KycStyles as styles } from "@/styles/kyc";
import { Colors } from "@/constants/Colors";
import { useIdVerification } from "@/hooks/useKYC";
import SelfieUpload from "./SelfieUpload";

const IdTypes = [
  { id: "1", label: "NIN" },
  { id: "2", label: "BVN" }
];

interface IDProps {
  onBack: () => void;
}

const IdentityVerifiaction = ({ onBack }: IDProps) => {
  const [idNumber, setIdNumber] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "selfie">("form"); // control steps
  const [selfie, setSelfie] = useState<string | null>(null);

  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const { verifyId } = useIdVerification();

  const handlePress = (typeId: string) => {
    setSelectedMethod(typeId);
    setIdNumber("");
    setError(null);
  };

  const selectedIdType = IdTypes.find((type) => type.id === selectedMethod);

  const validateForm = () => {
    if (!selectedMethod) {
      setError("Please select an ID type.");
      return false;
    }
    if (!idNumber) {
      setError("ID number is required.");
      return false;
    }
    if (idNumber.length !== 11) {
      setError(`${selectedIdType?.label} must be 11 digits long.`);
      return false;
    }
    return true;
  };

  // Step 1 -> go to selfie
  const handleSubmit = () => {
    setError(null);
    if (!validateForm()) return;
    setStep("selfie");
  };

  // Step 2 -> final submit with selfie
  const handleSelfieSubmit = async (capturedSelfie: string) => {
    setSelfie(capturedSelfie);

    try {
      setLoading(true);
      const payload = {
        id_type: selectedIdType?.label,
        id_number: idNumber,
        selfie_image: capturedSelfie // base64 or file string from SelfieUpload
      };

      const response = await verifyId(payload);

      Alert.alert("Success", "Your ID has been verified successfully!");
      console.log("Verification Response:", response);

      // reset
      setIdNumber("");
      setSelectedMethod(null);
      setSelfie(null);
      setStep("form");
    } catch (err: any) {
      Alert.alert("Error", err?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {step === "form" ? (
        <ScrollView>
          <Navigator title="Identity Verification" onBack={onBack} />
          <View style={styles.container}>
            <ThemedText
              lightColor="#9B9B9B"
              darkColor="#9B9B9B"
              style={styles.heroTxt}
            >
              {
                "Provide your BVN or NIN details to verify your Identity, use only valid government issued documents."
              }
            </ThemedText>

            <View style={{ marginVertical: 10 }}>
              <ThemedText
                lightColor="#F5F5F5"
                darkColor="#F5F5F5"
                style={{
                  fontFamily: "Questrial",
                  fontSize: 14,
                  marginVertical: 10
                }}
              >
                Select an ID type to continue
              </ThemedText>
              {IdTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    { backgroundColor: bgColor },
                    styles.methodItem,
                    selectedMethod === type.id && styles.selectedMethodItem
                  ]}
                  onPress={() => handlePress(type.id)}
                >
                  <View style={styles.methodLeft}>
                    <Entypo
                      name={
                        selectedMethod === type.id ? "dot-single" : "circle"
                      }
                      size={20}
                      color={selectedMethod === type.id ? "#208BC9" : "#B0B0B0"}
                    />
                    <ThemedText style={styles.methodText}>
                      {type.label}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {selectedMethod && (
              <FormField
                title={`${selectedIdType?.label}`}
                placeholder={`Enter your ${selectedIdType?.label}`}
                value={idNumber}
                handleChangeText={(text: string) => {
                  setIdNumber(text.replace(/[^0-9]/g, ""));
                  if (error) setError(null);
                }}
                otherStyles={{ marginTop: 7 }}
                keyboardType="phone-pad"
                maxLength={11}
              />
            )}

            {error && (
              <ThemedText
                style={{ color: "red", fontSize: 13 }}
                lightColor="red"
                darkColor="red"
              >
                {error}
              </ThemedText>
            )}
          </View>

          <View style={{ position: "relative" }}>
            <View style={styles.btnCon}>
              <CustomButton
                title={"Continue"}
                handlePress={handleSubmit}
                btnStyles={{ width: "100%", opacity: loading ? 0.7 : 1 }}
                disabled={loading}
              />
            </View>
          </View>
        </ScrollView>
      ) : (
        <SelfieUpload
          onBack={() => setStep("form")}
          onSubmit={handleSelfieSubmit}
        />
      )}

      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default IdentityVerifiaction;
