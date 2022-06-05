import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from '../dto/Customer.dto';
import { CreateCustomerDto } from '../dto/Customer.create.dto';

@Controller('api/customers')
export class CustomerController {
  constructor(private CustomerService: CustomerService) { }

  @Get(':id')
  async findOneCustomer(@Param('id') id: string): Promise<CustomerDto> {
    return await this.CustomerService.getCustomer(id);
  }


  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerDto> {
    return await this.CustomerService.createCustomer(createCustomerDto);
  }

  @Delete(':id')
  async destory(@Param('id') id: string): Promise<CustomerDto> {
    return await this.CustomerService.destroyCustomer(id);
  }
}
