import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import {
  mockCustomerRepository,
} from '../test-artifacts/repositories/mocks';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CustomerEntity } from '../entity/Customer.entity';
describe('Customer Controller', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(CustomerEntity),
          useValue: mockCustomerRepository,
        },
      ],
      controllers: [CustomerController],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
