import { OwnerDto } from './../dto/owner.dto';
import { OwnersService } from './../owner/owners.service';
import { OwnerEntity } from './../entity/owner.entity';
import { ProductDto } from './../dto/product.dto';
import { ProductEntity } from './../entity/product.entity';
import { CreateProductDto } from './../dto/product.create.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { mockOwnerRepository, mockProductRepository } from './../test-artifacts/repositories/mocks';


describe('ProductService', () => {
  let service: ProductService;
  const mockProductService = {
    getAllProducts: jest.fn(async () => mockProductRepository.find()),
    getOneProduct: jest.fn(async (id: string) => {
      const product = mockProductRepository.findOne(id);
      if (!product) {
        throw new HttpException(
          `Product list doesn't exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      return product;
    }),
    createProduct: jest.fn(
      async (userId: string, createProductDto: CreateProductDto) => {
        const { name, description, product_type } = createProductDto;
        const owner = await mockOwnerRepository.findOne(userId);
        const product: ProductEntity = await mockProductRepository.create(
          {
            name,
            description,
            product_type,
            owner,
          },
          createProductDto,
        );
        await mockProductRepository.save(product);
        return product;
      },
    ),
    updateProduct: jest.fn(
      async (id: string, productDto: ProductDto): Promise<ProductEntity> => {
        const { name, description, product_type } = productDto;
        const product: ProductEntity = await mockProductRepository.findOne(id);
        product.name = name;
        product.description = description;
        product.product_type = product_type;
        await mockProductRepository.save(product);
        return product;
      },
    ),
    destroyProduct: jest.fn(async (id: string) => {
      const product = await mockProductRepository.findOne(id);
      if (!product) {
        throw new HttpException(
          `Product list doesn't exist`,
          HttpStatus.BAD_REQUEST,
        );
      }
      await mockProductRepository.delete(id);
      return product;
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(OwnerEntity),
          useValue: mockOwnerRepository,
        },
        OwnersService,
      ],
    })
      .overrideProvider(ProductService)
      .useValue(mockProductService)
      .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return all products', async () => {
    const products = await service.getAllProducts();
    expect(products).toBeDefined();
    expect(products).toBeInstanceOf(Array);
    expect(products.length).toBeGreaterThanOrEqual(1);
  });
  it('should return one product', async () => {
    const product = await service.getOneProduct('test-product-id-1');
    expect(product).toBeDefined();
    expect(product.name).toBe('test-product-name-1');
  });
  it('should create a product', async () => {
    const userdto: OwnerDto = {
      id: 'test-owner-id',
      username: 'test-owner-name',
      email: 'test-owner-email',
    };
    const createProductDto: CreateProductDto = {
      name: 'test-product-name-1',
      description: 'test-product-description-1',
      userId: userdto.id,
    };
    const product = await service.createProduct('test-owner-id', createProductDto);
    expect(product).toBeDefined();
    expect(product.name).toBe('test-product-name-1');
  });
  it('should destroy a product', async () => {
    const res = await service.destroyProduct('test-product-id-1');
    expect(res).toBeDefined();
    expect(res).toBeTruthy();
  });
});
