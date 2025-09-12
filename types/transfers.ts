export type SendScreenProps = {
  onBack: () => void;
  selectedCountry?: string;
};

export interface ResolveTag {
  vpay_tag: string;
}

export interface ResolveRes {
  error: number;
  message: string;
  success: boolean;
  result: ResolveTag[];
}

export interface LookUpData {
  account_number: string;
  bank_code: string;
}

export interface LookUpResponse {
  error: number;
  message: string;
  success: boolean;
  result: LookUpData[];
}