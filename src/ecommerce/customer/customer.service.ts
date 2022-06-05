import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/Customer.create.dto';
import { CustomerDto } from '../dto/Customer.dto';
import { CustomerEntity } from '../entity/Customer.entity';
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

  async getCustomer(id: string): Promise<CustomerDto> {
    const Customer: CustomerEntity = await this.CustomerRepo.findOne({ where: { id } });

    if (!Customer) {
      throw new HttpException(`Customer doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toCustomerDto(Customer);
  }



  async createCustomer(CustomerDto: CreateCustomerDto): Promise<CustomerDto> {
    const { customer_name, customer_field } = CustomerDto;


    const Customer: CustomerEntity = await this.CustomerRepo.create({
      customer_name,
      customer_field
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
