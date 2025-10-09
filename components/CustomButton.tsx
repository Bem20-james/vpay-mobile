import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  View
} from "react-native";
import React from "react";
import { ThemedText } from "./ThemedText";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  btnStyles?: object;
  textStyles?: object;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  backgroundColor?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'small' | 'medium' | 'large';
  textColor?: string;
  loadingColor?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  handlePress,
  btnStyles,
  textStyles,
  isLoading = false,
  disabled = false,
  icon,
  backgroundColor,
  variant = 'primary',
  size = 'medium',
  textColor,
  loadingColor
}) => {
  
  const getVariantStyles = () => {
    const variants = {
      primary: {
        backgroundColor: backgroundColor || "#208BC9",
        textColor: textColor || "white",
        borderColor: "transparent",
        borderWidth: 0
      },
      secondary: {
        backgroundColor: backgroundColor || "#CDEBFA",
        textColor: textColor || "#218DC9",
        borderColor: "transparent",
        borderWidth: 0,
      },
      success: {
        backgroundColor: backgroundColor || "#28A745",
        textColor: textColor || "white",
        borderColor: "transparent",
        borderWidth: 0
      },
      danger: {
        backgroundColor: backgroundColor || "#DC3545",
        textColor: textColor || "white",
        borderColor: "transparent",
        borderWidth: 0
      },
      warning: {
        backgroundColor: backgroundColor || "#FFC107",
        textColor: textColor || "#212529",
        borderColor: "transparent",
        borderWidth: 0
      },
      outline: {
        backgroundColor: backgroundColor || "transparent",
        textColor: textColor || "#208BC9",
        borderColor: "#208BC9",
        borderWidth: 0
      }
    };
    return variants[variant];
  };

  // Size configurations
  const getSizeStyles = () => {
    const sizes = {
      small: {
        height: 36,
        paddingHorizontal: 12,
        fontSize: 14,
        borderRadius: 10
      },
      medium: {
        height: 45,
        paddingHorizontal: 16,
        fontSize: 16,
        borderRadius: 100
      },
      large: {
        height: 54,
        paddingHorizontal: 100,
        fontSize: 18,
        borderRadius: 16
      }
    };
    return sizes[size];
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();
  const finalLoadingColor = loadingColor || variantStyles.textColor;

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading || disabled}
      style={[
        styles.customBtn,
        {
          backgroundColor: variantStyles.backgroundColor,
          borderColor: variantStyles.borderColor,
          borderWidth: variantStyles.borderWidth || 0,
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          borderRadius: sizeStyles.borderRadius
        },
        btnStyles,
        (isLoading || disabled) && { opacity: 0.5 }
      ]}
    >
      {/* {isLoading ? (
        <ThemedText>
          <ActivityIndicator size="small" color={finalLoadingColor} />
        </ThemedText>
      ) : ( */}
        <View style={styles.contentWrap}>
          {icon && <View style={styles.iconWrap}>{icon}</View>}
          <ThemedText
            type="default"
            lightColor={variantStyles.textColor}
            darkColor={variantStyles.textColor}
            style={[
              { 
                fontFamily: "Inter-Bold",
                fontSize: sizeStyles.fontSize
              },
              textStyles
            ]}
          >
            {title}
          </ThemedText>
        </View>
      {/* )} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customBtn: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  contentWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrap: {
    marginRight: 8
  }
});

export default CustomButton;