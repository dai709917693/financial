import { IsString, IsBoolean, IsOptional } from 'class-validator';
export class CreateSpecGroupDto {
  @IsString()
  readonly name: string;
}

export class CreateSpecParamDto {
  @IsString()
  readonly name: string;

  @IsBoolean()
  @IsOptional()
  readonly numeric?: boolean;

  @IsString()
  readonly unit: string;

  @IsString()
  readonly segments: string;

  @IsString()
  readonly spgId: string;
}
