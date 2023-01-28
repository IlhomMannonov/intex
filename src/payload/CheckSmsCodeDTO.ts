import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CheckSmsCodeDTO {
  //MIJZOGA YUBORGAN SMS KOD NING ID SI
  @Field()
  smsCodeId: string;

//MIJOZGA BORGAN SMS KODI
  @Field()
  smsCode: string;

  //MIJOZ KIRAYOTGAN QURILMASINI ISHONCHLI DEB BELGILAGAN BO'LSA
  @Field()
  reliableDevice: boolean;

  //QAYSI TELEFON RAQAMLI USER KIRYAPTI
  @Field()
  phoneNumber: string;

  @Field()
  password: string;


}