import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'virtual.sqlite',
  entities: [__dirname + '/**/entity/*.entity{.ts,.js}'],
  synchronize: true,
};
