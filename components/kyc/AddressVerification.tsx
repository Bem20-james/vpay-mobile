import { View, ScrollView, Alert } from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import { KycStyles as styles } from "@/styles/kyc";
import { useState } from "react";
import DocumentUpload from "./DocumentUpload";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useUser } from "@/contexts/UserContexts";
import { AddressProps, AddressFormData, DocumentData } from "@/types/kyc";
import { useAddressVerification } from "@/hooks/useKYC";

const validateForm = (
  form: AddressFormData
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!form.country.trim()) {
    errors.push("Country is required");
  }
  if (!form.state.trim()) {
    errors.push("State is required");
  }
  if (!form.city.trim()) {
    errors.push("City is required");
  }
  if (!form.street_address_one.trim()) {
    errors.push("Residential address is required");
  }
  if (!form.postal_code.trim()) {
    errors.push("Postal code is required");
  } else if (form.postal_code.trim().length < 3) {
    errors.push("Postal code must be at least 3 characters");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const AddressVerification = ({ onBack, onComplete }: AddressProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const country = user?.country?.code;

  const [form, setForm] = useState<AddressFormData>({
    street_address_one: "",
    city: "",
    state: "",
    country: user?.country?.name || "",
    postal_code: "",
    document: ""
  });

  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { verifyAddress } = useAddressVerification();

  const handleChange = (field: keyof AddressFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
    if (formErrors.length > 0) {
      setFormErrors([]);
    }
  };

  const handleContinueToDocuments = () => {
    const validation = validateForm(form);

    if (!validation.isValid) {
      setFormErrors(validation.errors);
      Alert.alert("Form Validation Error", validation.errors.join("\n"), [
        { text: "OK" }
      ]);
      return;
    }

    setFormErrors([]);
    setShowDocumentUpload(true);
  };

  const handleDocumentSubmit = async (documentData: DocumentData) => {
    setIsSubmitting(true);

    try {
      await verifyAddress({
        postal_code: form.postal_code,
        state: form.state,
        city: form.city,
        street_address_one: form.street_address_one,
        document: documentData.document,
        document_type: documentData.documentType,
        country: country
      });

      Alert.alert("Success", "Address verification submitted successfully!", [
        { text: "OK" }
      ]);
    } catch (error) {
      Alert.alert(
        "Submission Error",
        "Failed to submit address verification. Please try again.",
        [{ text: "OK" }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackFromDocuments = () => {
    setShowDocumentUpload(false);
    setIsSubmitting(false);
  };

  const isFormValid = validateForm(form).isValid;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!showDocumentUpload ? (
          <Animated.View
            entering={FadeInRight.duration(300)}
            exiting={FadeOutLeft.duration(300)}
          >
            <Navigator title="Address Verification" onBack={onBack} />
            <View style={styles.container}>
              <ThemedText
                lightColor="#9B9B9B"
                darkColor="#9B9B9B"
                style={styles.heroTxt}
              >
                Please add your current address, we need these information to
                ensure a seamless service for you
              </ThemedText>

              <ThemedText
                style={{
                  fontFamily: "Questrial",
                  fontSize: 12,
                  marginVertical: 10,
                  color: "#D22C1F"
                }}
              >
                *Please ensure this address matches with the one on the document
                you are going to upload
              </ThemedText>

              {formErrors.length > 0 && (
                <View
                  style={{
                    backgroundColor: "#FEF2F2",
                    borderColor: "#DC2626",
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 16
                  }}
                >
                  {formErrors.map((error, index) => (
                    <ThemedText
                      key={index}
                      style={{
                        color: "#DC2626",
                        fontSize: 14,
                        marginBottom: index < formErrors.length - 1 ? 4 : 0
                      }}
                    >
                      • {error}
                    </ThemedText>
                  ))}
                </View>
              )}

              <View style={{ flexDirection: "column" }}>
                <FormField
                  placeholder="Country"
                  value={form.country}
                  handleChangeText={(value) => handleChange("country", value)}
                  editable={!form.country || form.country === ""}
                  autoCapitalize="words"
                />

                <FormField
                  placeholder="State"
                  value={form.state}
                  handleChangeText={(value) => handleChange("state", value)}
                  keyboardType="default"
                  autoCapitalize="words"
                />

                <FormField
                  placeholder="City"
                  value={form.city}
                  handleChangeText={(value) => handleChange("city", value)}
                  keyboardType="default"
                  autoCapitalize="words"
                />

                <FormField
                  placeholder="Street address"
                  value={form.street_address_one}
                  handleChangeText={(value) =>
                    handleChange("street_address_one", value)
                  }
                  keyboardType="default"
                  multiline
                />

                <FormField
                  placeholder="Postal code"
                  value={form.postal_code}
                  handleChangeText={(value) =>
                    handleChange("postal_code", value)
                  }
                  keyboardType="default"
                />
              </View>
              <View style={{ position: "relative", marginTop: 10 }}>
                <CustomButton
                  title="Continue to Documents"
                  handlePress={handleContinueToDocuments}
                  btnStyles={{
                    width: "100%",
                    opacity: isFormValid ? 1 : 0.6
                  }}
                  disabled={!isFormValid}
                />
                {!isFormValid && (
                  <ThemedText
                    style={{
                      textAlign: "center",
                      marginTop: 8,
                      fontSize: 12,
                      color: "#6B7280"
                    }}
                  >
                    Please fill in all required fields to continue
                  </ThemedText>
                )}
              </View>
            </View>
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeInRight.duration(300)}
            exiting={FadeOutLeft.duration(300)}
          >
            <DocumentUpload
              loading={isSubmitting}
              onSubmit={handleDocumentSubmit}
              onBack={handleBackFromDocuments}
              addressData={form}
            />
          </Animated.View>
        )}
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default AddressVerification;
