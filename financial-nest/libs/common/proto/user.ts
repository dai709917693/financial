/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

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

export interface CreateAppParams {
  name: string;
  desc: string;
}

export interface App {
  id: string;
  name: string;
  desc: string;
}

export interface QueryAppParams {
  name: string;
}

export interface QueryAppRes {
  data: App[];
}

export interface Empty {
}

export const USER_PACKAGE_NAME = "user";

export interface UserAuthServiceClient {
  login(request: LoginParams): Observable<TokenRes>;

  verify(request: TokenRes): Observable<UserRes>;

  signup(request: SignupParams): Observable<Empty>;
}

export interface UserAuthServiceController {
  login(request: LoginParams): Observable<TokenRes>;

  verify(request: TokenRes): Observable<UserRes>;

  signup(request: SignupParams): Observable<Empty>;
}

export function UserAuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["login", "verify", "signup"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserAuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserAuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_AUTH_SERVICE_NAME = "UserAuthService";

export interface UserAppServiceClient {
  create(request: CreateAppParams): Observable<Empty>;

  update(request: App): Observable<Empty>;

  list(request: QueryAppParams): Observable<QueryAppRes>;
}

export interface UserAppServiceController {
  create(request: CreateAppParams): Observable<Empty>;

  update(request: App): Observable<Empty>;

  list(request: QueryAppParams): Observable<QueryAppRes>;
}

export function UserAppServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "update", "list"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserAppService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserAppService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_APP_SERVICE_NAME = "UserAppService";
