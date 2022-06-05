import { ProductDto } from './product.dto';
import { IsNotEmpty, IsEmail } from 'class-validator';


export class CustomerDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  customer_name: string;


  @IsNotEmpty()
  @IsEmail()
  email: string;

  bought_products?: ProductDto[];


}
