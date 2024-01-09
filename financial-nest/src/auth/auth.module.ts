import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { RoleEntity } from './entity/role.entity';
import { RoleController } from './controller/role.controller';
import { RoleService } from './service/role.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  providers: [AuthService, RoleService, LocalStrategy],
  controllers: [AuthController, RoleController],
})
export class AuthModule {}
