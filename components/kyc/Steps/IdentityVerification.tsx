import React from "react";
import { View } from "react-native";
import { ThemedText } from "../../ThemedText";
import CustomButton from "../../CustomButton";
import SelfieUpload from "../SelfieUpload";
import { KycStyles as styles } from "@/styles/kyc";
import { FormData, FormErrors } from "../PersonalInfo";

interface IdentityVerificationProps {
  formData: FormData;
  formErrors: FormErrors;
  touchedFields: Set<string>;
  updateFormData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: (selfieUri: string) => void;
  isLoading: boolean;
}

const IdentityVerification: React.FC<IdentityVerificationProps> = ({
  formData,
  formErrors,
  touchedFields,
  updateFormData,
  onNext,
  onPrevious,
  onSubmit,
  isLoading
}) => {
  // Helper function to show error for a field
  const getFieldError = (fieldName: string) => {
    return touchedFields.has(fieldName) ? formErrors[fieldName] : undefined;
  };

  const hasValidSelfie =
    !!formData.selfie_image && formData.selfie_image.trim() !== "";

  return (
    <View>
      <ThemedText
        lightColor="#00000"
        darkColor="#FFFFFF"
        style={[styles.heroTxt, { marginBottom: 10 }]}
      >
        Take a selfie to verify your identity
      </ThemedText>

      {/* Selfie Upload Component */}
      <View style={{ marginBottom: 20 }}>
        <SelfieUpload
          onNext={onNext}
          isvalid={Boolean(hasValidSelfie)}
          onSubmit={(selfieUri: string) => {
            updateFormData({ selfie_image: selfieUri });
            onSubmit(selfieUri);
          }}
          isLoading={isLoading}
        />
      </View>

      {/* Security Notice */}
      <View
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          borderLeftWidth: 4,
          borderLeftColor: "#14547C"
        }}
      >
        <ThemedText
          style={{
            fontSize: 14,
            fontFamily: "Inter-SemiBold",
            marginBottom: 8
          }}
        >
          Identity Verification Requirements
        </ThemedText>
        <View style={{ gap: 6 }}>
          <ThemedText style={styles.listI}>
            • Face the camera directly with good lighting
          </ThemedText>
          <ThemedText style={styles.listI}>
            • Remove sunglasses and ensure face is clearly visible
          </ThemedText>
          <ThemedText style={styles.listI}>
            • Use a neutral expression (no smiling)
          </ThemedText>
          <ThemedText style={styles.listI}>
            • Make sure the photo is clear and not blurry
          </ThemedText>
        </View>
      </View>

      {/* Error Display */}
      {getFieldError("selfie_image") && (
        <View
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            padding: 12,
            borderRadius: 8,
            marginTop: 16
          }}
        >
          <ThemedText
            style={{ color: "#EF4444", fontSize: 13, textAlign: "center" }}
          >
            {getFieldError("selfie_image")}
          </ThemedText>
        </View>
      )}

      {/* Privacy Notice */}
      <View
        style={{
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          padding: 16,
          borderRadius: 12,
          marginTop: 24
        }}
      >
        <ThemedText
          style={{ fontSize: 14, fontFamily: "Inter-Regular", marginBottom: 5 }}
        >
          🔒 Privacy & Security
        </ThemedText>
        <ThemedText
          style={{
            fontSize: 12,
            fontFamily: "Questrial",
            lineHeight: 18,
            opacity: 0.8
          }}
        >
          Your photo is encrypted and used only for identity verification. We
          never share your personal information with third parties. This process
          helps keep your account secure.
        </ThemedText>
      </View>
    </View>
  );
};

export default IdentityVerification;
