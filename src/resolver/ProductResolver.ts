import { Args, Query, Resolver } from "@nestjs/graphql";
import { ProductService } from "../service/ProductService";
import { AddProductDTO } from "../payload/AddProductDTO";
import { ApiResult } from "../payload/ApiResult";
import { Inject } from "@nestjs/common";
import { Product } from "../entity/Product";

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {
  }


  @Query(() => Product)
  async addProduct(@Args("product") product: AddProductDTO) {
    return this.productService.addProduct(product);
  }

}