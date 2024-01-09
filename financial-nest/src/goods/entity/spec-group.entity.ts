import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SpecParamEntity } from './spec-param.entity';
import { StandardProductUnitEntity } from './standard-product-unit.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class SpecGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @OneToMany(() => SpecParamEntity, (item) => item.id)
  specParams: SpecParamEntity[];

  @OneToMany(() => StandardProductUnitEntity, (item) => item.spg)
  spu: StandardProductUnitEntity[];
}
