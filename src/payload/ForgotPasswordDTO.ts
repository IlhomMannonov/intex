import { Field, ObjectType } from "@nestjs/graphql";
import { SmsCodeDTO } from "./SmsCodeDTO";

@ObjectType()
export class ForgotPasswordDTO {

  @Field()
  smsCode: SmsCodeDTO;


}