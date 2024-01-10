import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumberString,
  IsArray,
} from 'class-validator';
export interface StaffProjectConfig {
  staffId: string;
  projectId: string;
  // 出勤单价
  attendanceUnitPrice: number;
  // 加班单价
  overtimeUnitPrice: number;
}
export class QueryStaffDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

  @IsNumberString()
  pageNum: number;

  @IsNumberString()
  pageSize: number;
}

export class CreateStaffDto {
  @IsString()
  @MaxLength(32)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly job?: string;

  @IsOptional()
  @IsArray()
  readonly projects?: StaffProjectConfig[];
}

export class UpdateStaffDto {
  @IsString()
  readonly id: string;

  @IsString()
  @MaxLength(32)
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly job?: string;

  @IsOptional()
  @IsArray()
  readonly projects?: StaffProjectConfig[];
}
