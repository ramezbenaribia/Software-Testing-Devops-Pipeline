import { OwnersService } from './../src/ecommerce/owner/owners.service';
import { ProductService } from './../src/ecommerce/product/product.service';
import { OwnerDto } from './../src/ecommerce/dto/owner.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const owner = {
    username: 'ramez.ben.aribia',
    email: 'ramez.ben.aribia@gmail.com',
  };
  let dbOwner: OwnerDto;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbOwner = await app
      .get<OwnersService>(OwnersService)
      .findOne({ where: { username: owner.username } });
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
  it('/api/products/:id (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/products/fd097652-1cfa-4c98-bff8-d85efc43b007')
      .expect(200)
      .then((resp) => {
        const payload = resp.body;
        delete payload.owner.id;
        expect({
          id: 'fd097652-1cfa-4c98-bff8-d85efc43b007',
          name: 'SPEAKER',
          description: null,
          owner: dbOwner,
          customers: [],
        });
      });
  });
  it('/api/products (POST)', async () => {
    return request(app.getHttpServer())
      .post('/api/products')
      .send({
        name: 'test-product-name',
        description: 'Random description',
        userId: dbOwner.id,
      })
      .expect(201)
      .then((response) => {
        const payload = response.body;
        delete payload.id;
        expect(payload).toStrictEqual({
          name: 'test-product-name',
          description: 'Random description',
          owner: dbOwner,
        });
      });
  });
  it('/api/products (PUT)', async () => {
    return request(app.getHttpServer())
      .put('/api/products/fd097652-1cfa-4c98-bff8-d85efc43b007')
      .send({
        name: 'Edited Name',
        description: 'Edited description of the Office Chores',
        userId: dbOwner.id,
      })
      .expect(200)
      .then((resp) => {
        const payload = resp.body;
        expect({
          id: 'fd097652-1cfa-4c98-bff8-d85efc43b007',
          name: 'Edited Name',
          description: 'Edited description of the Office Chores',
          owner: dbOwner,
          customers: [],
        }).toStrictEqual(payload);
      });
  });
  afterAll(async () => {
    await app.close();
  });
});
