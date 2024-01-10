import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateStaffDto,
  QueryStaffDto,
  UpdateStaffDto,
} from '../dto/staff.dto';
import { StaffService } from '../service/staff.service';

@Controller({
  path: 'staff',
  version: '1',
})
export class StaffController {
  constructor(private service: StaffService) {}

  @Post()
  create(@Body() createDto: CreateStaffDto) {
    return this.service.create(createDto);
  }

  @Put()
  update(@Body() createDto: UpdateStaffDto) {
    return this.service.update(createDto);
  }

  @Get()
  findAll(@Query() query: QueryStaffDto) {
    return this.service.findAll(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
