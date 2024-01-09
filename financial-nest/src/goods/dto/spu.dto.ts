import { IsString, IsOptional } from 'class-validator';
export class CreateSpuDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly subTitle: string;

  @IsString()
  @IsOptional()
  readonly brandId: string;

  @IsString()
  @IsOptional()
  readonly spgId: string;

  @IsString()
  @IsOptional()
  readonly categoryId: string;
}
