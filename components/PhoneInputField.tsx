import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";
import { styles } from "@/styles/formfield";
import { TransferStyles } from "@/styles/transfers";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import { useTheme } from "@/contexts/ThemeContexts";

export type ProviderItem = {
  id: string | number;
  provider_name: string;
  country_code: string;
  currency_code: string;
  image: any;
};

interface ProviderInputProps {
  value?: string;
  handleChangeText: (text: string) => void;
  placeholder?: string;
  providers: ProviderItem[];
  userCountryCode: string;
  onProviderSelect?: (provider: ProviderItem) => void;
  onContactPress?: () => void;
  maxLength?: number;
}

const ProviderInput: React.FC<ProviderInputProps> = ({
  value,
  handleChangeText,
  placeholder,
  providers,
  userCountryCode,
  onProviderSelect,
  onContactPress,
  maxLength
}) => {
  const {theme} = useTheme();
  const isDark = theme === "dark";
  const border = isDark ? "#414141" : "#d7d7d7";
  const txtColor = isDark ? Colors.light.accentBg : Colors.dark.background;
  const bgColor = isDark ? Colors.dark.accentBg : Colors.light.accentBg;

  const [selectedProvider, setSelectedProvider] = useState<ProviderItem | null>(
    null
  );
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredProviders = (providers || []).filter(
    (p) => p.country_code === userCountryCode
  );

  useEffect(() => {
    if (filteredProviders.length > 0) {
      setSelectedProvider(filteredProviders[0]);
    }
  }, [userCountryCode, providers]);

  const handleProviderSelect = (provider: ProviderItem) => {
    setSelectedProvider(provider);
    setShowDropdown(false);
    onProviderSelect?.(provider);
  };

  return (
    <View
      style={[
        TransferStyles.inputBox,
        { backgroundColor: bgColor, marginTop: 20 }
      ]}
    >
      <ThemedText style={TransferStyles.label}>{"phone number"}</ThemedText>
      <View
        style={[
          styles.inputField,
          { borderColor: border, backgroundColor: "transparent" }
        ]}
      >
        <TouchableOpacity
          onPress={() => setShowDropdown((prev) => !prev)}
          style={providerStyles.logoCon}
        >
          <Image
            source={{ uri: `${SERVER_IMAGE_URL}/${selectedProvider?.image}` }}
            style={providerStyles.logo}
          />

          <MaterialIcons
            name={showDropdown ? "arrow-drop-up" : "arrow-drop-down"}
            size={25}
            color={showDropdown ? "#208DC9" : "#9B9B9B"}
          />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { color: txtColor }]}
          placeholder={placeholder}
          placeholderTextColor="#9B9B9B"
          value={value}
          onChangeText={handleChangeText}
          keyboardType="phone-pad"
          maxLength={maxLength}
        />

        <TouchableOpacity onPress={onContactPress}>
          <MaterialIcons name="person" size={26} color="#208BC9" />
        </TouchableOpacity>
      </View>

      {showDropdown && (
        <FlatList
          data={filteredProviders}
          keyExtractor={(item) => String(item.id)}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const isSelected = selectedProvider?.id === item.id;
            return (
              <TouchableOpacity
                style={providerStyles.dropdownItem}
                onPress={() => handleProviderSelect(item)}
              >
                <Image
                  source={{ uri: `${SERVER_IMAGE_URL}/${item.image}` }}
                  style={providerStyles.dropdownLogo}
                />
                <ThemedText style={providerStyles.dropdownText}>
                  {item.provider_name}
                </ThemedText>
                {isSelected && (
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    color={Colors.light.primary}
                  />
                )}
              </TouchableOpacity>
            );
          }}
          style={[
            providerStyles.dropdown,
            {
              backgroundColor: isDark
                ? Colors.dark.primaryBgDark
                : Colors.light.accentBg
            }
          ]}
        />
      )}
    </View>
  );
};

export default ProviderInput;

const providerStyles = StyleSheet.create({
  logoCon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingVertical: 7,
    marginVertical: 2
  },
  logo: {
    width: 25,
    height: 25,
    borderRadius: 100
  },
  dropdown: {
    marginTop: 5,
    borderRadius: 8,
    paddingVertical: 5,
    elevation: 3
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.3,
    borderColor: "#333"
  },
  dropdownLogo: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    marginRight: 10,
    borderRadius: 10
  },
  dropdownText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Inter-SemiBold"
  }
});
