import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entity/brand.entity';
import { CategoryEntity } from './entity/category.entity';
import { SpecGroupEntity } from './entity/spec-group.entity';
import { SpecParamEntity } from './entity/spec-param.entity';
import { StandardProductUnitEntity } from './entity/standard-product-unit.entity';
import { StockKeepingUnitEntity } from './entity/stock-keeping-unit.entity';
import { BrandService } from './service/brand.service';
import { BrandController } from './controller/brand.controller';
import { CategoryService } from './service/category.service';
import { CategoryController } from './controller/category.controller';
import { SpecController } from './controller/spec.controller';
import { SpecService } from './service/spec.service';
import { SpuController } from './controller/spu.controller';
import { SpuService } from './service/spu.service';
import { SkuService } from './service/sku.service';
import { SkuController } from './controller/sku.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BrandEntity,
      CategoryEntity,
      SpecGroupEntity,
      SpecParamEntity,
      StandardProductUnitEntity,
      StockKeepingUnitEntity,
    ]),
  ],
  providers: [
    BrandService,
    CategoryService,
    SpecService,
    SpuService,
    SkuService,
  ],
  controllers: [
    BrandController,
    CategoryController,
    SpecController,
    SpuController,
    SkuController,
  ],
})
export class GoodsModule {}
