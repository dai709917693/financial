import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from './category.entity';
import { StandardProductUnitEntity } from './standard-product-unit.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class BrandEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  image: string;

  @Column()
  letter: string;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @ManyToMany(() => CategoryEntity, (cate) => cate.brands)
  @JoinTable()
  categories: CategoryEntity[];

  @OneToMany(() => StandardProductUnitEntity, (item) => item.brand)
  spu: StandardProductUnitEntity[];
}
