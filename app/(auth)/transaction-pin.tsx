import { View } from "react-native";
import React from "react";
import TransactionPinScreen from "@/components/TransactionPin";

const TransactionPin = () => {
  return (
    <View>
      <TransactionPinScreen showBack={false} />
    </View>
  );
};

export default TransactionPin;
