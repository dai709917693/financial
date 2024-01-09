import { IsString, IsOptional, IsArray } from 'class-validator';
export class CreateCategoryDto {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly parentId: string;

  @IsArray()
  @IsOptional()
  readonly brandIds?: string[];
}
