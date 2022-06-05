import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerService } from './customer.service';
import {
  mockCustomerRepository,
} from '../test-artifacts/repositories/mocks';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/customer.create.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  const mockCustomerService = {
    getCustomer: jest.fn(async (id: string): Promise<CustomerEntity> => {
      const Customer = mockCustomerRepository.findOne(id);
      if (!Customer) {
        throw new HttpException(`Customer doesn't exist`, HttpStatus.BAD_REQUEST);
      }
      return Customer;
    }),

    createCustomer: jest.fn(
      async (CustomerDto: CreateCustomerDto): Promise<CustomerEntity> => {
        const { customer_name, customer_field } = CustomerDto;

        const Customer: CustomerEntity = await mockCustomerRepository.create({
          customer_name,
          customer_field
        });
        await mockCustomerRepository.save(Customer);
        return Customer;
      },
    ),
    destroyCustomer: jest.fn(async (id: string): Promise<CustomerEntity> => {
      const Customer = mockCustomerRepository.findOne(id);
      if (!Customer) {
        throw new HttpException(`Customer doesn't exist`, HttpStatus.BAD_REQUEST);
        return Promise.reject('Customer not found');
      }
      return Promise.resolve(Customer);
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: mockCustomerRepository,
        },
        CustomerService,
      ],
    })
      .overrideProvider(CustomerService)
      .useValue(mockCustomerService)
      .compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find a Customer', async () => {
    const Customer = await service.getCustomer('12138-1egaze-1e1e1e-1e1e1e');
    expect(Customer).toBeDefined();
    expect(Customer.customer_name).toBe('Customer 1');
  });

  it('should create Customer', async () => {
    const Customer = await service.createCustomer({ customer_name: 'Customer 3' });
    expect(Customer).toBeDefined();
    expect(Customer.customer_name).toBe('Customer 3');
  });
  it('should destroy Customer', async () => {
    const Customer = await service.destroyCustomer('12138-1egaze-1e1e1e-1e1e1e');
    expect(Customer).toBeDefined();
    expect(Customer.customer_name).toBe('Customer 1');
  });
});
