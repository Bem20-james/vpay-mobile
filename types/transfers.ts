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

export interface LookUpDataRes {
  name: string;
}

export interface LookUpParams {
  account_number: string;
  bank_code: string;
}

export interface LookUpResponse {
  error: number;
  message: string;
  success: boolean;
  result: LookUpDataRes[];
}
