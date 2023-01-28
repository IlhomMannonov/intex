import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { AbsLongNoUser } from "./template/AbsLongNoUser";
import { UserStatusEnum } from "../enums/UserStatusEnum";
import { UserRoleEnum } from "../enums/UserRoleEnum";

@ObjectType()
@Entity({ name: "users" })
export class User extends AbsLongNoUser {

  @Field()
  @Column()
  first_name: string;
  @Field()
  @Column()
  last_name: string;
  @Field()
  @Column()
  phone_number: string;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  gender: string;
  @Field()
  @Column()
  user_image: string;
  @Field()
  @Column()
  birth_date: string;
  @Field()
  @Column()
  password: string;
  @Field()
  @Column()
  status: UserStatusEnum;
  @Field()
  @Column()
  role: UserRoleEnum;
  @Field()
  @Column()
  is_active: boolean;
  @Field()
  @Column()
  is_registered_google: boolean;




}