export type SendScreenProps = {
  onBack: () => void;
  selectedCountry?: string;
};

export interface ResolveTag {
  username: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  phone: string | number;
  number: string | number;
  country_code: string;
  bank: string;
}

export interface ResolveRes {
  code: number;
  message: string;
  success: boolean;
  result: ResolveTag;
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
