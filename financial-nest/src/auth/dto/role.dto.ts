import { IsOptional, IsString } from 'class-validator';
export class CreateRoleDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly parentId: string;

  @IsString()
  @IsOptional()
  readonly desc: string;
}
