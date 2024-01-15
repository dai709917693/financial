import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const ormconfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'user.sqlite',
  autoLoadEntities: true,
  synchronize: true,
};
