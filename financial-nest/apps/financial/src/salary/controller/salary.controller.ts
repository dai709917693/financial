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

import { QuerySalaryDto } from '../dto/salary.dto';
import { SalaryService } from '../service/salary.service';

@Controller({
  path: 'salary',
  version: '1',
})
export class SalaryController {
  constructor(private service: SalaryService) {}

  @Get()
  findOne(@Query() query: QuerySalaryDto) {
    return this.service.getData(query);
  }
}
