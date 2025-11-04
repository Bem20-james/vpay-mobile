export type SendScreenProps = {
  onBack: () => void;
  selectedCountry?: string;
};

export interface ResolveTag {
  username: string;
  accountname: string;
  accountnumber: string;
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

export interface SendFiatData {
  account_number: string;
  currency: string;
  amount: string;
  description?: string;
  activity_pin: string;
}

export interface CryptoData {
  reciever: string;
  amount: string;
  token: string;
  network?: string;
  activity_pin: string;
}

export interface FiatResponse {
  success: boolean;
  message?: string;
  code?: number;
}

export interface LookUpResult {
  account_name: string;
  account_number: string;
  bank_id: number;
}

export interface LookUpResponse {
  success: boolean;
  code: number;
  message?: string;
  result: LookUpResult;
}

export type TransactionResponse = {
  success: boolean;
  data?: any;
  message?: string;
};

