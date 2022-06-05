import { OwnerEntity } from './../entity/owner.entity';
import { OwnerDto } from './../dto/owner.dto';
import { CustomerEntity } from './../entity/customer.entity';
import { CustomerDto } from './../dto/customer.dto';
import { ProductEntity } from './../entity/product.entity';
import { ProductDto } from "../dto/product.dto";

export const toProductDto = (data: ProductEntity): ProductDto => {
  const { id, name, description, product_type, owner } = data;

  const productDto: ProductDto = {
    id,
    name,
    description,
    product_type,
    owner: owner ? toOwnerDto(owner) : null,
  };

  return productDto;
};

export const toCustomerDto = (data: CustomerEntity): CustomerDto => {
  const { id, customer_name, customer_field } = data;

  const customerDto: CustomerDto = {
    id,
    customer_name,
    customer_field
  };

  return customerDto;
};

export const toOwnerDto = (data: OwnerEntity): OwnerDto => {
  const { id, username, email } = data;

  const ownerDto: OwnerDto = {
    id,
    username,
    email,
  };

  return ownerDto;
};
