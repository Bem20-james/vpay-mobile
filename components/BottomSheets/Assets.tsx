import React, { useRef, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import getSymbolFromCurrency from "currency-symbol-map";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import CountryFlag from "react-native-country-flag";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import { btmSheetStyles } from "@/styles/bottomsheets";

interface FiatAsset {
  balance: number;
  country_code: string;
  fiat_currency_name: string;
  currency_code: string;
}

interface CryptoAsset {
  token_name: string;
  token_symbol: string;
  balance: number;
  token_image: string;
}

interface Props {
  isVisible: boolean;
  onClose: () => void;
  assets: { fiat: FiatAsset[]; crypto: CryptoAsset[] };
  onSelectCurrency: (currency: any) => void;
  snapPoints?: string[];
  selectedCurrency: any;
  title?: string;
  isLoading?: boolean;
}

const AssetsBottomSheet = ({
  isVisible,
  onClose,
  assets,
  onSelectCurrency,
  selectedCurrency,
  snapPoints = ["40%"],
  title = "Select Wallet",
  isLoading = false
}: Props) => {
  const colorScheme = useColorScheme();
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible) {
      sheetRef.current?.expand();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const fiatItems =
    assets?.fiat?.map((item) => ({
      name: item.fiat_currency_name,
      country_code: item.country_code,
      currency_code: item.currency_code,
      balance: item.balance,
      type: "fiat"
    })) || [];

  const cryptoItems =
    assets?.crypto?.map((item) => ({
      name: item.token_name,
      country_code: item.token_symbol,
      image: item.token_image,
      balance: item.balance,
      type: "crypto"
    })) || [];

  const combinedData = [...fiatItems, ...cryptoItems];

  const renderSkeleton = () => (
    <View
      style={{
        height: 40,
        borderRadius: 6,
        backgroundColor: "#e0e0e0"
      }}
    />
  );

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
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.primaryBgDark
              : Colors.light.accentBg
        }}
      >
        <View style={styles.header}>
          <ThemedText style={styles.title}>{title}</ThemedText>
        </View>

        {isLoading ? (
          // show 5 skeleton placeholders
          <View style={{ padding: 16 }}>
            {Array.from({ length: 5 }).map((_, idx) => (
              <View key={idx} style={{ marginBottom: 16 }}>
                {renderSkeleton()}
              </View>
            ))}
          </View>
        ) : (
          <BottomSheetFlatList
            data={combinedData}
            keyExtractor={(item) => `${item.type}-${item.country_code}`}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }: { item: any }) => {
              const isSelected = item.country_code === selectedCurrency.country_code;

              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => {
                    onSelectCurrency(item);
                    sheetRef.current?.close();
                  }}
                >
                  <View style={styles.flagWrapper}>
                    {"image" in item && item.image ? (
                      <Image
                        source={{ uri: `${SERVER_IMAGE_URL}/${item.image}` }}
                        style={styles.flag}
                      />
                    ) : (
                      <CountryFlag
                        isoCode={item.country_code}
                        size={20}
                        style={{ borderRadius: 3 }}
                      />
                    )}
                  </View>

                  <View style={styles.labelWrapper}>
                    <ThemedText style={styles.label}>{item.name}</ThemedText>
                  </View>

                  <View style={styles.amountWrapper}>
                    <ThemedText style={styles.amount}>
                      {"currency_code" in item && item.currency_code
                        ? getSymbolFromCurrency(item.currency_code)
                        : ""}
                      {item.balance.toFixed(2)}
                    </ThemedText>
                    {isSelected && (
                      <FontAwesome
                        name="dot-circle-o"
                        size={15}
                        color="#208BC9"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 12,
    alignItems: "center"
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 16
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.7,
    borderBottomColor: "#000000"
  },
  label: {
    fontSize: 15,
    fontFamily: "Inter-Medium"
  },
  amount: {
    fontSize: 14,
    color: "#9B9B9B",
    fontFamily: "Questrial"
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },
  flagWrapper: {
    padding: 5,
    borderRadius: 50,
    marginRight: 12
  },
  flag: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    borderRadius: 20
  },
  labelWrapper: {
    flex: 1
  }
});

export default AssetsBottomSheet;
