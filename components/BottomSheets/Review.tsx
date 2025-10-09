import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import CustomButton from "../CustomButton";
import { Colors } from "@/constants/Colors";
import getSymbolFromCurrency from "currency-symbol-map";
import { btmSheetStyles } from "@/styles/bottomsheets";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import CountryFlag from "react-native-country-flag";
import { TransferStyles as styles } from "@/styles/transfers";
import images from "@/constants/Images";

interface Currency {
  country_code: string;
  currency_code: string;
  image?: string;
  name: string;
  type: string;
  balance: number;
}
interface Props {
  isVisible: boolean;
  onClose: () => void;
  onPay: () => void;
  amount: string;
  rate: string;
  selectedAsset: Currency;
  snapPoints?: string[];
  title?: string;

  // Transfer-specific
  bank?: string;
  accountNumber?: string;
  name?: string;

  // Airtime-specific
  phoneNumber?: string;
  provider?: string;

  // Mode
  type: "transfer" | "airtime" | "data";
}

const ReviewBottomSheet = ({
  isVisible,
  onClose,
  onPay,
  rate,
  amount,
  bank,
  accountNumber,
  name,
  selectedAsset,
  phoneNumber,
  provider,
  snapPoints = ["50", "60%"],
  title = "Review Details",
  type
}: Props) => {
  const sheetRef = useRef<BottomSheet>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const border = isDark ? "#414141" : "#d7d7d7";

  console.log("💰 Selected Asset in ReviewBottomSheet:", selectedAsset);

  useEffect(() => {
    if (isVisible) sheetRef.current?.expand();
  }, [isVisible]);

  if (!isVisible) return null;

  const handleConfirm = () => {
    onClose();
    onPay();
  };

  // Dynamically build the list
  const details =
    type === "transfer"
      ? [
          { label: "Bank", value: bank },
          { label: "Account Number", value: accountNumber },
          { label: "Name", value: name, transform: "uppercase" },
          {
            label: "Amount",
            value: getSymbolFromCurrency(selectedAsset.currency_code) + amount
          },
          {
            label: "Transaction fee",
            value: getSymbolFromCurrency(selectedAsset.currency_code) + rate
          }
        ]
      : [
          { label: "Phone Number", value: phoneNumber },
          { label: "Provider", value: provider },
          {
            label: "Amount",
            value: getSymbolFromCurrency(selectedAsset.currency_code) + amount
          },
          {
            label: "Transaction fee",
            value: getSymbolFromCurrency(selectedAsset.currency_code) + rate
          }
        ];

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={btmSheetStyles.indicatorHandle}
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: isDark
            ? Colors.dark.primaryBgDark
            : Colors.light.accentBg
        }}
      >
        <BottomSheetView>
          <ThemedText
            style={btmSheetStyles.title}
            lightColor="#252525"
            darkColor="#9B9B9B"
          >
            {title}
          </ThemedText>

          <View style={btmSheetStyles.container}>
            {details.map((item, index) => (
              <View
                style={[
                  btmSheetStyles.detailRow,
                  { borderBottomColor: border }
                ]}
                key={index}
              >
                <ThemedText style={btmSheetStyles.label}>
                  {item.label}
                </ThemedText>
                <ThemedText
                  style={[
                    btmSheetStyles.value,
                    item.transform === "uppercase" && {
                      textTransform: "uppercase"
                    }
                  ]}
                >
                  {item.value}
                </ThemedText>
              </View>
            ))}

            <View
              style={[
                btmSheetStyles.paymentMethod,
                {
                  backgroundColor: isDark
                    ? Colors.light.primaryDark3
                    : Colors.light.primary
                }
              ]}
            >
              <ThemedText
                style={[
                  btmSheetStyles.paymentText,
                  { color: isDark ? "#F5F5F5" : "#FFFFFF" }
                ]}
              >
                Payment Method
              </ThemedText>
              <TouchableOpacity
                style={btmSheetStyles.item}
                onPress={() => sheetRef.current?.close()}
              >
                <View style={styles.flagWrapper}>
                  {selectedAsset.image ? (
                    <Image
                      source={{
                        uri: `${SERVER_IMAGE_URL}/${selectedAsset.image}`
                      }}
                      style={styles.flag}
                    />
                  ) : selectedAsset.country_code ? (
                    <CountryFlag
                      isoCode={selectedAsset.country_code}
                      size={20}
                      style={styles.flag}
                    />
                  ) : (
                    <Image source={images.logodark} style={styles.logo} />
                  )}
                </View>

                <View style={btmSheetStyles.labelWrapper}>
                  <ThemedText
                    style={[
                      btmSheetStyles.label,
                      { color: isDark ? "#F5F5F5" : "#FFFFFF" }
                    ]}
                  >
                    {selectedAsset.name} ({selectedAsset.currency_code})
                  </ThemedText>
                </View>

                <View style={btmSheetStyles.amountWrapper}>
                  <ThemedText
                    style={[
                      btmSheetStyles.amount,
                      { color: isDark ? "#F5F5F5" : "#FFFFFF" }
                    ]}
                  >
                    {getSymbolFromCurrency(selectedAsset.country_code) || "₦"}
                    {selectedAsset.balance.toFixed(2)}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  bottom: -90,
                  left: 1,
                  right: 1
                }}
              >
                <CustomButton
                  title="Confirm"
                  handlePress={handleConfirm}
                  btnStyles={{ width: "100%" }}
                />
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};
export default ReviewBottomSheet;
