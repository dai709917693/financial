import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Put,
} from '@nestjs/common';

import { CheckService } from '../service/check.service';
import { UpdateCheckDto } from '../dto/check.dto';

@Controller({
  path: 'check',
  version: '1',
})
export class CheckController {
  constructor(private service: CheckService) {}

  // @Post()
  // create(@Body() createDto: CreateCheckDto) {
  //   return this.service.create(createDto);
  // }

  @Put()
  update(@Body() createDto: UpdateCheckDto) {
    return this.service.update(createDto);
  }

  @Get(':id')
  findOne(@Param('id') projectId: string) {
    return this.service.getData(projectId);
  }

  // @Get('')
  // getData(@Query() query: QueryCheckDto) {
  //   return this.service.getData(query);
  // }

  // @Get('/all')
  // findAll() {
  //   return this.service.findAll();
  // }

  //   @Put(':id')
  //   update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.service.update(+id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.service.remove(+id);
  //   }
}
