import { CustomerEntity } from './customer.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
} from 'typeorm';

import { OwnerEntity } from './owner.entity';


@Entity('produt')
export class ProductEntity {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false }) name: string;
    @Column({ type: 'text', nullable: true }) description?: string;
    @Column({ type: 'varchar', nullable: false }) product_type?: string;

    @ManyToOne((type) => OwnerEntity, { cascade: true })
    owner?: OwnerEntity;

    @ManyToMany((type) => CustomerEntity, (customer) => customer.bought_products)
    customers?: CustomerEntity[];

}
