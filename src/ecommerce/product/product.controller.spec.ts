import { OwnersService } from './../owner/owners.service';
import { mockProductRepository, mockOwnerRepository } from './../test-artifacts/repositories/mocks';
import { ProductEntity } from './../entity/product.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OwnerEntity } from '../entity/owner.entity';
import {
} from '../test-artifacts/repositories/mocks';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

describe('Product Controller', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(OwnerEntity),
          useValue: mockOwnerRepository,
        },
        ProductService,
        OwnersService,
      ],
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
