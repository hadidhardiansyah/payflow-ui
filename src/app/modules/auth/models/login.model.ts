export interface LoginModel {
  companyId: string;
  username: string;
  password: string;
}

export interface LoginResponseModel {
  status: string;
  token: string;
  roles: string[];
}
