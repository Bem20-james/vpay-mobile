import React, { useState } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { ThemedText } from "../ThemedText";
import { Entypo } from "@expo/vector-icons";
import FormField from "../FormFields";
import CustomButton from "../CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "../Navigator";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { KycStyles as styles } from "@/styles/kyc";
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
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();
  const [showSelfieUpload, setShowSelfieUpload] = useState(false);

  const handlePress = (typeId: string) => {
    setSelectedMethod(typeId);
    setIdNumber("");
  };
  const selectedIdType = IdTypes.find((type) => type.id === selectedMethod);

  if (showSelfieUpload) {
    return (
      <SelfieUpload
        onBack={() => setShowSelfieUpload(false)}
        isLoading
        onSubmit={() => {}}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
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
              select an ID type to continue
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
                    name={selectedMethod === type.id ? "dot-single" : "circle"}
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
              handleChangeText={setIdNumber}
              otherStyles={{ marginTop: 7 }}
              keyboardType="phone-pad"
              maxLength={11}
            />
          )}
        </View>

        <View style={{ position: "relative" }}>
          <View style={styles.btnCon}>
            <CustomButton
              title="Submit"
              handlePress={() => setShowSelfieUpload(true)}
              btnStyles={{ width: "100%" }}
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default IdentityVerifiaction;
