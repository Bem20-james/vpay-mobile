import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "../../ThemedText";
import FormField from "../../FormFields";
import CustomButton from "../../CustomButton";
import CustomSheet from "../../BottomSheets/CustomSheet";
import { KycStyles as styles } from "@/styles/kyc";
import { FormData, FormErrors } from "../PersonalInfo";

interface PersonalInfoProps {
  formData: FormData;
  formErrors: FormErrors;
  touchedFields: Set<string>;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const MARITAL_STATUS_OPTIONS = ["Single", "Married", "Divorced", "Widowed"];

const PersonalInformation: React.FC<PersonalInfoProps> = ({
  formData,
  formErrors,
  touchedFields,
  updateFormData,
  onNext,
  onPrevious,
  isLoading
}) => {
  const [showMaritalSheet, setShowMaritalSheet] = useState(false);

  // Helper function to show error for a field
  const getFieldError = (fieldName: string) => {
    return touchedFields.has(fieldName) ? formErrors[fieldName] : undefined;
  };

  // Check if step is valid
  const stepFields = [
    "marital_status",
    "occupation",
    "country",
    "state",
    "city",
    "postal_code",
    "address"
  ];
  const isStepValid = stepFields.every(
    (field) =>
      formData[field as keyof FormData]?.toString().trim() !== "" &&
      !formErrors[field]
  );

  return (
    <View>
      <ThemedText
        lightColor="#000000"
        darkColor="#ffffff"
        style={[styles.heroTxt, { marginBottom: 10 }]}
      >
        Tell us more about yourself and where you live
      </ThemedText>

      <View style={{ gap: 1 }}>
        {/* Personal Status Row */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          {/* Marital Status */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setShowMaritalSheet(true)}>
              <FormField
                placeholder="Marital Status"
                value={formData.marital_status}
                editable={false}
                handleChangeText={() => {}}
                error={getFieldError("marital_status")}
                isRightIcon
                iconName="keyboard-arrow-down"
              />
            </TouchableOpacity>
          </View>

          {/* Occupation */}
          <View style={{ flex: 1 }}>
            <FormField
              placeholder="Occupation"
              value={formData.occupation}
              handleChangeText={(value) =>
                updateFormData({ occupation: value })
              }
              error={getFieldError("occupation")}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Address Section Header */}
        <View style={{ marginTop: 5, marginBottom: 3 }}>
          <ThemedText style={{ fontSize: 16, fontFamily: "Inter-SemiBold" }}>
            Address Information
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 13,
              fontFamily: "Questrial",
              opacity: 0.7,
              marginTop: 2
            }}
          >
            Your current residential address
          </ThemedText>
        </View>

        {/* Country Field */}
        <FormField
          placeholder="Country"
          value={formData.country}
          handleChangeText={(value) => updateFormData({ country: value })}
          editable={!formData.country || formData.country === ""}
          error={getFieldError("country")}
          autoCapitalize="words"
        />

        {/* State and City Row */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <FormField
              placeholder="State/Province"
              value={formData.state}
              handleChangeText={(value) => updateFormData({ state: value })}
              error={getFieldError("state")}
              autoCapitalize="words"
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormField
              placeholder="City"
              value={formData.city}
              handleChangeText={(value) => updateFormData({ city: value })}
              error={getFieldError("city")}
              autoCapitalize="words"
            />
          </View>
        </View>

        {/* Postal Code */}
        <FormField
          placeholder="Postal/ZIP Code"
          value={formData.postal_code}
          handleChangeText={(value) => {
            // Allow only alphanumeric characters for postal codes
            const cleaned = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
            updateFormData({ postal_code: cleaned });
          }}
          error={getFieldError("postal_code")}
          keyboardType="default"
          autoCapitalize="characters"
          maxLength={10}
        />

        {/* Full Address */}
        <FormField
          placeholder="Street Address"
          value={formData.address}
          handleChangeText={(value) => updateFormData({ address: value })}
          error={getFieldError("address")}
          multiline={true}
          helpText="Include street number, street name, and any apartment/unit details"
        />

        {/* Progress Indicator */}
        <View
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.1)",
            padding: 12,
            borderRadius: 8,
            marginTop: 8
          }}
        >
          <ThemedText style={{ fontSize: 13, lineHeight: 18 }}>
            This address will be used for identity verification purposes. Make
            sure it matches your official documents.
          </ThemedText>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={{ flexDirection: "row", marginTop: 32, gap: 5 }}>
        <CustomButton
          title="Back"
          handlePress={onPrevious}
          btnStyles={{
            width: "50%",
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#208BC9"
          }}
        />

        <CustomButton
          title="Continue"
          handlePress={onNext}
          disabled={!isStepValid || isLoading}
          btnStyles={{
            width: "50%",
            opacity: isStepValid ? 1 : 0.6
          }}
        />
      </View>
      {!isStepValid && touchedFields.size > 0 && (
        <ThemedText
          style={{
            textAlign: "center",
            color: "#EF4444",
            fontSize: 13
          }}
        >
          Please complete all address fields
        </ThemedText>
      )}

      {/* Marital Status Selection Sheet */}
      <CustomSheet
        isVisible={showMaritalSheet}
        onClose={() => setShowMaritalSheet(false)}
        items={MARITAL_STATUS_OPTIONS}
        selectedItem={formData.marital_status}
        onSelectItem={(value) => {
          updateFormData({ marital_status: value });
          setShowMaritalSheet(false);
        }}
        title="Select Marital Status"
      />
    </View>
  );
};

export default PersonalInformation;
