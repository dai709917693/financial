import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './orm.config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { PoliciesGuard } from './common/guard/auth.guard';
import { CaslModule } from './casl/casl.module';
import { ProjectModule } from './project/project.module';
import { StaffModule } from './staff/staff.module';
import { CheckModule } from './check/check.module';
import { SalaryModule } from './salary/salary.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { TokenGuard } from './common/guard/token.guard';
import { AllGlobalExceptionsFilter } from './common/filter/globalException';
import { AuthModule } from '@common/auth/auth.module';
import { AuthService } from '@common/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    CaslModule,
    ProjectModule,
    StaffModule,
    CheckModule,
    SalaryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllGlobalExceptionsFilter,
    },
  ],
})
export class AppModule {}
