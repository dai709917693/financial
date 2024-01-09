import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from '../entity/brand.entity';
import { Repository } from 'typeorm';
import { CreateBrandDto } from '../dto/brand.dto';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(BrandEntity)
    private repo: Repository<BrandEntity>,

    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateBrandDto) {
    const { name } = dto;
    const existUser = await this.repo.findOne({
      where: { name },
    });
    if (existUser) {
      throw new HttpException('商标已存在', HttpStatus.BAD_REQUEST);
    }

    const categories = dto.categoryIds
      ? await this.categoryRepo.findBy(dto.categoryIds?.map((id) => ({ id })))
      : [];

    const newData = this.repo.create(dto);
    newData.categories = categories;
    return await this.repo.save(newData);
  }

  findAll() {
    return this.repo.find();
  }
}
