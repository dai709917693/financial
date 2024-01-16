import { CreateAppParams, QueryAppParams, App } from '@lib/common/proto';
import { IsOptional, IsString } from 'class-validator';
export class CreateAppDto implements CreateAppParams {
  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly desc: string;
}

export class UpdateAppDto implements App {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly desc: string;
}

export class QueryAppDto implements QueryAppParams {
  @IsString()
  @IsOptional()
  readonly name: string;
}
