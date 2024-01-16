import { Module } from '@nestjs/common';
import { BffController } from './bff.controller';
import { BffService } from './bff.service';
import { UserModule } from '@lib/user/user.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllGlobalExceptionsFilter } from './common/filter/globalException.filter';
import { PoliciesGuard } from '@lib/common/guard/auth.guard';
import { CaslModule } from '@lib/common/casl/casl.module';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { TokenGuard } from '@lib/common/guard/token.guard';
import { ValidationPipe } from '@lib/common/pipe/validate.pipe';

@Module({
  imports: [UserModule, CaslModule],
  controllers: [BffController],
  providers: [
    BffService,
    {
      provide: APP_FILTER,
      useClass: AllGlobalExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class BffModule {}
