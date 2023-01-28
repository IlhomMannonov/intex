import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AddProductDTO } from "./AddProductDTO";
import { Category } from "../entity/Category";

@ObjectType()
export class CategoryDTO {

  @Field()
  id: number;
  @Field()
  name_uz: string;

  @Field()
  name_ru: string;

  @Field()
  name_en: string;

  @Field({ nullable: true })
  category_id: number;


  constructor(name_uz: string, name_ru: string, name_en: string, category_id: number) {
    this.name_uz = name_uz;
    this.name_ru = name_ru;
    this.name_en = name_en;
    this.category_id = category_id;
  }

  public merge(dto: Category): CategoryDTO {
    const categoryDTO = new CategoryDTO(dto.name_uz, dto.name_ru, dto.name_ru, dto.category_id);
    categoryDTO.id = dto.id;
    return categoryDTO;
  }
}