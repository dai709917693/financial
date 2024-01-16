import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import {
  ClientGrpc,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import {
  USER_APP_SERVICE_NAME,
  USER_AUTH_SERVICE_NAME,
  USER_PACKAGE_NAME,
} from '@lib/common/proto';

@Module({
  imports: [],
  providers: [
    {
      provide: 'RPC_CLIENT',
      useFactory: () => {
        const res = ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: USER_PACKAGE_NAME,
            protoPath: 'libs/common/proto/user.proto',
          },
        });
        return res;
      },
    },
    {
      provide: USER_AUTH_SERVICE_NAME,
      useFactory: (client: ClientGrpc) => {
        return client.getService(USER_AUTH_SERVICE_NAME);
      },
      inject: ['RPC_CLIENT'],
    },
    {
      provide: USER_APP_SERVICE_NAME,
      useFactory: (client: ClientGrpc) => {
        return client.getService(USER_APP_SERVICE_NAME);
      },
      inject: ['RPC_CLIENT'],
    },
  ],
  exports: [USER_AUTH_SERVICE_NAME],
  controllers: [AuthController, AppController],
})
export class UserModule {}
