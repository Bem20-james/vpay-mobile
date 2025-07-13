import React, { useState, useRef, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Entypo } from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import { KycStyles as styles } from "@/styles/kyc";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Navigator from "../Navigator";

const DocsType = [
  { id: "1", label: "Utility bill" },
  { id: "2", label: "Bank statement" },
  { id: "3", label: "Rental agreement" }
];

interface DocsUploadProps {
  onBack: () => void;
  onSubmit: (selfieBase64: string) => void;
  loading: boolean;
}

const DocumentUpload: React.FC<DocsUploadProps> = ({
  onBack,
  onSubmit,
  loading
}) => {
  const colorScheme = useColorScheme();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";

  const handlePress = (typeId: string) => {
    setSelectedMethod(typeId);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Address Verification" onBack={onBack} />

        <View style={styles.container}>
          <ThemedText style={styles.heroTxt}>
            Upload a valid document as proof of address (e.g, utility bill, bank
            statement, or rental agreement)
          </ThemedText>

          {DocsType.map((type) => (
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
                <ThemedText style={styles.methodText}>{type.label}</ThemedText>
              </View>
            </TouchableOpacity>
          ))}

          {selectedMethod && (
            <TouchableOpacity style={styles.option}>
              <MaterialIcons name="description" size={25} color="#7b7b9b" />
              <ThemedText type="default">Upload Document</ThemedText>
            </TouchableOpacity>
          )}
          <View style={{ position: "relative" }}>
            <View
              style={{
                position: "absolute",
                bottom: -100,
                left: 5,
                right: 5
              }}
            >
              <CustomButton
                title="Submit"
                handlePress={() => {}}
                btnStyles={{ width: "100%" }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default DocumentUpload;
