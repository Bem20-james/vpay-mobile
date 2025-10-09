import { useSendLocal } from "@/hooks/useTransfers";
import { usePurchaseAirtime } from "./useAirtimePurchase";

export const useTransactionDispatcher = () => {
  const { sendFunds: sendLocal } = useSendLocal();
  const { purchaseAirtime: sendAirtime } = usePurchaseAirtime();

  const executeTransaction = async (
    type: string,
    payload: any,
    authorization_pin: string
  ) => {
    switch (type) {
      case "sendLocal":
        return sendLocal({ ...payload, activity_pin: authorization_pin });
      case "airtime":
        return sendAirtime({ ...payload, activity_pin: authorization_pin });
      case "data":
        return sendAirtime({ ...payload, activity_pin: authorization_pin });
      default:
        throw new Error("Invalid transaction type");
    }
  };

  return { executeTransaction };
};
