import { useSendLocal } from "@/hooks/useTransfers";
import { usePurchaseAirtime } from "./useAirtimePurchase";
import { usePayCableTv } from "./useBillPayments";
import { usePurchaseData } from "./useDataPurchase";

export const useTransactionDispatcher = () => {
  const { sendFunds: sendLocal } = useSendLocal();
  const { purchaseAirtime: sendAirtime } = usePurchaseAirtime();
  const { purchaseData: sendMobileData } = usePurchaseData();
  const { payCableTv: rechargeTV } = usePayCableTv();

  const executeTransaction = async (
    type: string,
    payload: any,
    authorization_pin: string
  ) => {
    switch (type) {
      case "transfer":
        const response = await sendLocal({
          ...payload,
          activity_pin: authorization_pin
        });
        return response;
      case "airtime":
        const airtimeRes = sendAirtime({
          ...payload,
          activity_pin: authorization_pin
        });
        return airtimeRes;
      case "data":
        return sendMobileData({ ...payload, activity_pin: authorization_pin });
      case "cableTV":
        return rechargeTV({ ...payload, activity_pin: authorization_pin });
      default:
        throw new Error("Invalid transaction type");
    }
  };

  return { executeTransaction };
};
