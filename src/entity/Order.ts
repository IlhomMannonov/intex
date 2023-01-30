import { Field, ObjectType } from "@nestjs/graphql";
import { AbsLongNoUser } from "./template/AbsLongNoUser";
import { Column, Entity, ManyToOne } from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { OrderStatusEnum } from "../enums/OrderStatusEnum";

@ObjectType()
@Entity({ name: "order" })
export class Order extends AbsLongNoUser {

  @Field()
  @Column({ nullable: true })
  first_name: string;

  @Field()
  @Column({ name: "user_id", nullable: true })
  @ManyToOne(type => User, user => user.id)
  user_id: number;

  @Field()
  @Column({ name: "product_id" })
  @ManyToOne(type => Product, product => product.id)
  product_id: number;

  phone_number: string;

  //O'SHA VAQTDAGI ORDER NARXI
  @Column()
  @Field()
  price: number;


  //NECHTA SOTIB OLAYOTGANI
  @Column()
  @Field()
  amount: number;


  //KLENTNI MANZILI
  @Column()
  @Field()
  address: string;


  @Field()
  @Column()
  status: OrderStatusEnum;


}