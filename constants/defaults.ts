export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const SUPPORTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
export const SUPPORTED_DOC_TYPES = ["application/pdf"];
export const ALL_SUPPORTED_TYPES = [...SUPPORTED_IMAGE_TYPES, ...SUPPORTED_DOC_TYPES];
import { DocumentType } from "@/types/kyc";

export const DOCUMENT_TYPES: DocumentType[] = [
  {
    id: "UB",
    label: "Utility Bill",
    description:
      "Recent electricity, water, gas, or internet bill (not older than 3 months)",
    icon: "receipt",
    examples: ["Electricity bill", "Water bill", "Gas bill", "Internet bill"]
  },
  {
    id: "BS",
    label: "Bank Statement",
    description:
      "Official bank statement showing your address (not older than 3 months)",
    icon: "account-balance",
    examples: ["Monthly statement", "Account summary", "Transaction history"]
  },
  {
    id: "RP",
    label: "Residential Permit",
    description: "Lease or rental contract for your current address",
    icon: "home",
    examples: ["Lease agreement", "Rental contract", "Housing agreement"]
  },
];