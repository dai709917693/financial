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

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  roleName?: string;
}
