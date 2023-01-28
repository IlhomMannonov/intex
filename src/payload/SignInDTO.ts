import { Field, InputType, ObjectType } from "@nestjs/graphql";

@InputType()
export class SignInDTO {
  @Field({nullable: true})
  userName: string;
  @Field({nullable: true})
  password: string;
  @Field({nullable: true})
  reliableDevice: boolean;

  @Field({nullable: true})
  deviceKey: string;


}
