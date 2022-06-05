import { CreateProductDto } from './../dto/product.create.dto';
import { ProductDto } from './../dto/product.dto';
import { ProductListDto } from './../dto/product.list.dto';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Get()
  async findAll(@Req() req: any): Promise<ProductListDto> {
    const products = await this.productService.getAllProducts();
    return { products };
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.getOneProduct(id);
  }

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: any,
  ): Promise<ProductDto> {
    const { userId } = createProductDto;

    return await this.productService.createProduct(userId, createProductDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() productDto: ProductDto,
  ): Promise<ProductDto> {
    return await this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  async destroy(@Param('id') id: string): Promise<ProductDto> {
    return await this.productService.destroyProduct(id);
  }
}
