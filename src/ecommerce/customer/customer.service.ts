import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/customer.create.dto';
import { CustomerDto } from '../dto/customer.dto';
import { CustomerEntity } from '../entity/customer.entity';
import { toCustomerDto } from '../mapper/mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  [x: string]: any;
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly CustomerRepo: Repository<CustomerEntity>,
  ) { }



  async getAllCustomers(): Promise<CustomerDto[]> {
    const customers = await this.CustomerRepo.find({
      where: {},
    });
    return customers.map((customer) => toCustomerDto(customer));
  }

  async getCustomer(id: string): Promise<CustomerDto> {
    const Customer: CustomerEntity = await this.CustomerRepo.findOne({ where: { id } });

    if (!Customer) {
      throw new HttpException(`Customer doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toCustomerDto(Customer);
  }



  async createCustomer(CustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const { customer_name, password, email } = CustomerDto;


    const Customer: CustomerEntity = await this.CustomerRepo.create({
      customer_name,
      password,
      email
    });

    await this.CustomerRepo.save(Customer);

    return toCustomerDto(Customer);
  }

  async destroyCustomer(id: string): Promise<CustomerDto> {
    const Customer: CustomerEntity = await this.CustomerRepo.findOne({ where: { id } });

    if (!Customer) {
      throw new HttpException(`Customer doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.CustomerRepo.delete({ id });

    return toCustomerDto(Customer);
  }
}
