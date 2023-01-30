import { Injectable } from "@nestjs/common";
import { AddProductDTO } from "../payload/AddProductDTO";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entity/Category";
import { GraphException } from "../exception/GraphException";
import { Product } from "../entity/Product";
import { ProductFilterDTO } from "../payload/ProductFilterDTO";
import { ApiResult } from "../payload/ApiResult";
import { query } from "express";

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {
  }


//ADMIN UCHUN PRODUCT QO'SHISH
  async addProduct(product: AddProductDTO) {

    const exists = await this.categoryRepository.exist({ where: { id: product.category_id } });
    // AGAR CATEGORY TOPILMASA THROW QILAMIZ
    if (!exists) throw GraphException.graphThrow("CATEGORY_NOT_FOUND", 400);

    //SHU YERDA MENDAN KEYIN KIM YOZSA HAM ETIBORLI BO'LSIN ATTACHMENT ID LIST NI DATABASE GA
    // SAQLASHDA QO'LDA SAQLASIN CHUNKI DATABASEDA INT[] BO'LGANI BILAN ENTITYDA STRING BO'LIB TURIBDI
    return await this.productRepository.save(product);
  }


  //ADMIN UCHUN PRODUCTLARNI OLIB KELAISH
  async getByFilter(filter: ProductFilterDTO) {

    const size = filter.size;
    const page = filter.page;
    const q = filter.q;
    const orderBy: string = filter.orderBy ? "asc" : "desc";

    if (q != null) {
      return await this.productRepository.query(`select p.*
                                                 from product as p
                                                 where p.name_uz ilike '%'${q}'%'
                                                    or p.name_ru ilike '%' ${q}'%'
                                                    or p.name_en ilike '%' ${q}'%'
                                                 order by p.name_uz ${orderBy} limit ${size}
                                                 offset ${page}`);
    }

    return await this.productRepository.query(`select p.*
                                               from product as p
                                               order by p.name_uz ${orderBy} limit ${size}
                                               offset ${page}`);
  }

  //ID BO'YICHA BITTA PRODUCTNI OLIB KELISH
  async getById(id: number) {
    const products = await this.productRepository.findBy({ id: id });

    //AGAR PRODUCT TOPLILMASA THROW QILAMIZ
    if (products == null) throw GraphException.notFound("PRODUCT");

    return products;


  }


  //ID BO'YICHA DELETE QILSH
  async deleteById(id: number) {
    const product = await this.getById(id);
    await this.productRepository.softDelete({ id });
    return ApiResult.successResponse("SUCCESS_DELETED");
  }


  async editProduct(id: number, product: AddProductDTO) {

    //AGAR BUNAGA PRODUCT TOPILMASA THROW QIVORAMIZA
    const exists = await this.productRepository.exist({ where: { id: id } });
    if (!exists) throw GraphException.notFound("PRODUCT");

    const updateResult = await this.productRepository.update(id, product);

    product.id = updateResult[0].id;
    return product;

  }
}