import {
  IsOptional,
  IsString,
  MaxLength,
  IsArray,
  IsNumberString,
} from 'class-validator';

interface CheckData {
  time: string;
  data: Record<
    string,
    { attendance?: number | string; overtime?: number | string }
  >;
}

export class UpdateCheckDto {
  @IsString()
  readonly projectId: string;

  @IsArray()
  readonly checkData: CheckData[];
}
