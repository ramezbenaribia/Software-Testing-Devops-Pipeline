import { IsNotEmpty, MaxLength, IsOptional, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  customer_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
