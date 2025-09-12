export interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export interface RegisterData {
  firstname?: string;
  lastname?: string;
  username?: string;
  email: string;
  password: string;
  country_id?: string;
  phone?: string;
  referrer?: string;
}

export interface LoginData {
  email?: string;
  password?: string;
}

export type UserData = {
  token: string;
  user: {
    username: string;
    email: string;
    [key: string]: any;
  };
  country?: any;
  kyc?: any;
  [key: string]: any;
};

export interface AuthResponse {
  code: boolean | number;
  message: string;
  success: string;
  result?: UserData;
}

export interface payload {
  email: string;
  secret?: string;
  otp?: string;
  otp_medium?: string;
}

export interface ChangePwdTypes {
  currentPassword: string;
  newPassword: string;
  otp_medium: string;
  otp?: string;
}

export interface data2FA{
  qrCodeUrl: string;
  secret: string;
}
