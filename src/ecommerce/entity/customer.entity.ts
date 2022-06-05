import { ProductEntity } from './product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany
} from 'typeorm';
import * as bcrypt from 'bcrypt';


@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) customer_name: string;
  @Column({ type: 'varchar', nullable: false }) password: string;
  @Column({ type: 'varchar', nullable: false }) email: string;

  @ManyToMany((type) => ProductEntity, (product) => product.customers, { cascade: true })
  bought_products?: ProductEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
