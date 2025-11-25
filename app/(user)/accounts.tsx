import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import { PaymentOption } from "@/components/PaymentOption";
import { useFetchUserAssets } from "@/hooks/useUser";
import AccountBottomSheet from "@/components/BottomSheets/Accounts";
import { Colors } from "@/constants/Colors";
import { SERVER_IMAGE_URL } from "@/constants/Paths";
import { useTheme } from "@/contexts/ThemeContexts";
import { TransactionSkeleton } from "@/components/SkeletonLoader";

interface FiatAccount {
  fiat_currency_name: string;
  balance: string;
  name: string;
  account_balance: string;
  account_name: string;
  bank: string;
  account_number: string;
  currency_code: string;
  country_code: string;
}

interface CryptoAccount {
  token_name: string;
  token_symbol: string;
  balance: string;
  wallet_address: string;
  price?: string;
  token_image: string;
}

const Accounts: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const boxBg = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const { assets, loading } = useFetchUserAssets();
  console.log("User Assets:", assets);

  const [isSheetVisible, setIsSheetVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<"fiat" | "crypto">("fiat");
  const [selectedItem, setSelectedItem] = useState<
    FiatAccount | CryptoAccount | null
  >(null);

  const openSheet = (
    type: "fiat" | "crypto",
    item: FiatAccount | CryptoAccount
  ) => {
    setSelectedType(type);
    setSelectedItem(item);
    setIsSheetVisible(true);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <Navigator title="Accounts" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <ThemedText style={styles.sectionHeader}>
            FIAT CURRENCY
          </ThemedText>
          {loading ? (
            <TransactionSkeleton />
          ) : (
            assets?.fiat?.map((item: FiatAccount, index: number) => (
              <PaymentOption
                bgColor={boxBg}
                key={`fiat-${index}`}
                name={item.fiat_currency_name}
                label={item.currency_code}
                country_code={item.country_code}
                balance={item.balance}
                type="fiat"
                account_balance={item.account_balance}
                account_name={item.account_name}
                bank_name={item.bank}
                account_number={item.account_number}
                handlePress={() => openSheet("fiat", item)}
              />
            ))
          )}

          <ThemedText style={styles.sectionHeader}>CRYPTOCURRENCY</ThemedText>
          {loading ? (
            <TransactionSkeleton />
          ) : (
            assets?.crypto?.map((item: CryptoAccount, index: number) => (
              <PaymentOption
                bgColor={boxBg}
                key={`crypto-${index}`}
                name={item.token_symbol}
                label={item.token_name}
                image={{ uri: `${SERVER_IMAGE_URL}/${item?.token_image}` }}
                balance={item.balance}
                price={item.price}
                type="crypto"
                address={item.wallet_address}
                handlePress={() => openSheet("crypto", item)}
              />
            ))
          )}
        </View>

        <AccountBottomSheet
          isVisible={isSheetVisible}
          onClose={() => setIsSheetVisible(false)}
          selectedType={selectedType}
          selectedItem={selectedItem}
          title={selectedType === "fiat" ? "Bank Transfer" : "Fund with Crypto"}
          label={
            selectedType === "fiat" ? (
              <>
                Add cash to your{" "}
                <ThemedText style={styles.selectedText}>
                  {selectedType === "fiat" &&
                  selectedItem &&
                  "currency_code" in selectedItem
                    ? selectedItem.currency_code
                    : ""}
                </ThemedText>{" "}
                wallet using the account details below
              </>
            ) : (
              <>
                Fund your{" "}
                <ThemedText style={styles.selectedText}>
                  {selectedItem && "token_name" in selectedItem
                    ? selectedItem.token_name
                    : ""}
                </ThemedText>{" "}
                wallet with the address below
              </>
            )
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  scrollContent: {
    flexGrow: 1
  },
  content: {
    marginHorizontal: 10
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    fontSize: 12,
    fontFamily: "Quetrials",
    fontWeight: "700"
  },
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10
  },
  skeletonCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.primaryBgDark,
    marginRight: 10
  },
  skeletonLines: {
    flex: 1
  },
  skeletonLineShort: {
    width: "40%",
    height: 10,
    backgroundColor: Colors.dark.primaryBgDark,
    marginBottom: 5
  },
  skeletonLineLong: {
    width: "80%",
    height: 10,
    backgroundColor: Colors.dark.primaryBgDark
  },
  selectedText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 12,
    color: "#208BC9"
  }
});
