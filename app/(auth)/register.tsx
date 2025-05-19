import { Image, View, ScrollView, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import FormField from "@/components/FormFields";
import CustomButton from "@/components/CustomButton";
import { styles } from "@/components/styles/auth";
import { Link } from "expo-router";
import StepTwo from "../../components/StepTwo";

const countries = [
  { label: "Nigeria", value: "NG", flag: "🇳🇬", code: "+234" },
  { label: "United States", value: "US", flag: "🇺🇸", code: "+1" },
  { label: "United Kingdom", value: "GB", flag: "🇬🇧", code: "+44" }
];

const Register = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const [stepTwoVisible, setStepTwoVisible] = useState(false);

  const handleNextStep = () => {
    if (!stepTwoVisible) {
      setStepTwoVisible(true);
    } else {
      console.log("Submit signup");
      router.push("/(auth)/otp-verification");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, height: "100%" }}>
      <ScrollView>
        <View style={styles.container}>
          <Image source={images.logo} style={styles.logo} />
          <View style={{ marginTop: 40 }}>
            <ThemedText
              darkColor="#FFFFFF"
              lightColor="#000000"
              style={styles.heading}
            >
              {stepTwoVisible
                ? "Enter your personal details"
                : "Create your account"}
            </ThemedText>
            <ThemedText
              darkColor="#9B9B9B"
              lightColor="#9B9B9B"
              style={styles.subtitle}
            >
              {stepTwoVisible
                ? "Almost done! Just a few more details."
                : "Welcome to VPay, let's get you started."}
            </ThemedText>
          </View>

          {!stepTwoVisible ? (
            <>
              <FormField
                handleChangeText={() => {}}
                isDropdown
                dropdownData={countries}
                onDropdownSelect={(item) => console.log("Selected:", item)}
                placeholder="Select a country"
                isIcon
                iconName="public"
              />
              <FormField
                placeholder={"First Name"}
                handleChangeText={() => {}}
                otherStyles={{ marginTop: 5 }}
                keyboardType="email-address"
                isIcon
                iconName="person"
              />
              <FormField
                placeholder={"Last Name"}
                handleChangeText={() => {}}
                otherStyles={{ marginTop: 5 }}
                keyboardType="email-address"
                isIcon
                iconName="person"
              />
              <FormField
                handleChangeText={() => {}}
                isPhoneInput
                dropdownData={countries}
                onCountrySelect={(country) => country}
                keyboardType="phone-pad"
                defaultCountry={countries[0]}
                placeholder="Enter phone number"
              />
            </>
          ) : (
            <StepTwo />
          )}

          <CustomButton
            title={stepTwoVisible ? "Sign Up" : "Continue"}
            handlePress={handleNextStep}
            btnStyles={{ width: "100%", marginTop: 65 }}
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
              <ThemedText lightColor="#9B9B9B" darkColor="#9B9B9B">
                {stepTwoVisible
                  ? "Not registered yet?"
                  : "Already have an account?"}
              </ThemedText>
              <Link href="/login">
                <ThemedText
                  style={{
                    fontFamily: "Inter",
                    fontWeight: "bold",
                    color: "#218DC9",
                    textDecorationLine: "underline"
                  }}
                >
                  Login
                </ThemedText>
              </Link>
            </View>

            <ThemedText
              lightColor="#9B9B9B"
              darkColor="#9B9B9B"
              style={styles.btmTxt}
            >
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
                Terms & Service, Privacy Policy and Other Policies.
              </Text>
            </ThemedText>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
