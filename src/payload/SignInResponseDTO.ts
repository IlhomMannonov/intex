import { Field, ObjectType } from "@nestjs/graphql";
import { SmsCodeDTO } from "./SmsCodeDTO";
import { TokenDTO } from "./TokenDTO";

@ObjectType()
export class SignInResponseDTO {
  @Field(() => SmsCodeDTO)
  smsCode: SmsCodeDTO = SmsCodeDTO.initDTO();

  @Field(() => TokenDTO)
  token: TokenDTO = TokenDTO.initToken();
  @Field()
  isToken: Boolean;
}