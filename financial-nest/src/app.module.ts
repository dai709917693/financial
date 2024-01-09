import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from './orm.config';
import { GoodsModule } from './goods/goods.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { JwtAuthGuard } from './common/guard/jwt.guard';
import { JwtStrategy } from './auth/jwt.strategy';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { PoliciesGuard } from './common/guard/auth.guard';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    GoodsModule,
    CaslModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
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
    JwtStrategy,
  ],
})
export class AppModule {}
