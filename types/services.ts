export interface CableTvData {
  base_asset: string;
  target_asset: string;
  provider: string;
  number: string;
  type: string;
  amount: string;
  activity_pin: string;
}

export interface ElectricityBillData {
  base_asset: string;
  target_asset: string;
  provider: string;
  number: string;
  code: string;
  amount: string;
  activity_pin: string;
}

export interface Response {
  success: boolean;
  message?: string;
}

export interface CableTvProvider {
  id: number;
  country_name: string;
  country_code: string;
  country_dial_code: string;
}

export interface ProviderRes<T> {
  error: number;
  code: number;
  message: string;
  success: boolean;
  result: any[];
}

export interface LookUpResult {
  provider: string;
  customerName: string;
  smartNumber: string;
  status: string | boolean;
}

export interface LookUpResponse {
  success: boolean;
  code: number;
  message?: string;
  result: LookUpResult;
}

export interface BettingResult {
  provider: string;
  account_name: string;
  account: string;
}

export interface BettingLookUpRes {
  success: boolean;
  code: number;
  message?: string;
  result: BettingResult;
}

export interface BettingProvider {
  id: string;
  provider_name: string;
  image: string;
}
