import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity } from "typeorm";
import { AbsLongNoUser } from "./template/AbsLongNoUser";

@ObjectType()
@Entity({ name: "attachment" })
export class Attachment extends AbsLongNoUser {

  @Column()
  @Field({ nullable: true })
  fileId: string;
  @Column()
  @Field({ nullable: true })
  originalName: string;
  @Column()
  @Field({ nullable: true })
  size: number;


}