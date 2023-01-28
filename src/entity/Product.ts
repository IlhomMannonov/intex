import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { AbsLongNoUser } from "./template/AbsLongNoUser";
import { Attachment } from "./Attachment";

@ObjectType()
@Entity({ name: "product" })
export class Product extends AbsLongNoUser {


  @Column()
  @Field({ nullable: true })
  name_uz: string;
  @Column()
  @Field({ nullable: true })
  name_ru: string;
  @Column()
  @Field({ nullable: true })
  name_en: string;

  //DESCRIPTIONLAR
  @Column()
  @Field({ nullable: true })
  description_uz: string;

  @Column()
  @Field({ nullable: true })
  description_ru: string;

  @Column()
  @Field({ nullable: true })
  description_en: string;

  //REALNIY FIELDLAR

  @Column()
  @Field({ nullable: true })
  @ManyToOne(type => Category, category => category.id)
  category_id: number;

  @Column()
  @Field({ nullable: true })
  amount: number;

  @Column()
  @Field({ nullable: true })
  country_id: number;
  @Column("int", { array: true })
  @Field()
  attachments_id: number[];

}