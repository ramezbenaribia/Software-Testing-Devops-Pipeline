import { IsNotEmpty } from 'class-validator';

export class CustomerDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  customer_name: string;

  customer_field?: string;
}
