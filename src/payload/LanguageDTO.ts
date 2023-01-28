import { Field, InputType } from "@nestjs/graphql";
import { LangEnum } from "../enums/LangEnum";


@InputType()
export class LanguageDTO {


  @Field({nullable: true})
  id: number;
  @Field({nullable: true})
  name_uz: boolean;
  @Field({nullable: true})
  name_ru: boolean;
  @Field({nullable: true})
  name_en: boolean;
}