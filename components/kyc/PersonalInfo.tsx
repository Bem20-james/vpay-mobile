import React, { useState, useCallback, useRef } from "react";
import { View, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContexts";
import { usePersonalVerification } from "@/hooks/useKYC";
import { KycStyles as styles } from "@/styles/kyc";

import StepIndicator from "../StepIndicator";
import BasicInformation from "./Steps/BasicInformation";
import PersonalInformation from "./Steps/PersonalInformation";
import IdentityVerification from "./Steps/IdentityVerification";
import ReviewInformation from "./Steps/ReviewInformation";

export interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  marital_status: string;
  occupation: string;
  country: string;
  state: string;
  city: string;
  postal_code: string;
  address: string;
  selfie_image: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface StepValidation {
  isValid: boolean;
  errors: FormErrors;
}

type PersonalInfoProps = {
  onBack: () => void;
};

const STEPS = [
  { id: 1, title: "Basic Info", description: "Personal details" },
  { id: 2, title: "Details", description: "Address & occupation" },
  { id: 3, title: "Selfie Upload", description: "Photo verification" },
  { id: 4, title: "Review", description: "Confirm details" }
];

const PersonalInfo = ({ onBack }: PersonalInfoProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const router = useRouter();
  const { user } = useUser();
  const verifyUserInfo = usePersonalVerification();

  // Auto-save reference
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: "",
    dob: "",
    marital_status: "",
    occupation: "",
    country: user?.country?.name || "",
    state: "",
    city: "",
    postal_code: "",
    address: "",
    selfie_image: ""
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Submission state
  const [submission, setSubmission] = useState({
    isLoading: false,
    error: null as string | null,
    hasAttempted: false
  });

  // Auto-save functionality
  const autoSave = useCallback((data: FormData) => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    autoSaveTimeoutRef.current = setTimeout(() => {
      try {
        // Here you could save to AsyncStorage or a draft API endpoint
        console.log("Auto-saving form data...", data);
      } catch (error) {
        console.warn("Auto-save failed:", error);
      }
    }, 2000);
  }, []);

  // Form validation
  const validateStep = useCallback(
    (step: number, data: FormData): StepValidation => {
      const errors: FormErrors = {};

      switch (step) {
        case 1:
          if (!data.firstname.trim())
            errors.firstname = "First name is required";
          if (!data.lastname.trim()) errors.lastname = "Last name is required";
          if (!data.email.trim()) {
            errors.email = "Email is required";
          } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = "Please enter a valid email";
          }
          if (!data.phone.trim()) {
            errors.phone = "Phone number is required";
          } else if (data.phone.length < 10) {
            errors.phone = "Please enter a valid phone number";
          }
          if (!data.gender) errors.gender = "Gender is required";
          if (!data.dob) errors.dob = "Date of birth is required";
          break;

        case 2: 
          if (!data.marital_status)
            errors.marital_status = "Marital status is required";
          if (!data.occupation.trim())
            errors.occupation = "Occupation is required";
          if (!data.country.trim()) errors.country = "Country is required";
          if (!data.state.trim()) errors.state = "State is required";
          if (!data.city.trim()) errors.city = "City is required";
          if (!data.postal_code.trim())
            errors.postal_code = "Postal code is required";
          if (!data.address.trim()) errors.address = "Address is required";
          break;

        case 3:
          if (!data.selfie_image)
            errors.selfie_image = "Selfie is required for verification";
          break;
      }

      return {
        isValid: Object.keys(errors).length === 0,
        errors
      };
    },
    []
  );

  // Update form data with validation
  const updateFormData = useCallback(
    (updates: Partial<FormData>) => {
      const newData = { ...formData, ...updates };
      setFormData(newData);

      // Mark updated fields as touched
      Object.keys(updates).forEach((key) => {
        setTouchedFields((prev) => new Set([...prev, key]));
      });

      // Validate current step
      const validation = validateStep(currentStep, newData);
      setFormErrors(validation.errors);

      // Auto-save
      autoSave(newData);
    },
    [formData, currentStep, validateStep, autoSave]
  );

  // Navigation handlers
  const handleNext = useCallback(() => {
    const validation = validateStep(currentStep, formData);
    setFormErrors(validation.errors);

    if (validation.isValid) {
      if (currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
      }
    } else {
      // Mark all fields in current step as touched to show errors
      const stepFields = getStepFields(currentStep);
      setTouchedFields((prev) => new Set([...prev, ...stepFields]));
    }
  }, [currentStep, formData, validateStep]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      // Show confirmation dialog before leaving
      Alert.alert(
        "Exit Form",
        "Are you sure you want to go back? Your progress will be saved as a draft.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: onBack }
        ]
      );
    }
  }, [currentStep, onBack]);

  const handleFinalSubmit = useCallback(async () => {
    setSubmission({ isLoading: true, error: null, hasAttempted: true });

    try {
      const res = await verifyUserInfo({
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        marital_status: formData.marital_status,
        occupation: formData.occupation,
        postal_code: formData.postal_code,
        state: formData.state,
        city: formData.city,
        dob: formData.dob,
        address: formData.address,
        selfie_image: formData.selfie_image
      });

      setSubmission({ isLoading: false, error: null, hasAttempted: true });

      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      if (res) {
        Alert.alert(
          "Verification Submitted",
          "Your information has been submitted for verification. You'll be notified once it's complete.",
          [{ text: "OK", onPress: () => router.push("/(tabs)/home") }]
        );
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setSubmission({
        isLoading: false,
        error: error?.message || "Something went wrong. Please try again.",
        hasAttempted: true
      });
    }
  }, [formData, verifyUserInfo, router]);

  // Get fields for current step (for validation)
  const getStepFields = (step: number): string[] => {
    switch (step) {
      case 1:
        return ["firstname", "lastname", "email", "phone", "gender", "dob"];
      case 2:
        return [
          "marital_status",
          "occupation",
          "country",
          "state",
          "city",
          "postal_code",
          "address"
        ];
      case 3:
        return ["selfie_image"];
      default:
        return [];
    }
  };

  const renderCurrentStep = () => {
    const stepProps = {
      formData,
      formErrors,
      touchedFields,
      updateFormData,
      onNext: handleNext,
      onPrevious: handlePrevious,
      isLoading: submission.isLoading
    };

    switch (currentStep) {
      case 1:
        return <BasicInformation {...stepProps} />;
      case 2:
        return <PersonalInformation {...stepProps} />;
      case 3:
        return (
          <IdentityVerification
            {...stepProps}
            onSubmit={(selfieUri: string) => {
              updateFormData({ selfie_image: selfieUri });
              setTimeout(() => handleNext(), 100);
            }}
          />
        );
      case 4:
        return (
          <ReviewInformation
            {...stepProps}
            onFinalSubmit={handleFinalSubmit}
            submissionError={submission.error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <StepIndicator
            steps={STEPS}
            currentStep={currentStep}
            onBack={handlePrevious}
          />

          {renderCurrentStep()}
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default PersonalInfo;
