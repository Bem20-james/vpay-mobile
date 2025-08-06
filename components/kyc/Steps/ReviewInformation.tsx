import React, { useState } from "react";
import { View, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../../ThemedText";
import CustomButton from "../../CustomButton";
import { KycStyles as styles } from "@/styles/kyc";
import { FormData, FormErrors } from "../PersonalInfo";
import { format } from "date-fns";

interface ReviewInfoProps {
  formData: FormData;
  formErrors: FormErrors;
  touchedFields: Set<string>;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinalSubmit: () => void;
  submissionError: string | null;
  isLoading: boolean;
}

const ReviewInformation: React.FC<ReviewInfoProps> = ({
  formData,
  onPrevious,
  onFinalSubmit,
  submissionError,
  isLoading
}) => {
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const handleConfirmToggle = () => {
    setHasConfirmed(!hasConfirmed);
  };

  const handleSubmit = () => {
    if (!hasConfirmed) {
      Alert.alert(
        "Confirmation Required",
        "Please confirm that all information is accurate before submitting."
      );
      return;
    }
    onFinalSubmit();
  };

  // Helper function to format field labels
  const formatLabel = (key: string): string => {
    const labels: { [key: string]: string } = {
      firstname: "First Name",
      lastname: "Last Name",
      email: "Email",
      phone: "Phone",
      gender: "Gender",
      dob: "Date of Birth",
      marital_status: "Marital Status",
      occupation: "Occupation",
      country: "Country",
      state: "State",
      city: "City",
      postal_code: "Postal Code",
      address: "Address",
      selfie_image: "Identity Photo"
    };
    return labels[key] || key;
  };

  // Helper function to format field values
  const formatValue = (key: string, value: string): string => {
    if (key === "dob" && value) {
      return format(new Date(value), "MMMM dd, yyyy");
    }
    if (key === "phone" && value) {
      // Format phone number for display
      return value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  // Group form data for better organization
  const personalInfo = {
    firstname: formData.firstname,
    lastname: formData.lastname,
    email: formData.email,
    phone: formData.phone,
    gender: formData.gender,
    dob: formData.dob,
    marital_status: formData.marital_status,
    occupation: formData.occupation
  };

  const addressInfo = {
    address: formData.address,
    city: formData.city,
    state: formData.state,
    postal_code: formData.postal_code,
    country: formData.country
  };

  const InfoSection = ({
    title,
    data,
    iconName
  }: {
    title: string;
    data: { [key: string]: string };
    iconName: keyof typeof MaterialIcons.glyphMap;
  }) => (
    <View
      style={{
        backgroundColor: "rgba(59, 130, 246, 0.05)",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <MaterialIcons name={iconName} size={20} color="#3B82F6" />
        <ThemedText style={{ fontSize: 16, fontFamily: "Inter-Regular", marginLeft: 8 }}>
          {title}
        </ThemedText>
      </View>
      {Object.entries(data).map(
        ([key, value]) =>
          value && (
            <View
              key={key}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                paddingVertical: 6,
                borderBottomWidth: 1,
                borderBottomColor: "rgba(0,0,0,0.05)"
              }}
            >
              <ThemedText
                style={{
                  fontSize: 14,
                  opacity: 0.7,
                  flex: 1,
                  marginRight: 12
                }}
              >
                {formatLabel(key)}
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: "500",
                  flex: 2,
                  textAlign: "right"
                }}
              >
                {formatValue(key, value)}
              </ThemedText>
            </View>
          )
      )}
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ThemedText
        lightColor="#000000"
        darkColor="#ffffff"
        style={[styles.heroTxt, { marginBottom: 10 }]}
      >
        Review your information before submitting
      </ThemedText>

      {/* Personal Information Section */}
      <InfoSection
        title="Personal Information"
        data={personalInfo}
        iconName="person"
      />

      {/* Address Information Section */}
      <InfoSection
        title="Address Information"
        data={addressInfo}
        iconName="location-on"
      />

      {/* Identity Photo Section */}
      {formData.selfie_image && (
        <View
          style={{
            backgroundColor: "rgba(34, 197, 94, 0.05)",
            borderRadius: 12,
            padding: 16,
            marginBottom: 16
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12
            }}
          >
            <MaterialIcons name="photo-camera" size={20} color="#22C55E" />
            <ThemedText
              style={{ fontSize: 16, fontWeight: "600", marginLeft: 8 }}
            >
              Identity Photo
            </ThemedText>
          </View>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: formData.selfie_image }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                borderWidth: 3,
                borderColor: "#22C55E"
              }}
            />
            <ThemedText
              style={{
                fontSize: 13,
                opacity: 0.7,
                marginTop: 8,
                textAlign: "center"
              }}
            >
              ✅ Photo captured successfully
            </ThemedText>
          </View>
        </View>
      )}

      {/* Confirmation Checkbox */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          padding: 16,
          backgroundColor: "rgba(107, 114, 128, 0.05)",
          borderRadius: 12,
          marginBottom: 20
        }}
        onPress={handleConfirmToggle}
      >
        <MaterialIcons
          name={hasConfirmed ? "check-box" : "check-box-outline-blank"}
          size={24}
          color={hasConfirmed ? "#3B82F6" : "#9CA3AF"}
        />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <ThemedText style={{ fontSize: 15, fontFamily: "Questrial", lineHeight: 20 }}>
            I confirm that all the information provided is accurate and matches
            my official documents. I understand that providing false information
            may result in account suspension.
          </ThemedText>
        </View>
      </TouchableOpacity>

      {/* Error Display */}
      {submissionError && (
        <View
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            padding: 16,
            borderRadius: 12,
            marginBottom: 20,
            borderLeftWidth: 4,
            borderLeftColor: "#EF4444"
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8
            }}
          >
            <MaterialIcons name="error" size={20} color="#EF4444" />
            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "600",
                marginLeft: 8,
                color: "#EF4444"
              }}
            >
              Submission Failed
            </ThemedText>
          </View>
          <ThemedText
            style={{ color: "#EF4444", fontSize: 13, lineHeight: 18 }}
          >
            {submissionError}
          </ThemedText>
        </View>
      )}

      {/* Navigation Buttons */}
      <View style={{ gap: 12, paddingBottom: 20 }}>
        <CustomButton
          title={isLoading ? "Submitting..." : "Submit"}
          handlePress={handleSubmit}
          disabled={!hasConfirmed || isLoading}
          btnStyles={{
            width: "100%",
            opacity: hasConfirmed ? 1 : 0.6
          }}
          isLoading={isLoading}
        />

        <CustomButton
          title="Back to Edit"
          handlePress={onPrevious}
          disabled={isLoading}
          btnStyles={{
            width: "100%",
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "#E5E7EB"
          }}
          textStyles={{ color: "#6B7280" }}
        />
      </View>
    </ScrollView>
  );
};

export default ReviewInformation;
