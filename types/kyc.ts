import { MaterialIcons } from "@expo/vector-icons";

export type AddressProps = {
  onBack: () => void;
  onComplete?: (data: CompleteAddressData) => void;
};

export interface AddressFormData {
  country: string;
  state: string;
  city: string;
  postal_code: string;
  street_address_one: string;
  document?: string;
  document_type?: string;
}

export interface DocumentData {
  documentType: string;
  document: string;
}

export interface CompleteAddressData {
  addressInfo: AddressFormData;
  documentInfo: DocumentData;
}

export interface DocumentType {
  id: string;
  label: string;
  description: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  examples: string[];
}

export interface DocumentData {
  documentType: string;
  document: string;
}

export interface DocumentUploadProps {
  onBack: () => void;
  onSubmit: (documentData: DocumentData) => void;
  loading?: boolean;
  addressData?: AddressFormData;
}
