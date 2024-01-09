import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSkuDto } from '../dto/';
import { SkuService } from '../service/sku.service';

@Controller({
  path: 'sku',
  version: '1',
})
export class SkuController {
  constructor(private service: SkuService) {}

  @Post()
  create(@Body() createDto: CreateSkuDto) {
    return this.service.create(createDto);
  }

  //   @Get()
  //   findAll() {
  //     return this.service.findAll();
  //   }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.service.findOne(+id);
  //   }a

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.service.update(+id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.service.remove(+id);
  //   }
}
