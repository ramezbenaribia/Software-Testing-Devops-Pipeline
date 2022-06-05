import { products } from './ecommerce/mock/products.mock';
import { CustomerEntity } from './ecommerce/entity/customer.entity';
import { ProductEntity } from './ecommerce/entity/product.entity';
import { OwnerEntity } from './ecommerce/entity/owner.entity';
import { Injectable, Logger } from '@nestjs/common';
import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class DatabaseInitService {
  private logger: Logger;
  private ownerEntity: OwnerEntity;

  constructor(
    @InjectRepository(OwnerEntity) ownerRepository: Repository<OwnerEntity>,
    @InjectRepository(ProductEntity) productRepository: Repository<ProductEntity>,
    @InjectRepository(CustomerEntity) customerRepository: Repository<CustomerEntity>,
  ) {
    this.logger = new Logger('DatabaseInitService');
    ownerRepository
      .findOne({ where: { username: 'ramez.ben.aribia' } })
      .then(async (user) => {
        if (!user) {
          this.ownerEntity = ownerRepository.create({
            username: 'ramez.ben.aribia',
            password: 'ramez.ben.aribia',
            email: 'ramez.ben.aribia@gmail.com',
          });
          await ownerRepository.save(this.ownerEntity);
        }
        productRepository.find().then((queriedProducts) => {
          if (queriedProducts.length === 0) {
            this.logger.log('No products found in db. Creating mock data...');
            products.forEach(async (product) => {
              const dbProducts = productRepository.create({
                ...product,
                owner: this.ownerEntity,
              });
              await productRepository.save(dbProducts);

              this.logger.log(`Created product: ${dbProducts.name}`);
            });
          } else {
            this.logger.log('Products already exist in db');
          }
        });
      });
  }
}
