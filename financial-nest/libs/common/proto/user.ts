/* eslint-disable */

export const protobufPackage = "user";

export interface SignupParams {
  username: string;
  password: string;
}

export interface LoginParams {
  username: string;
  password: string;
  roleName: string;
}

export interface UserRes {
  username: string;
  id: string;
  roleName: string;
}

export interface TokenRes {
  data: string;
}

export interface AuthService {
  Login(request: LoginParams): Promise<TokenRes>;
  Verify(request: TokenRes): Promise<UserRes>;
  Signup(request: SignupParams): Promise<UserRes>;
}
