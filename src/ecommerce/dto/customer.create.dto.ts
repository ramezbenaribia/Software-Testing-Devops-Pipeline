import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  customer_name: string;

  @IsOptional()
  @MaxLength(50)
  customer_field?: string;
}
