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
  const getFieldError = (fieldName: string) => {
    return touchedFields.has(fieldName) ? formErrors[fieldName] : undefined;
  };

  const hasValidSelfie =
    formData.selfie_image && formData.selfie_image.trim() !== "";

  return (
    <View>
      <ThemedText
        lightColor="#9B9B9B"
        darkColor="#9B9B9B"
        style={[styles.heroTxt, { marginBottom: 20 }]}
      >
        Take a selfie to verify your identity
      </ThemedText>

      {getFieldError("selfie_image") && (
        <View
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            padding: 12,
            borderRadius: 8,
            marginTop: 5
          }}
        >
          <ThemedText
            style={{ color: "#EF4444", fontSize: 13, textAlign: "center" }}
          >
            {getFieldError("selfie_image")}
          </ThemedText>
        </View>
      )}

      <View style={{ marginBottom: 24 }}>
        <SelfieUpload
          onBack={onPrevious}
          onSubmit={(selfieUri: string) => {
            updateFormData({ selfie_image: selfieUri });
            onSubmit(selfieUri);
          }}
          isLoading={isLoading}
        />
      </View>
      {hasValidSelfie && (
        <View style={{ marginTop: 1, gap: 12 }}>
          <CustomButton
            title="Continue to Review"
            handlePress={onNext}
            disabled={isLoading}
            btnStyles={{ width: "100%" }}
          />
        </View>
      )}
      <View
        style={{
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          padding: 16,
          borderRadius: 12,
          marginBottom: 20,
          marginTop: 25,
          borderLeftWidth: 4,
          borderLeftColor: "#EF4444"
        }}
      >
        <ThemedText
          style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}
        >
          Identity Verification Requirements
        </ThemedText>
        <View style={{ gap: 6 }}>
          <ThemedText style={{ fontSize: 13, lineHeight: 18 }}>
            • Face the camera directly with good lighting
          </ThemedText>
          <ThemedText style={{ fontSize: 13, lineHeight: 18 }}>
            • Remove sunglasses and ensure face is clearly visible
          </ThemedText>
          <ThemedText style={{ fontSize: 13, lineHeight: 18 }}>
            • Use a neutral expression (no smiling)
          </ThemedText>
          <ThemedText style={{ fontSize: 13, lineHeight: 18 }}>
            • Make sure the photo is clear and not blurry
          </ThemedText>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          padding: 16,
          borderRadius: 12,
          marginTop: 24
        }}
      >
        <ThemedText
          style={{ fontSize: 14, fontWeight: "600", marginBottom: 8 }}
        >
          🔒 Privacy & Security
        </ThemedText>
        <ThemedText style={{ fontSize: 13, lineHeight: 18, opacity: 0.8 }}>
          Your photo is encrypted and used only for identity verification. We
          never share your personal information with third parties. This process
          helps keep your account secure.
        </ThemedText>
      </View>
    </View>
  );
};

export default IdentityVerification;
