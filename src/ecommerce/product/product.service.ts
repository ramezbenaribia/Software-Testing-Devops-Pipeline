import { ProductEntity } from './../entity/product.entity';
import { CreateProductDto } from './../dto/product.create.dto';
import { toProductDto } from './../mapper/mapper';
import { ProductDto } from './../dto/product.dto';
import { OwnersService } from './../owner/owners.service';
import { OwnerEntity } from './../entity/owner.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  [x: string]: any;
  constructor(
    @InjectRepository(OwnerEntity)
    private readonly productRepo: Repository<ProductEntity>,
    private readonly ownersService: OwnersService,
  ) { }

  async getAllProducts(): Promise<ProductDto[]> {
    const products = await this.productRepo.find({
      where: {},
    });
    return products.map((product) => toProductDto(product));
  }

  async getOneProduct(id: string): Promise<ProductDto> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['owner', 'customers'],
    });

    if (!product) {
      throw new HttpException(
        `Product list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toProductDto(product);
  }

  async createProduct(
    userId: string,
    createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    const { name, description, product_type } = createProductDto;
    const { username } = await this.ownersService.findOne({ id: userId });
    const owner = await this.ownersService.findOne({ where: { username } });

    const product: ProductEntity = await this.productRepo.create({
      name,
      description,
      product_type,
      owner
    });

    await this.productRepo.save(product);

    return toProductDto(product);
  }

  async updateProduct(id: string, ProductDto: ProductDto): Promise<ProductDto> {
    const { name, description, product_type } = ProductDto;

    let product: ProductEntity = await this.productRepo.findOne({ where: { id } });

    if (!product) {
      throw new HttpException(
        `Product list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    product = {
      id,
      name,
      description,
      product_type
    };

    await this.productRepo.update({ id }, product); // update

    product = await this.productRepo.findOne({
      where: { id },
    }); // re-query

    return toProductDto(product);
  }

  async destroyProduct(id: string): Promise<ProductDto> {
    const product: ProductEntity = await this.productRepo.findOne({
      where: { id },
    });

    if (!product) {
      throw new HttpException(
        `Product list doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }



    await this.productRepo.delete({ id }); // delete product list

    return toProductDto(product);
  }
}
