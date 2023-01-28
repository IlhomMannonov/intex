import { Injectable } from "@nestjs/common";
import { AddProductDTO } from "../payload/AddProductDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entity/Category";
import { GraphException } from "../exception/GraphException";
import { Product } from "../entity/Product";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {
  }


  async addProduct(product: AddProductDTO) {

    const exists = await this.categoryRepository.exist({ where: { id: product.category_id } });
    // AGAR CATEGORY TOPILMASA THROW QILAMIZ
    if (!exists) throw GraphException.graphThrow("CATEGORY_NOT_FOUND", 400);
    const insertResult = await this.productRepository.save(product);
    console.log(insertResult);
    return insertResult;

  }
}