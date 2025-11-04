export interface Country {
  id: number;
  country_name: string;
  country_code: string;
  country_dial_code: string;
}

export interface GenericResponse<T> {
  error: number;
  code: number;
  message: string;
  success: boolean;
  result: any[];
}

export interface Banks {
  name: string;
  code: string;
}

export interface BanksRes {
  error: number;             
  message: string;
  success: boolean;
  result: any[];
}

export type RateConversionRequest = {
  base_currency: string;
  target_currency: string;
  amount: number;
  transaction_type: string;
  direction?: string;
};

export type Rates = {
  base_currency: string;
  converted_amount: string;
  converted_fee: string;
  target_currency: string;
  total_converted: string;
  transaction_type?: string;
  warning?: string;
};

export type RatesRes<T> = {
  success: boolean;
  code: number;
  message: string;
  result: T;
};