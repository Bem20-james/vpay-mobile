import { TextInput, TouchableOpacity, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { DefaultTheme } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { styles } from "./styles/formfield";

type CountryItem = {
  label: string;
  value: string;
  flag: string;
  code: string;
};

interface FormFieldProps {
  title?: string;
  handleChangeText: (text: string) => void;
  value?: string;
  otherStyles?: object;
  placeholder?: string;
  multiline?: boolean;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  maxLength?: number;
  inputStyles?: object;
  editable?: boolean;

  isIcon?: boolean;
  iconName?: keyof typeof MaterialIcons.glyphMap;

  // Props for bottom sheet (dropdown)
  isDropdown?: boolean;
  dropdownData?: CountryItem[];
  onDropdownSelect?: (item: CountryItem) => void;
  dropdownIcon?: React.ReactNode;
  // Props for phone number
  isPhoneInput?: boolean;
  onCountrySelect?: (country: CountryItem) => void;
  defaultCountry?: CountryItem;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  multiline = false,
  keyboardType = "default",
  maxLength,
  inputStyles,
  editable = true,
  isDropdown = false,
  dropdownData = [],
  onDropdownSelect,
  isIcon,
  iconName,
  dropdownIcon = (
    <MaterialIcons name="arrow-drop-down" size={25} color="#838383" />
  ),
  isPhoneInput = false,
  onCountrySelect,
  defaultCountry = {
    label: "United States",
    value: "US",
    flag: "🇺🇸",
    code: "+1"
  },
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryItem | null>(
    defaultCountry
  );
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const colorScheme = useColorScheme();
  const border = colorScheme === "dark" ? "#E7E7E7" : "#E7E7E7";
  const txtColor = colorScheme === "dark" ? "#9B9B9B" : "#9B9B9B";
  const snapPoints = ["40%", "55%"];

  // Handle opening the bottom sheet through Portal to ensure it opens from bottom of screen
  const handleDropdownPress = () => {
    setShowBottomSheet(true);
    // Give enough time for the Portal to mount before expanding
    setTimeout(() => {
      bottomSheetRef.current?.expand();
    }, 100);
  };

  const handleBottomSheetItemPress = (item: CountryItem) => {
    if (isDropdown && onDropdownSelect) {
      onDropdownSelect(item);
      handleChangeText(item.label); // Update input with selected country label
    }
    if (isPhoneInput && onCountrySelect) {
      setSelectedCountry(item);
      onCountrySelect(item);
    }
    bottomSheetRef.current?.close();
  };

  // Close the bottom sheet and hide the Portal
  const handleSheetClose = () => {
    setShowBottomSheet(false);
  };

  return (
    <ThemedView
      style={[
        otherStyles,
        {
          backgroundColor: DefaultTheme
        }
      ]}
    >
      <ThemedText type="default">{title}</ThemedText>
      <ThemedView
        lightColor="transparent"
        darkColor="transparent"
        style={[
          styles.inputField,
          { borderColor: border, height: multiline ? 100 : 44 }
        ]}
      >
        {/* Display fixed country selector for phone input */}
        {isPhoneInput && selectedCountry && (
          <View style={styles.countryContainer}>
            <ThemedText darkColor="#FFFFFF" style={styles.countryCode}>
              {selectedCountry.flag} {selectedCountry.code}
            </ThemedText>
          </View>
        )}

        {isIcon && iconName && (
          <View>
            <MaterialIcons name={iconName} size={20} color="#208BC9" />
          </View>
        )}

        {/* The main input field */}
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

        {/* Password visibility toggle */}
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

        {/* Dropdown icon for dropdown fields */}
        {isDropdown && !isPhoneInput && (
          <TouchableOpacity onPress={handleDropdownPress}>
            {dropdownIcon}
          </TouchableOpacity>
        )}

        {/* For phone input, add a clickable country selector */}
        {isPhoneInput && (
          <TouchableOpacity
            style={styles.countrySelector}
            onPress={handleDropdownPress}
          >
            <MaterialIcons name="arrow-drop-down" size={22} color="#838383" />
          </TouchableOpacity>
        )}
      </ThemedView>

      {/* Bottom Sheet in Portal to ensure it comes from bottom of screen */}
      {showBottomSheet && (
        <Portal>
          <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={handleSheetClose}
            backgroundStyle={{
              backgroundColor: colorScheme === "dark" ? "#1A1A1A" : "#FFFFFF"
            }}
          >
            <ThemedView style={styles.bottomSheetHeader}>
              <ThemedText style={styles.bottomSheetTitle}>
                {isPhoneInput ? "Select Country" : "Select Option"}
              </ThemedText>
            </ThemedView>
            <BottomSheetFlatList
              data={dropdownData}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.bottomSheetItem}
                  onPress={() => handleBottomSheetItemPress(item)}
                >
                  <ThemedText style={styles.bottomSheetItemText}>
                    {item.flag} {item.label} {isPhoneInput && item.code}
                  </ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.bottomSheetContent}
            />
          </BottomSheet>
        </Portal>
      )}
    </ThemedView>
  );
};

export default FormField;
