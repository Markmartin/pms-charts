export interface CommonResponse {
  code: Number;
  msg?: string;
  data: any;
}

export interface FormatResponse {
  status: Boolean;
  msg: string;
  data?: any;
}

export interface CallbackFunc {
  (data: FormatResponse): void;
}

export interface UserInfoReq {
  userName: string;
  password: string;
}

export interface UserInfo {
  userCode: string;
  token: string;
  userId: string;

  accountNo: string;
  // userId: string;
  // userId: string;
  // userId: string;
  // userId: string;
  // userId: string;
  // userId: string;
}
