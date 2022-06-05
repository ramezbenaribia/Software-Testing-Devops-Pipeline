import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('customer')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) customer_name: string;
  @Column({ type: 'varchar', nullable: false }) customer_field: string;
}
