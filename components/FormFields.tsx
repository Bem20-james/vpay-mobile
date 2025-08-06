import { TextInput, TouchableOpacity, View } from "react-native";
import React, { useState, useEffect } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { DefaultTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import CountryFlag from "react-native-country-flag";
import { styles } from "../styles/formfield";
import { Colors } from "@/constants/Colors";

export type CountryItem = {
  id?: number;
  country_name: string;
  country_code: string;
  country_dial_code: string;
};

interface FormFieldProps {
  title?: string;
  handleChangeText: (text: string) => void;
  value?: string;
  otherStyles?: object;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  maxLength?: number;
  inputStyles?: object;
  editable?: boolean;
  error?: string;
  isIcon?: boolean;
  isLeftIcon?: boolean;
  isRightIcon?: boolean;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  isDropdown?: boolean;
  onDropdownPress?: () => void;
  dropdownIcon?: React.ReactNode;
  isPhoneInput?: boolean;
  defaultCountry?: CountryItem;
  helpText?: string;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  multiline = false,
  keyboardType = "default",
  autoCapitalize = "none",
  maxLength,
  inputStyles,
  editable = true,
  isDropdown = false,
  onDropdownPress,
  isIcon,
  isLeftIcon = false, // Default to false for right icon
  isRightIcon = false,
  iconName,
  error,
  dropdownIcon = (
    <MaterialIcons name="arrow-drop-down" size={25} color="#838383" />
  ),
  isPhoneInput = false,
  defaultCountry = {
    country_name: "Nigeria",
    country_code: "NG",
    country_dial_code: "+234"
  },
  helpText,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(
    defaultCountry
  );

  useEffect(() => {
    if (
      defaultCountry &&
      defaultCountry.country_code !== selectedCountry?.country_code
    ) {
      setSelectedCountry(defaultCountry);
    }
  }, [defaultCountry, selectedCountry]);

  const colorScheme = useColorScheme();
  const border = colorScheme === "dark" ? "#414141" : "#d7d7d7";
  const txtColor =
    colorScheme === "dark" ? Colors.light.accentBg : Colors.dark.background;

  return (
    <ThemedView style={[otherStyles, { backgroundColor: DefaultTheme }]}>
      {title && (
        <ThemedText type="default" style={{ marginLeft: 6, marginBottom: 5 }}>
          {title}
        </ThemedText>
      )}
      <ThemedView
        lightColor="transparent"
        darkColor="transparent"
        style={[
          styles.inputField,
          { borderColor: border, height: multiline ? 100 : 44 }
        ]}
      >
        {isPhoneInput && selectedCountry && (
          <View style={styles.countryContainer}>
            <View style={styles.bottomSheetItemCon}>
              <CountryFlag
                isoCode={selectedCountry.country_code}
                size={12}
                style={{ borderRadius: 2 }}
              />
              <ThemedText
                darkColor="#9B9B9B"
                lightColor="#9B9B9B"
                style={styles.countryCode}
              >
                {selectedCountry.country_dial_code}
              </ThemedText>
            </View>
          </View>
        )}

        {isIcon && iconName && (
          <View>
            <MaterialIcons name={iconName} size={20} color="#208BC9" />
          </View>
        )}

        <TextInput
          style={[
            inputStyles,
            styles.input,
            multiline && styles.multilineInput,
            isPhoneInput && styles.phoneInput,
            { color: txtColor }
          ]}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#9B9B9B"}
          onChangeText={handleChangeText}
          editable={editable && !(isDropdown && !isPhoneInput)}
          autoCapitalize={autoCapitalize}
          secureTextEntry={
            (placeholder === "Password" ||
              placeholder === "Confirm Password" ||
              placeholder === "New Password") &&
            !showPassword
          }
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          keyboardType={isPhoneInput ? "phone-pad" : keyboardType}
          maxLength={maxLength}
          {...props}
        />

        {isLeftIcon && iconName && (
          <View>
            <MaterialIcons name={iconName} size={20} color="#208BC9" />
          </View>
        )}

        {(placeholder === "Password" ||
          placeholder === "Confirm Password" ||
          placeholder === "New Password") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <MaterialIcons name="visibility-off" size={25} color="#838383" />
            ) : (
              <MaterialIcons name="visibility" size={25} color="#838383" />
            )}
          </TouchableOpacity>
        )}

        {isDropdown && (
          <TouchableOpacity onPress={onDropdownPress}>
            {dropdownIcon}
          </TouchableOpacity>
        )}
        {isRightIcon && iconName && (
          <View>
            <MaterialIcons name={iconName} size={20} color="#208BC9" />
          </View>
        )}
      </ThemedView>
      <ThemedText
        style={{ fontFamily: "Questrial", fontSize: 11, color: "#9B9B9B" }}
      >
        {helpText}
      </ThemedText>
      {error && (
        <ThemedText
          style={styles.errorText}
          darkColor="#D22C1F"
          lightColor="#D22C1F"
        >
          {error}
        </ThemedText>
      )}
    </ThemedView>
  );
};

export default FormField;
