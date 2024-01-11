import {
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  IsNumberString,
} from 'class-validator';

interface CheckData {
  time: string;
  data: Record<string, { attendance?: number; overtime?: number }>;
}

export class UpdateCheckDto {
  @IsString()
  readonly projectId: string;

  @IsArray()
  readonly data: CheckData[];
}
