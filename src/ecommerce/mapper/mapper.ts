import { OwnerEntity } from './../entity/owner.entity';
import { OwnerDto } from './../dto/owner.dto';
import { CustomerEntity } from './../entity/customer.entity';
import { CustomerDto } from './../dto/customer.dto';
import { ProductEntity } from './../entity/product.entity';
import { ProductDto } from "../dto/product.dto";

export const toProductDto = (data: ProductEntity): ProductDto => {
  const { id, name, description, product_type, owner, customers } = data;

  let productDto: ProductDto = {
    id,
    name,
    description,
    product_type,
    owner: owner ? toOwnerDto(owner) : null,
  };

  if (customers) {
    productDto = {
      ...productDto,
      customers: customers.map((customer: CustomerEntity) => toCustomerDto(customer)),
    };
  }

  return productDto;
};

export const toCustomerDto = (data: CustomerEntity): CustomerDto => {
  const { id, customer_name, email, bought_products } = data;

  let customerDto: CustomerDto = {
    id,
    customer_name,
    email
  };
  if (bought_products) {
    customerDto = {
      ...customerDto,
      bought_products: bought_products.map((product: ProductEntity) => toProductDto(product)),
    };
  }

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
