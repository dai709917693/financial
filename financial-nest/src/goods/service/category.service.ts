import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entity/brand.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,

    @InjectRepository(BrandEntity)
    private brandRepo: Repository<BrandEntity>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const brands = dto.brandIds
      ? await this.brandRepo.findBy(dto.brandIds.map((id) => ({ id })))
      : [];
    const newData = this.categoryRepo.create(dto);
    newData.brands = brands;
    return await this.categoryRepo.save(newData);
  }

  findAll() {
    return this.categoryRepo.find();
  }
}
