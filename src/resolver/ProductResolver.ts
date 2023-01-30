import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "../service/ProductService";
import { AddProductDTO } from "../payload/AddProductDTO";
import { ApiResult } from "../payload/ApiResult";
import { Inject } from "@nestjs/common";
import { Product } from "../entity/Product";
import { ProductFilterDTO } from "../payload/ProductFilterDTO";
import { TypeMetadataStorageHost } from "@nestjs/graphql/dist/schema-builder/storages/type-metadata.storage";

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {
  }


  @Query(() => Product)
  async addProduct(@Args("product") product: AddProductDTO) {
    return this.productService.addProduct(product);
  }

  @Query(() => Product)
  async getByFilter(@Args("filter") filter: ProductFilterDTO): Promise<Product[]> {
    return this.productService.getByFilter(filter);
  }

  @Query(() => Product)
  async getById(@Args("id") id: number) {
    return this.productService.getById(id);
  }

  @Query(() => ApiResult)
  async deleteById(@Args("id") id: number) {
    return this.productService.deleteById(id);
  }

  @Query(() => Product)
  async editProduct(@Args("id") id: number, @Args("product") product: AddProductDTO) {
    return this.productService.editProduct(id, product);
  }

}