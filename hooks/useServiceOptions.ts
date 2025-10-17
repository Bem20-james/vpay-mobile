import { useFetchDataOptions } from "@/hooks/useDataPurchase";
import {
  useFetchCableTvOptions,
  useFetchElectricityOptions
} from "./useBillPayments";

type ServiceType = "data" | "electricity" | "cable";

export const useServiceOptions = (type: ServiceType, provider: string) => {
  switch (type) {
    case "electricity":
      return useFetchElectricityOptions(provider);
    case "cable":
        console.log("provider in hook:", provider)
      return useFetchCableTvOptions(provider);
    default:
      return useFetchDataOptions(provider);
  }
};
