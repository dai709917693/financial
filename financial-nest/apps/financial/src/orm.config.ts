import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const ormconfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: 'financial.sqlite',
  autoLoadEntities: true,
  synchronize: true,
};
