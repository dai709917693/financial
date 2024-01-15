import { LoginParams } from '@lib/common/proto';
import { IsArray, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}

export class InviteAdminDto {
  @IsString()
  readonly username: string;
}

export class LoginDto implements LoginParams {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly roleName: string;
}
