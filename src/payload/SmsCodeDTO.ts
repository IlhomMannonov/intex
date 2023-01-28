import { Field, ObjectType } from "@nestjs/graphql";
import { ParseUUIDPipe } from "@nestjs/common";

@ObjectType()
export class SmsCodeDTO {
  @Field()
  smsCodeId: String = "null";
  @Field()
  smsCode: String = "null";
  //USERGA SMS YUBORILGACH QAYTADIGAN XABAR.(+99899 6** ** 36 RAQAMIGA 6 TA RAQAMDAN IBORAT BO'LGAN KOD YUBORDIK KABI)
  @Field()
  abbreviationMessage: String = "null";


  constructor(smsCodeId: String, smsCode: String) {
    this.smsCodeId = smsCodeId;
    this.smsCode = smsCode;
  }

  public static initDTO(): SmsCodeDTO {
    return new SmsCodeDTO("null", "null");
  };
}