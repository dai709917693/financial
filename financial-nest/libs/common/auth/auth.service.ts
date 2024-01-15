import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { LoginParams } from '../proto';
import { AuthService as RPCAuthService } from '../proto';

@Injectable()
export class AuthService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: 'libs/common/proto/user.proto',
    },
  })
  client: ClientGrpc;

  private authService: RPCAuthService;

  onModuleInit() {
    this.authService = this.client.getService<any>('AuthService');
  }

  login(p: LoginParams) {
    return this.authService.Login(p);
  }

  verify(token: string) {
    return this.authService.Verify({
      data: token,
    });
  }

  signup(p: any) {
    return this.authService.Signup(p);
  }
}
