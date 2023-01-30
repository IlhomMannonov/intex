import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { AbsLongNoUser } from "./template/AbsLongNoUser";
import { User } from "./User";
import { Product } from "./Product";

@ObjectType()
@Entity({ name: "user_product" })
export class UserProduct extends AbsLongNoUser {

  @Field()
  @Column({ name: "user_id", nullable: true })
  @ManyToOne(type => User, user => user.id)
  user_id: number;

  @Field()
  @Column({ name: "product_id", nullable: true })
  @ManyToOne(type => Product, product => product.id)
  product_id: number;

  @Field()
  @Column({ default: 1 })
  amount: number;

}