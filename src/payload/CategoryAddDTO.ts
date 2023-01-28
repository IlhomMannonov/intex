import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class CategoryAddDTO {
  @Field()
  name_uz: string;

  @Field()
  name_ru: string;

  @Field()
  name_en: string;

  @Field({ nullable: true })
  category_id: number;
}