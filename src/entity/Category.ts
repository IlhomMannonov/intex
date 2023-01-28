import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { AbsLongNoUser } from "./template/AbsLongNoUser";

@ObjectType()
@Entity({ name: "category" })
export class Category extends AbsLongNoUser {


  @Column()
  @Field()
  name_uz: string;

  @Column()
  @Field()
  name_ru: string;

  @Column()
  @Field()
  name_en: string;

  @Column({ nullable: true   })
  @Field({nullable:true})
  @ManyToOne(type => Category, category => category.id)
  category_id: number;

}