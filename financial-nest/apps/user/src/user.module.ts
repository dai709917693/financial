import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { RoleController } from './controller/role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './orm.config';
import { UserEntity } from './entity/user.entity';
import { RoleEntity } from './entity/role.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { RoleService } from './service/role.service';
import { LocalStrategy } from './strategy/local.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppEntity } from './entity/app.entity';
import { jwtConstants } from '@lib/common/constants';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([UserEntity, RoleEntity, AppEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [
    AuthService,
    RoleService,
    AppService,
    LocalStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [AuthController, RoleController, AppController],
})
export class UserModule {}
