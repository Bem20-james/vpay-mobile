import { useSendLocal, useSendCrypto } from "@/hooks/useTransfers";
import { usePurchaseAirtime } from "./useAirtimePurchase";
import { usePayCableTv, usePayElectricity } from "./useBillPayments";
import { usePurchaseData } from "./useDataPurchase";
import { useFundBetWallet } from "./useBetting";

export const useTransactionDispatcher = () => {
  const { sendFunds: sendLocal } = useSendLocal();
  const { purchaseAirtime: sendAirtime } = usePurchaseAirtime();
  const { purchaseData: sendMobileData } = usePurchaseData();
  const { payCableTv: rechargeTV } = usePayCableTv();
  const { fundBetWallet: fundWallet } = useFundBetWallet();
  const { payElectricity: rechargePower } = usePayElectricity();
  const { sendCrypto: transferCrypto } = useSendCrypto();

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
        const mobileDataRes = sendMobileData({
          ...payload,
          activity_pin: authorization_pin
        });
        return mobileDataRes;
      case "cable":
        const subcribeTvRes = rechargeTV({
          ...payload,
          activity_pin: authorization_pin
        });
        return subcribeTvRes;
      case "betting":
        const bettingRes = fundWallet({
          ...payload,
          activity_pin: authorization_pin
        });
        return bettingRes;
      case "electricity":
        const rechargePowerRes = rechargePower({
          ...payload,
          activity_pin: authorization_pin
        });
        return rechargePowerRes;
      case "crypto":
        const sendCryptoRes = transferCrypto({
          ...payload,
          activity_pin: authorization_pin
        });
        return sendCryptoRes;
      default:
        throw new Error("Invalid transaction type");
    }
  };

  return { executeTransaction };
};
