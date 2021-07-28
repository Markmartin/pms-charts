export interface CommonResponse {
  code: number;
  msg?: string;
  data: any;
}

export interface FormatResponse {
  status: boolean;
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
  subMap: {
    roleList: Array<Role>;
  };
}

export interface Role {
  roleCode: string;
  roleName: string;
  roleId: string;
  roleUserId: string;
}
