import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BrandService } from '../service/brand.service';
import { CreateBrandDto } from '../dto/brand.dto';

@Controller({
  path: 'brand',
  version: '1',
})
export class BrandController {
  constructor(private service: BrandService) {}

  @Post()
  create(@Body() createDto: CreateBrandDto) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.service.findOne(+id);
  //   }

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.service.update(+id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.service.remove(+id);
  //   }
}
