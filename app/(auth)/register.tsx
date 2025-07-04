import { Image, View, ScrollView, Text, Pressable } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/styles/auth";
import StepTwo from "../../components/StepTwo";
import { useFetchCountries } from "@/hooks/useGeneral";
import { useRegister } from "@/hooks/useAuthentication";
import OtpVerification from "./otp-verification";
import { FontAwesome } from "@expo/vector-icons";
import CountryBottomSheet from "@/components/BottomSheets/Countries";
import { CountryItem } from "@/components/FormFields";

const Register = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const [stepTwoVisible, setStepTwoVisible] = useState(false);
  const { loading, countries } = useFetchCountries();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const register = useRegister();
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [showCountryBottomSheet, setShowCountryBottomSheet] = useState(false);

  const [form, setForm] = useState<{
    fname: string;
    lname: string;
    email: string;
    username: string;
    password: string;
    country: string;
    countryId: string;
    countryObj: CountryItem | null;
    phone: string;
    referralCode: string;
  }>({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    country: "",
    countryId: "",
    countryObj: null,
    phone: "",
    referralCode: ""
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    country: "",
    phone: "",
    general: ""
  });

  const isOnlyLetters = (value: string) => /^[A-Za-z]+$/.test(value.trim());

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
  };
  const handleFieldChange = (field: string, value: string) => {
    if (field === "phone") {
      value = value.trim().slice(0, 11);
    }

    if (["fname", "lname", "username", "email"].includes(field)) {
      value = value.trim();
    }

    const newForm = { ...form, [field]: value };
    setForm(newForm);
    let newErrors = { ...errors };

    switch (field) {
      case "fname":
      case "lname":
        if (value && isOnlyLetters(value)) newErrors[field] = "";
        break;
      case "username":
        if (value && isOnlyLetters(value.trim())) newErrors.username = "";
        break;
      case "email":
        if (validateEmail(value)) newErrors.email = "";
        break;
      case "password":
        if (validatePassword(value)) newErrors.password = "";
        break;
      case "phone":
        if (value.trim()) newErrors.phone = "";
        break;
      case "country":
        if (value) newErrors.country = "";
        break;
    }

    setErrors(newErrors);
  };

  const validateStepOne = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!form.country) {
      newErrors.country = "Please select a country";
      valid = false;
    }

    if (!form.fname.trim()) {
      newErrors.fname = "First name is required";
      valid = false;
    } else if (!isOnlyLetters(form.fname)) {
      newErrors.fname = "First name must contain only letters";
      valid = false;
    }

    if (!form.lname.trim()) {
      newErrors.lname = "Last name is required";
      valid = false;
    } else if (!isOnlyLetters(form.lname)) {
      newErrors.lname = "Last name must contain only letters";
      valid = false;
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStepTwo = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    } else if (!isOnlyLetters(form.username.trim())) {
      newErrors.username = "Username must contain only letters";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!validatePassword(form.password)) {
      newErrors.password =
        "8-20 characters, one uppercase, one number, one special character";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isStepOneValid = () => {
    return (
      form.country &&
      form.fname.trim() &&
      isOnlyLetters(form.fname) &&
      form.lname.trim() &&
      isOnlyLetters(form.lname) &&
      form.phone.trim()
    );
  };

  const isStepTwoValid = () => {
    return (
      form.email.trim() &&
      validateEmail(form.email) &&
      form.username.trim() &&
      isOnlyLetters(form.username) &&
      form.password &&
      validatePassword(form.password)
    );
  };
  const canSubmit = stepTwoVisible ? isStepTwoValid() : isStepOneValid();

  const handleNextStep = async () => {
    if (!stepTwoVisible) {
      if (validateStepOne()) setStepTwoVisible(true);
    } else {
      if (validateStepTwo()) {
        setIsSubmitting(true);
        try {
          const success = await register({
            firstname: form.fname,
            lastname: form.lname,
            email: form.email,
            username: form.username,
            password: form.password,
            country_id: form.countryId,
            phone: form.phone,
            referral: form.referralCode
          });
          if (success) {
            setShowOtpScreen(true);
            setIsSubmitting(false);
            setShowOtpScreen(true);
          }
        } catch (error) {
          setIsSubmitting(false);

          console.error("Registration error:", error);
          setErrors((prev) => ({
            ...prev,
            general: "Registration failed. Please try again."
          }));
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  if (showOtpScreen) {
    return (
      <OtpVerification
        mode="verify-email"
        email={form.email}
        onBack={() => setShowOtpScreen(false)}
      />
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          {stepTwoVisible && (
            <Pressable onPress={() => setStepTwoVisible(false)}>
              <FontAwesome name="angle-left" size={30} color={"#9B9B9B"} />
            </Pressable>
          )}
          {colorScheme === "dark" ? (
            <Image source={images.logolight} style={styles.logo} />
          ) : (
            <Image source={images.logodark} style={styles.logo} />
          )}

          <View style={{ marginTop: 40 }}>
            <ThemedText style={styles.heading}>
              {stepTwoVisible
                ? "Enter your personal details"
                : "Create your account"}
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              {stepTwoVisible
                ? "Almost done! Just a few more details."
                : "Welcome to VPay, let's get you started."}
            </ThemedText>
          </View>

          {!stepTwoVisible ? (
            <>
              <FormField
                handleChangeText={(val) => handleFieldChange("country", val)}
                value={form.country}
                isDropdown
                onDropdownPress={() => setShowCountryBottomSheet(true)}
                placeholder="Select a country"
                isIcon
                iconName="public"
                error={errors.country}
              />
              <FormField
                placeholder="First Name"
                handleChangeText={(val) => handleFieldChange("fname", val)}
                value={form.fname}
                otherStyles={{ marginTop: 5 }}
                keyboardType="default"
                isIcon
                iconName="person"
                error={errors.fname}
              />
              <FormField
                placeholder="Last Name"
                handleChangeText={(val) => handleFieldChange("lname", val)}
                value={form.lname}
                otherStyles={{ marginTop: 5 }}
                keyboardType="default"
                isIcon
                iconName="person"
                error={errors.lname}
              />
              <FormField
                handleChangeText={(val) => handleFieldChange("phone", val)}
                value={form.phone}
                isPhoneInput
                keyboardType="phone-pad"
                defaultCountry={form.countryObj ?? undefined}
                placeholder="Enter phone number"
                error={errors.phone}
              />
            </>
          ) : (
            <StepTwo
              form={form}
              setForm={setForm}
              errors={errors}
              setErrors={setErrors}
              onFieldChange={handleFieldChange}
            />
          )}

          {errors.general && (
            <ThemedText style={{ color: "red", marginTop: 10 }}>
              {errors.general}
            </ThemedText>
          )}

          <CustomButton
            title={stepTwoVisible ? "Sign Up" : "Continue"}
            handlePress={handleNextStep}
            btnStyles={{ width: "100%", marginTop: 65 }}
            isLoading={isSubmitting}
            disabled={!canSubmit}
          />

          <View style={styles.btmContent}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
                gap: 4
              }}
            >
              <ThemedText style={{ fontFamily: "Questrial" }}>
                Already have an account?
              </ThemedText>
              <Pressable onPress={() => router.push("/login")}>
                <ThemedText
                  style={{
                    fontFamily: "Questrial",
                    fontWeight: "bold",
                    color: "#218DC9",
                    textDecorationLine: "underline"
                  }}
                >
                  Sign In
                </ThemedText>
              </Pressable>
            </View>

            <ThemedText style={styles.btmTxt}>
              By clicking “{stepTwoVisible ? "Sign Up" : "Continue"}”, you agree
              to vPay
              <Text
                style={{
                  fontFamily: "Inter",
                  fontWeight: "bold",
                  fontSize: 12,
                  color: "#218DC9"
                }}
              >
                {" Terms & Service, Privacy Policy and Other Policies."}
              </Text>
            </ThemedText>
          </View>
        </View>
      </ScrollView>
      <CountryBottomSheet
        isVisible={showCountryBottomSheet}
        onClose={() => setShowCountryBottomSheet(false)}
        data={countries}
        onSelect={(item) => {
          setForm((prev) => ({
            ...prev,
            country: item.country_name,
            countryId: item.id?.toString() || "",
            countryObj: item
          }));
          setErrors((prev) => ({
            ...prev,
            country: ""
          }));
          setShowCountryBottomSheet(false);
        }}
        isLoading={loading}
      />
    </SafeAreaView>
  );
};

export default Register;
