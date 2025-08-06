import React, { useState } from "react";
import { View, TouchableOpacity, ScrollView } from "react-native";
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
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const handlePress = (typeId: string) => {
    setSelectedMethod(typeId);
    setIdNumber("");
  }        
  const selectedIdType = IdTypes.find((type) => type.id === selectedMethod);
  const handleSubmit = () =>{
    
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
              handlePress={handleSubmit}
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
