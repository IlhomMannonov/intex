import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { AbsLongNoUser } from "./template/AbsLongNoUser";

@ObjectType()
@Entity({ name: "sms_code" })
export class SmsCode {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;
//MIJOZNING TELEFONIGA YUBORILGAN TASDIQLASH KODI
  @Field()
  @Column()
  code: string;


//QAYSI RAQAMGA BORDI SMS
  @Field()
  @Column()
  phone_number: string;


  //MIJOZ USHBU CODENI TEKSHIRIB BO'LDI, ISHLATIB BO'LINGAN KODMI?
  @Field()
  @Column()
  checked: boolean;

  @Field()
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  constructor(code: string, phone_number: string, checked: boolean) {
    this.code = code;
    this.phone_number = phone_number;
    this.checked = checked;
  }
}