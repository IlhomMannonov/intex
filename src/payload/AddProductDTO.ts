import { Field, InputType } from "@nestjs/graphql";
import { Double } from "typeorm";

@InputType()
export class AddProductDTO {

  @Field()
  category_id: number;

  @Field()
  name_uz: string;
  @Field()
  name_ru: string;
  @Field()
  name_en: string;

  @Field()
  description_uz: string;
  @Field()
  description_ru: string;
  @Field()
  description_en: string;

  @Field()
  price: number;

  @Field()
  amount: number;

  @Field()
  discount_price: number;

  @Field()
  status: string;

  @Field()
  attachment_id: number;


  @Field()
  country_id: number;


}