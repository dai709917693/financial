import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSpuDto } from '../dto/';
import { SpuService } from '../service/spu.service';

@Controller({
  path: 'spu',
  version: '1',
})
export class SpuController {
  constructor(private service: SpuService) {}

  @Post()
  create(@Body() createDto: CreateSpuDto) {
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
