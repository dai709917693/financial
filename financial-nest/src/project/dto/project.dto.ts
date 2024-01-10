import {
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  IsNumberString,
} from 'class-validator';
import { StaffProjectConfig } from 'src/staff/dto/staff.dto';

export class QueryProjectDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsNumberString()
  pageNum: number;

  @IsNumberString()
  pageSize: number;
}

export class CreateProjectDto {
  @IsString()
  @MaxLength(32)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly notes: string;

  @IsArray()
  @IsOptional()
  staffs?: StaffProjectConfig[];
}

export class UpdateProjectDto {
  @IsString()
  readonly id: string;

  @IsString()
  @MaxLength(32)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly notes: string;

  @IsArray()
  @IsOptional()
  staffs?: StaffProjectConfig[];
}
