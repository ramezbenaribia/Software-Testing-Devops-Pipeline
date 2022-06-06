import { CustomerService } from './../src/ecommerce/customer/customer.service';
import { OwnersService } from './../src/ecommerce/owner/owners.service';
import { ProductService } from './../src/ecommerce/product/product.service';
import { OwnerDto } from './../src/ecommerce/dto/owner.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/api/products (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/products')
      .expect(200)
      .expect({ products: await app.get(ProductService).getAllProducts() });
  });
  it('/api/customers (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/customers')
      .expect(200)
      .expect({ customers: await app.get(CustomerService).getAllCustomers() });
  });

  afterAll(async () => {
    await app.close();
  });
});
