import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectService } from '../service/project.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';

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
