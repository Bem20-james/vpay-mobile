import React, { forwardRef } from "react";
import { View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ThemedText } from "../ThemedText";

interface Props {
  selectedItem: any;
  selectedType: "fiat" | "crypto" | null;
}

const AccountBottomSheet = forwardRef<BottomSheetModal, Props>(
  ({ selectedItem, selectedType }, ref) => {
    const snapPoints = ["50%"];

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
        <View style={{ padding: 20 }}>
          {selectedItem && selectedType === "fiat" && (
            <>
              <ThemedText>Bank: {selectedItem.bank_name}</ThemedText>
              <ThemedText>Account: {selectedItem.account_name}</ThemedText>
              <ThemedText>Number: {selectedItem.account_number}</ThemedText>
              <ThemedText>Balance: {selectedItem.balance}</ThemedText>
            </>
          )}
          {selectedItem && selectedType === "crypto" && (
            <>
              <ThemedText>Token: {selectedItem.token_name}</ThemedText>
              <ThemedText>Symbol: {selectedItem.token_symbol}</ThemedText>
              <ThemedText>Address: {selectedItem.address}</ThemedText>
              <ThemedText>Balance: {selectedItem.balance}</ThemedText>
            </>
          )}
        </View>
      </BottomSheetModal>
    );
  }
);

export default AccountBottomSheet;
