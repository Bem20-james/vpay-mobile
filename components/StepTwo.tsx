import React from "react";
import { View } from "react-native";
import FormField from "@/components/FormFields";

interface StepTwoProps {
  form: {
    email: string;
    username: string;
    password: string;
    referrer?: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  errors: {
    email?: string;
    username?: string;
    password?: string;
    referrer?: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<any>>;
  onFieldChange: (field: string, value: string) => void;
}

const StepTwo: React.FC<StepTwoProps> = ({ form, errors, onFieldChange }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <FormField
        placeholder="Email"
        keyboardType="email-address"
        handleChangeText={(val) => onFieldChange("email", val)}
        value={form.email}
        isIcon
        iconName="mail"
        error={errors.email}
      />

      <FormField
        placeholder="Username"
        handleChangeText={(val) => onFieldChange("username", val)}
        value={form.username}
        isIcon
        iconName="person"
        error={errors.username}
      />

      <FormField
        placeholder="Password"
        handleChangeText={(val) => onFieldChange("password", val)}
        value={form.password}
        isIcon
        iconName="lock"
        error={errors.password}
      />

      <FormField
        placeholder="Referral Code (optional)"
        handleChangeText={(val) => onFieldChange("referrer", val)}
        value={form.referrer || ""}
        isIcon
        iconName="card-giftcard"
      />
    </View>
  );
};

export default StepTwo;
