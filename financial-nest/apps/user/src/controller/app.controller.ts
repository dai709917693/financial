import { Controller } from '@nestjs/common';
import { AppService } from '@user/service/app.service';
import { UserAppServiceControllerMethods } from '@lib/common/proto';

@Controller()
@UserAppServiceControllerMethods()
export class AppController {
  constructor(private service: AppService) {}

  create(createDto) {
    return this.service.create(createDto);
  }

  update(dto) {
    return this.service.update(dto);
  }

  async list(dto) {
    const data = await this.service.findAll(dto);
    return {
      data,
    };
  }
}
