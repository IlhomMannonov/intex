import { GraphException } from "../exception/GraphException";
import { CategoryAddDTO } from "../payload/CategoryAddDTO";
import { ApiResult } from "../payload/ApiResult";
import { Repository } from "typeorm";
import { Category } from "../entity/Category";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { assertWrappingType } from "graphql/type";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {
  }


  async addCategory(categoryDTO: CategoryAddDTO) {
    if (categoryDTO.category_id != null)
      await this.categoryIdIfExistsThrow(categoryDTO.category_id);

    const insertResult = await this.categoryRepository.save({
      name_uz: categoryDTO.name_uz,
      name_ru: categoryDTO.name_ru,
      name_en: categoryDTO.name_en,
      category_id: categoryDTO.category_id
    });
    return insertResult;

  }


  async categoryIdIfExistsThrow(id: Number) {

    const exists: boolean = await this.categoryRepository.query(`select exists(select * from category c where c.id = ${id})`);
    if (!exists) throw GraphException.graphThrow("CATEGORY_NOT_FOUND", 400);
  }


  async getAllCategory() {
    return this.categoryRepository.find();

  }

  async deleteById(id: number) {

    const exists: boolean = await this.categoryRepository.exist({ where: { id: id } });
    if (!exists) throw GraphException.notFound("CATEGORY");

    const q = await this.categoryRepository.delete({
      id: id
    });

    if (q) {
      return ApiResult.successResponse("SUCCESS_DELETED_CATEGORY");
    } else
      return ApiResult.successResponse("NOT_FOUNT");

  }

  async editCategory(id: number, category: CategoryAddDTO) {
    const exists = await this.categoryRepository.exist({ where: { id: id } });
    if (!exists) throw GraphException.notFound("CATEGORY");


    await this.categoryRepository.update(id, category);
    return category;
  }
}