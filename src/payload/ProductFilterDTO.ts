import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductFilterDTO {

  @Field({ nullable: false })
  q: string;

  @Field({ nullable: false, defaultValue: true })
  orderBy: boolean;  //AGAR TRUE BO'LSA ASC, FALSE = DESC

  @Field()
  page: number;

  @Field({ nullable: false, defaultValue: 10 })
  size: number;
}