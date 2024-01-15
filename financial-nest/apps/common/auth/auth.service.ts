import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(__dirname, '../user/user.proto'),
    },
  })
  client: ClientGrpc;

  private authService: any;

  onModuleInit() {
    this.authService = this.client.getService<any>('AuthService');
  }

  login(p: any): Observable<string> {
    return this.authService.login(p);
  }

  verify(token: string) {
    return this.authService.verify({
      data: token,
    });
  }

  signup(p: any) {
    return this.authService.signup(p);
  }
}
