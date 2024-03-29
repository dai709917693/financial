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
import { ProjectService } from '../service/project.service';
import {
  CreateProjectDto,
  QueryAllProjectDto,
  QueryProjectDto,
  UpdateProjectDto,
} from '../dto/project.dto';

@Controller({
  path: 'project',
  version: '1',
})
export class ProjectController {
  constructor(private service: ProjectService) {}

  @Post()
  create(@Body() createDto: CreateProjectDto) {
    return this.service.create(createDto);
  }

  @Put()
  update(@Body() createDto: UpdateProjectDto) {
    return this.service.update(createDto);
  }

  @Get()
  getList(@Query() query: QueryProjectDto) {
    return this.service.getList(query);
  }

  @Get('/all')
  findAll(@Query() query: QueryAllProjectDto) {
    return this.service.findAll(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
