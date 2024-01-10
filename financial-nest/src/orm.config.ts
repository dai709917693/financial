import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'financial.sqlite',
  entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
  synchronize: true,
};
