import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  product_type?: string;

  @IsNotEmpty()
  userId: string;
}
