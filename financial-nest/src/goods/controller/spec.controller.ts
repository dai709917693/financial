import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateSpecGroupDto, CreateSpecParamDto } from '../dto/';
import { SpecService } from '../service/spec.service';

@Controller({
  path: 'spec/',
  version: '1',
})
export class SpecController {
  constructor(private service: SpecService) {}

  @Post('group')
  createSpg(@Body() createDto: CreateSpecGroupDto) {
    return this.service.createSpg(createDto);
  }

  @Post('param')
  createSpp(@Body() createDto: CreateSpecParamDto) {
    return this.service.createSpp(createDto);
  }

  // @Get()
  // findAll() {
  //   return this.service.findAll();
  // }

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
