import { CreateCustomerDto } from './../../dto/customer.create.dto';
import { OwnerDto } from './../../dto/owner.dto';
import { CreateOwnerDto } from './../../dto/owner.create.dto';
import { CreateProductDto } from './../../dto/product.create.dto';
import { CustomerEntity } from './../../entity/customer.entity';
import { ProductEntity } from './../../entity/product.entity';
import { OwnerEntity } from './../../entity/owner.entity';


export const testOwner: OwnerEntity = {
  id: 'test-owner-id',
  username: 'test-owner-name',
  email: 'test-owner-email',
  password: 'test-owner-password',
  hashPassword: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};
export const testProducts: ProductEntity[] = [
  {
    id: 'test-product-id-1',
    name: 'Product 1',
    description: 'Descritpion 1',
    product_type: 'Product Type 1',
  },
  {
    id: 'test-product-id-2',
    name: 'Product 2',
    description: 'Descritpion 2',
    product_type: 'Product Type 2',
  },
];

export const testCustomer: CustomerEntity = {
  id: 'test-customer-id',
  customer_name: 'cutomer name test',
  customer_field: 'customer filed test'
};



export const mockCustomerRepository = {
  find: jest.fn(
    async (): Promise<CustomerEntity[]> => Promise.resolve([testCustomer]),
  ),
  findOne: jest.fn(async (id: string): Promise<CustomerEntity> => {
    if (id == testCustomer.id) {
      return Promise.resolve(testCustomer);
    }
    return Promise.reject('customer not found');
  }),
  create: jest.fn((customerDto: CreateCustomerDto): CustomerEntity => {
    const customer = new CustomerEntity();
    customer.customer_name = customerDto.customer_name;
    customer.customer_field = customerDto.customer_field;
    return customer;
  }),
  save: jest.fn((customer: CustomerEntity): CustomerEntity => customer),
};






export const mockProductRepository = {
  find: jest
    .fn()
    .mockImplementation(
      async (): Promise<ProductEntity[]> => Promise.resolve(testProducts),
    ),
  findOne: jest
    .fn()
    .mockImplementation(
      async (id: string): Promise<ProductEntity> =>
        Promise.resolve(testProducts.find((product) => product.id === id)),
    ),
  create: jest
    .fn()
    .mockImplementation(
      (ownerDto: OwnerDto, createProductDto: CreateProductDto): ProductEntity => {
        const product = new ProductEntity();
        product.name = createProductDto.name;
        product.id = 'some-random-id';
        product.owner = testOwner;
        return product;
      },
    ),
  save: jest.fn((product: ProductEntity): ProductEntity => product),
  delete: jest.fn((id: string) => Promise.resolve(true)),
};
export const mockOwnerRepository = {
  find: jest.fn(
    async (): Promise<OwnerEntity[]> => Promise.resolve([testOwner]),
  ),
  findOne: jest.fn(async (id: string): Promise<OwnerEntity> => {
    if (id == testOwner.id) {
      return Promise.resolve(testOwner);
    }
    return Promise.reject('owner not found');
  }),
  create: jest.fn((ownerDto: CreateOwnerDto): OwnerEntity => {
    const owner = new OwnerEntity();
    owner.username = ownerDto.username;
    owner.email = ownerDto.email;
    owner.password = ownerDto.password;
    return owner;
  }),
  save: jest.fn((owner: OwnerEntity): OwnerEntity => owner),
};
