import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/';
import { CategoryService } from '../service/category.service';

@Controller({
  path: 'category',
  version: '1',
})
export class CategoryController {
  constructor(private service: CategoryService) {}

  @Post()
  create(@Body() createDto: CreateCategoryDto) {
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
