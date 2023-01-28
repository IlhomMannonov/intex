import { Args, Query, Resolver } from "@nestjs/graphql";
import { CategoryDTO } from "../payload/CategoryAdd";
import { CategoryService } from "../service/CategoryService";
import { CategoryAddDTO } from "../payload/CategoryAddDTO";
import { ApiResult } from "../payload/ApiResult";
import { Category } from "../entity/Category";

@Resolver()
export class CategoryResolver {

  constructor(private categoryService: CategoryService) {
  }

  @Query(() => Category)
  async addCategory(@Args("addCategory") categoryDTO: CategoryAddDTO) {
    return this.categoryService.addCategory(categoryDTO);
  }

  @Query(() => [CategoryDTO])
  async getAllCategory() {
    return this.categoryService.getAllCategory();
  }

  @Query(() => ApiResult)
  async deleteCategoryById(@Args("id") id: number) {
    return this.categoryService.deleteById(id);
  }

  @Query(() => Category)
  async editCategory(@Args("id") id: number, @Args("category") category: CategoryAddDTO) {
    return this.categoryService.editCategory(id, category);
  }
}