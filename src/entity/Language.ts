import { Field, ObjectType } from "@nestjs/graphql";
import { LangEnum } from "../enums/LangEnum";
import { Column, Entity } from "typeorm";
import { AbsLongNoUser } from "./template/AbsLongNoUser";

@ObjectType()
@Entity({ name: "language" })
export class Language extends AbsLongNoUser {

  @Column()
  @Field({nullable: true})
  name_uz: boolean;
  @Column()
  @Field({nullable: true})
  name_ru: boolean;
  @Column()
  @Field({nullable: true})
  name_en: boolean;
}