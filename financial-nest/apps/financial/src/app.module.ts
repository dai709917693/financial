import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './orm.config';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ProjectModule } from './project/project.module';
import { StaffModule } from './staff/staff.module';
import { CheckModule } from './check/check.module';
import { SalaryModule } from './salary/salary.module';
import { AuthService } from '@lib/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    ProjectModule,
    StaffModule,
    CheckModule,
    SalaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
