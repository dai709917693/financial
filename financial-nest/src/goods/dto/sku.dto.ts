import {
  IsString,
  IsOptional,
  IsArray,
  IsDecimal,
  IsObject,
} from 'class-validator';
export class CreateSkuDto {
  @IsString()
  readonly title: string;

  @IsArray()
  readonly images: any[];

  @IsDecimal({
    decimal_digits: '2',
  })
  readonly price: string;

  @IsObject()
  readonly param: object;

  @IsString()
  @IsOptional()
  readonly spuId: string;
}
