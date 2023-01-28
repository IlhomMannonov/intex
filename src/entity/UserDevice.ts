import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";
import { AbsLongNoUser } from "./template/AbsLongNoUser";

@ObjectType()
@Entity({ name: "user_device" })
export class UserDevice  {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Field()
  @Column()
  user_agent: String;
  @Field()
  @Column()
  @ManyToOne(type => User, user => user.id)
  users_id: number;


  constructor(user_agent: String, users_id: number) {

    this.user_agent = user_agent;
    this.users_id = users_id;
  }
}