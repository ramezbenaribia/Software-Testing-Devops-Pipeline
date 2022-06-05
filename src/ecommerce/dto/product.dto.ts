import { CustomerDto } from './customer.dto';
import { IsNotEmpty } from 'class-validator';
import { OwnerDto } from './owner.dto';

export class ProductDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;

  description?: string;
  product_type?: string;

  owner: OwnerDto;

  customers?: CustomerDto[];
}
