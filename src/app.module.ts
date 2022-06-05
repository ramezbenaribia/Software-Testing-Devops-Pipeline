import { CustomerEntity } from './ecommerce/entity/customer.entity';
import { ProductEntity } from './ecommerce/entity/product.entity';
import { OwnerEntity } from './ecommerce/entity/owner.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EcommerceModule } from './ecommerce/ecommerce.module';

@Module({
  imports: [
    EcommerceModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'ramez.ben.aribia',
      password: 'ramez.ben.aribia',
      database: 'devopsDB',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([OwnerEntity, ProductEntity, CustomerEntity]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
