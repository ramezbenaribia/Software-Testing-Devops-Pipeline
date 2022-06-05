import { CustomerService } from './customer/customer.service';
import { ProductService } from './product/product.service';
import { CustomerController } from './customer/customer.controller';
import { ProductController } from './product/product.controller';
import { ProductEntity } from './entity/product.entity';
import { CustomerEntity } from './entity/customer.entity';
import { OwnerEntity } from './entity/owner.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersService } from './owner/owners.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, ProductEntity, OwnerEntity])],
  controllers: [ProductController, CustomerController],
  providers: [ProductService, CustomerService, OwnersService],
})
export class EcommerceModule { }
