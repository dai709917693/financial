import {
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  IsNumberString,
} from 'class-validator';

export class QuerySalaryDto {
  @IsString()
  @IsOptional()
  readonly staffId: string;

  @IsString()
  @IsOptional()
  readonly projectId: string;

  @IsString()
  @IsOptional()
  readonly time: string;
}
