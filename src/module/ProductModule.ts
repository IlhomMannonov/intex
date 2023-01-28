import { Module } from "@nestjs/common";
import { ProductResolver } from "../resolver/ProductResolver";
import { ProductService } from "../service/ProductService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "../entity/Product";
import { CategoryService } from "../service/CategoryService";
import { Category } from "../entity/Category";
import { Attachment } from "../entity/Attachment";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],

  providers: [
    ProductResolver,
    ProductService
  ]
})
export class ProductModule {

}