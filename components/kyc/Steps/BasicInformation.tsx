import React, { useState } from "react";
import { View, TouchableOpacity, Platform } from "react-native";
import { ThemedText } from "../../ThemedText";
import FormField from "../../FormFields";
import CustomButton from "../../CustomButton";
import CustomSheet from "../../BottomSheets/CustomSheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import { KycStyles as styles } from "@/styles/kyc";
import { FormData, FormErrors } from "../PersonalInfo";

interface BasicInformationProps {
  formData: FormData;
  formErrors: FormErrors;
  touchedFields: Set<string>;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isLoading: boolean;
}

const GENDER_OPTIONS = ["Male", "Female", "Other"];

const BasicInformation: React.FC<BasicInformationProps> = ({
  formData,
  formErrors,
  touchedFields,
  updateFormData,
  onNext,
  isLoading
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showGenderSheet, setShowGenderSheet] = useState(false);

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = format(selectedDate, "yyyy-MM-dd");
      updateFormData({ dob: formatted });
    }
  };

  const getMaxDate = () => {
    const today = new Date();
    const currentYr = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    return currentYr;
  };

  // Helper function to show error for a field
  const getFieldError = (fieldName: string) => {
    return touchedFields.has(fieldName) ? formErrors[fieldName] : undefined;
  };

  // Check if step is valid
  const stepFields = [
    "firstname",
    "lastname",
    "email",
    "phone",
    "gender",
    "dob"
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
        style={[styles.heroTxt, { marginBottom: 20 }]}
      >
        Let's start with your basic information
      </ThemedText>

      <View style={{ gap: 1 }}>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1 }}>
            <FormField
              placeholder="First Name"
              value={formData.firstname}
              handleChangeText={(value) => updateFormData({ firstname: value })}
              editable={!formData.firstname}
              error={getFieldError("firstname")}
            />
          </View>
          <View style={{ flex: 1 }}>
            <FormField
              placeholder="Last Name"
              value={formData.lastname}
              handleChangeText={(value) => updateFormData({ lastname: value })}
              editable={!formData.lastname }
              error={getFieldError("lastname")}
            />
          </View>
        </View>

        {/* Contact Fields */}
        <FormField
          placeholder="Email Address"
          value={formData.email}
          handleChangeText={(value) => updateFormData({ email: value })}
          editable={!formData.email || formData.email === ""}
          keyboardType="email-address"
          error={getFieldError("email")}
        />

        <FormField
          placeholder="Phone Number"
          value={formData.phone}
          handleChangeText={(value) => {
            // Auto-format phone number (basic formatting)
            const cleaned = value.replace(/\D/g, "");
            updateFormData({ phone: cleaned });
          }}
          editable={!formData.phone || formData.phone === ""}
          keyboardType="phone-pad"
          error={getFieldError("phone")}
        />

        {/* Personal Details Row */}
        <View style={{ flexDirection: "row", gap: 8 }}>
          {/* Gender Field */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setShowGenderSheet(true)}>
              <FormField
                placeholder="Gender"
                value={formData.gender}
                editable={false}
                handleChangeText={() => {}}
                error={getFieldError("gender")}
                isRightIcon
                iconName="keyboard-arrow-down"
              />
            </TouchableOpacity>
          </View>

          {/* Date of Birth Field */}
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <FormField
                placeholder="Date of Birth"
                value={
                  formData.dob
                    ? format(new Date(formData.dob), "MMM dd, yyyy")
                    : ""
                }
                editable={false}
                handleChangeText={() => {}}
                error={getFieldError("dob")}
                isRightIcon
                iconName="calendar-month"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Help Text */}
        <View
          style={{
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            padding: 12,
            borderRadius: 8,
            marginTop: 8
          }}
        >
          <ThemedText style={{ fontSize: 13, lineHeight: 18 }}>
            💡 Make sure your information matches your official documents. You
            won't be able to change some details later.
          </ThemedText>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={{ marginTop: 35, gap: 15 }}>
        <CustomButton
          title="Continue"
          handlePress={onNext}
          disabled={!isStepValid || isLoading}
          btnStyles={{
            width: "100%",
            opacity: isStepValid ? 1 : 0.5
          }}
        />

        {!isStepValid && touchedFields.size > 0 && (
          <ThemedText
            style={{
              textAlign: "center",
              color: "#EF4444",
              fontSize: 13
            }}
          >
            Please fill in all required fields correctly
          </ThemedText>
        )}
      </View>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          value={formData.dob ? new Date(formData.dob) : new Date()}
          onChange={handleDateChange}
          maximumDate={getMaxDate()}
          minimumDate={new Date(1940, 0, 1)}
        />
      )}

      {/* Gender Selection Sheet */}
      <CustomSheet
        isVisible={showGenderSheet}
        onClose={() => setShowGenderSheet(false)}
        items={GENDER_OPTIONS}
        selectedItem={formData.gender}
        onSelectItem={(value) => {
          updateFormData({ gender: value });
          setShowGenderSheet(false);
        }}
        title="Select Gender"
      />
    </View>
  );
};

export default BasicInformation;
