import React from "react";
import FormField from "@/components/FormFields";

const StepTwo = () => {
  return (
    <>
      <FormField
        placeholder="Email Address"
        handleChangeText={() => {}}
        keyboardType="email-address"
        isIcon
        iconName="email"
      />
      <FormField
        placeholder="Username"
        handleChangeText={() => {}}
        keyboardType="default"
        otherStyles={{ marginTop: 5 }}
        isIcon
        iconName="alternate-email"
      />
      <FormField
        placeholder="Password"
        handleChangeText={() => {}}
        otherStyles={{ marginTop: 5 }}
        isIcon
        iconName="shield"
      />
      <FormField
        placeholder="Referral Code (optional)"
        handleChangeText={() => {}}
        otherStyles={{ marginTop: 5 }}
      />
    </>
  );
};

export default StepTwo;
