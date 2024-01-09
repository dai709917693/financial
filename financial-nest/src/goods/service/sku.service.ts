import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkuDto } from '../dto';
import { StandardProductUnitEntity } from '../entity/standard-product-unit.entity';
import { StockKeepingUnitEntity } from '../entity/stock-keeping-unit.entity';

@Injectable()
export class SkuService {
  constructor(
    @InjectRepository(StockKeepingUnitEntity)
    private skuRepo: Repository<StockKeepingUnitEntity>,

    @InjectRepository(StandardProductUnitEntity)
    private spuRepo: Repository<StandardProductUnitEntity>,
  ) {}

  async create(dto: CreateSkuDto) {
    const spu = await this.spuRepo.findOneBy({ id: dto.spuId });
    const imagesStr = JSON.stringify(dto.images);
    const paramStr = JSON.stringify(dto.param);
    const newData = this.skuRepo.create({
      ...dto,
      price: parseFloat(dto.price),
      images: imagesStr,
      param: paramStr,
    });
    newData.spu = spu;
    return await this.skuRepo.save(newData);
  }
}
