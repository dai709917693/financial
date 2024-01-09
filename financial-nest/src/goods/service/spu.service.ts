import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpuDto } from '../dto';
import { StandardProductUnitEntity } from '../entity/standard-product-unit.entity';
import { BrandEntity } from '../entity/brand.entity';
import { CategoryEntity } from '../entity/category.entity';
import { SpecGroupEntity } from '../entity/spec-group.entity';

@Injectable()
export class SpuService {
  constructor(
    @InjectRepository(StandardProductUnitEntity)
    private spuRepo: Repository<StandardProductUnitEntity>,

    @InjectRepository(BrandEntity)
    private brandRepo: Repository<BrandEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,

    @InjectRepository(SpecGroupEntity)
    private spgRepo: Repository<SpecGroupEntity>,
  ) {}

  async create(dto: CreateSpuDto) {
    const [brand, category, spg] = await Promise.all([
      this.brandRepo.findOneBy({ id: dto.brandId }),
      this.categoryRepo.findOneBy({ id: dto.categoryId }),
      this.spgRepo.findOneBy({ id: dto.spgId }),
    ]);
    const newData = this.spuRepo.create(dto);
    newData.brand = brand;
    newData.category = category;
    newData.spg = spg;
    return await this.spuRepo.save(newData);
  }
}
