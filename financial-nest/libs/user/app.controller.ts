import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { USER_APP_SERVICE_NAME, UserAppServiceClient } from '../common/proto';
import { CreateAppDto, QueryAppDto, UpdateAppDto } from './dto';

@Controller('app')
export class AppController {
  constructor(
    @Inject(USER_APP_SERVICE_NAME)
    private readonly service: UserAppServiceClient,
  ) {}

  @Post()
  create(@Body() req: CreateAppDto) {
    return this.service.create(req);
  }

  @Put()
  update(@Body() req: UpdateAppDto) {
    return this.service.update(req);
  }

  @Get()
  async list(@Query() req: QueryAppDto) {
    return this.service.list(req);
  }
}
