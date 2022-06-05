import {
  Controller,
  Param,
  Get,
  Post,
  Body,
  Delete,
  Req,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDto } from '../dto/customer.dto';
import { CreateCustomerDto } from '../dto/customer.create.dto';
import { CustomersListDto } from '../dto/cusomers.list.dto';

@Controller('api/customers')
export class CustomerController {
  constructor(private CustomerService: CustomerService) { }

  @Get()
  async findAllCustomers(@Req() req: any): Promise<CustomersListDto> {
    const customers = await this.CustomerService.getAllCustomers();
    return { customers };
  }


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
