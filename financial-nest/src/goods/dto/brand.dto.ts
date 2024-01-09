import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateBrandDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly image: string;

  @IsString()
  @MaxLength(1)
  readonly letter: string;

  @IsArray()
  @IsOptional()
  readonly categoryIds?: string[];
}
