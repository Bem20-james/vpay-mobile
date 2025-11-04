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
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Currency {
  country_code: string;
  currency_code: string;
  image?: string;
  name: string;
  type: string;
  balance: number;
}

interface ConversionBody {
  base_currency: string;
  converted_amount: string;
  converted_fee: string;
  target_currency: string;
  total_converted: string;
  transaction_type?: string;
  warning?: string;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onPay: () => void;
  amount: string;
  selectedAsset: Currency;
  conversion: ConversionBody;
  snapPoints?: string[];
  title?: string;
  username?: string;

  // Transfer-specific
  bank?: string;
  accountNumber?: string;
  name?: string;

  // Airtime-specific
  phoneNumber?: string;
  provider?: string;

  // Mode
  type: "transfer" | "bills" | "data" | "airtime" | "vpay";
}

const ReviewBottomSheet = ({
  isVisible,
  onClose,
  onPay,
  amount,
  bank,
  accountNumber,
  name,
  selectedAsset,
  conversion,
  phoneNumber,
  provider,
  snapPoints = ["50", "60%"],
  title = "Review Details",
  type,
  username
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
            value:
              getSymbolFromCurrency(selectedAsset.currency_code) +
              conversion?.converted_fee
          }
        ]
      : type === "vpay"
      ? [
          { label: "username", value: username },
          { label: "Name", value: name, transform: "uppercase" },
          {
            label: "Amount",
            value: getSymbolFromCurrency(selectedAsset.currency_code) + amount
          },
          {
            label: "Transaction fee",
            value:
              getSymbolFromCurrency(conversion?.target_currency) +
              conversion?.converted_fee
          },
          {
            label: "Total amount",
            value: (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ThemedText>
                  {getSymbolFromCurrency(selectedAsset.currency_code)}
                  {amount}
                </ThemedText>
                <MaterialCommunityIcons
                  name="approximately-equal"
                  size={18}
                  color="#999"
                  style={{ marginHorizontal: 6 }}
                />
                <ThemedText>
                  {getSymbolFromCurrency(conversion?.target_currency)}
                  {conversion?.total_converted}
                </ThemedText>
              </View>
            )
          }
        ]
      : type === "bills"
      ? [
          { label: "Smartcard/IUC Number", value: phoneNumber },
          { label: "Provider", value: provider },

          { label: "Account Name", value: name, transform: "uppercase" },
          {
            label: "Amount",
            value: getSymbolFromCurrency(selectedAsset.currency_code) + amount
          },
          {
            label: "Transaction fee",
            value:
              getSymbolFromCurrency(selectedAsset.currency_code) +
              conversion?.converted_fee
          }
        ]
      : [
          { label: "Phone number", value: phoneNumber },
          { label: "Provider", value: provider },
          {
            label: "Amount",
            value: getSymbolFromCurrency(selectedAsset.currency_code) + amount
          },
          {
            label: "Transaction fee",
            value:
              getSymbolFromCurrency(selectedAsset.currency_code) +
              conversion?.converted_fee
          },
          {
            label: "Total amount",
            value:
              getSymbolFromCurrency(selectedAsset.currency_code) +
              conversion?.converted_fee
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
                    {(selectedAsset.balance ?? 0).toFixed(2)}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ position: "relative" }}>
              <View
                style={{
                  position: "absolute",
                  bottom: -80,
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
