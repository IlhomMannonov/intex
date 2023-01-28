import { Inject, Injectable } from "@nestjs/common";
import { MainService } from "./MainService";
import { GraphException } from "../exception/GraphException";
import { SmsCode } from "../entity/SmsCode";
import { SmsCodeDTO } from "../payload/SmsCodeDTO";
import { Repository } from "typeorm";
import { User } from "../entity/User";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SmsCodeService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(SmsCode) private smsCodeRepository: Repository<SmsCode>,
    @Inject(MainService) private mainService: MainService) {

  }

  async sendSmsAndReturnSmsCode(phoneNumber: string): Promise<SmsCodeDTO> {
    if (!await this.checkLimitSmsCodePyPhoneNumber(5, phoneNumber, 1)) throw GraphException.graphThrow("MANY_SMS_CODE_SENT", 400);

    //SMS CODE GENERATSIYA
    const verificationCode: string = this.mainService.generateVerificationCode(6);


    //SMS CODE NI SMS YUBORISH UCHUN SMS MESSAGE GA AYLANTIRAMIZ
    const smsMessage: string = this.mainService.generateVerificationCodeWithMessageToPhone(verificationCode);


    //MIJOZNING TELEFON RAQAMIGA SMS YUBORAMIZ. AGAR YUBORA OLSA TRUE QAYTADI
    const send: boolean = await this.sendSmsCode(phoneNumber, smsMessage);

    //AGAR MIJOZGA SMS KETMASA THROW QILAMIZ
    if (!send) throw GraphException.graphThrow("ERROR_IN_SENDING_SMS", 403);


    //SMS CODENI O'ZIMIZGA SAVE QILAMIZ
    const smsCode: SmsCode = await this.saveSmsCode(phoneNumber, verificationCode);

    return new SmsCodeDTO(smsCode.id, smsCode.code);

  }

  async sendSmsCode(phoneNumber: string, smsMessage: string): Promise<boolean> {
    //SMS YUBORISH XIZMATIDAN FOYDALANAMIZ
    //UZB NOMER BO'LSA BOSHQA SERVICE ISHALTAMIZ, CHET-EL UCHUN BOSHQA SERVICE
    return true;
  }

  async checkLimitSmsCodePyPhoneNumber(limitCode: number, phoneNumber: string, limitCOdeDuration: number): Promise<boolean> {
    // return this.knex.raw(`select ${limitCode} <= (select COUNT(*)
    //                                               from sms_code
    //                                               where phone_number = '${phoneNumber}'
    //                                                 and created_at >
    //                                                     (select current_timestamp - (INTERVAL '1' hour) * ${limitCOdeDuration})
    //                                                 and ignored = false)`);

    return await this.smsCodeRepository.query(`select ${limitCode} <= (select COUNT(*)
                                                                       from sms_code
                                                                       where phone_number = '${phoneNumber}'
                                                                         and created_at >
                                                                             (select current_timestamp - (INTERVAL '1' hour) * ${limitCOdeDuration})
                                                                         and ignored = false)`);


  }

  private async saveSmsCode(phoneNumber: string, verificationCode: string) {
    const smsCode: SmsCode = new SmsCode(verificationCode, phoneNumber, false);

    // const [queryBuilder] = await Promise.all([this.knex<SmsCode>("sms_code").insert(smsCode).returning(["id", "phone_number", "code", "checked"])]);
    return  await this.smsCodeRepository.insert(smsCode)[0];
    // return queryBuilder[0];


  }

  async checkSmsCodeIfFailedThrow(phoneNumber: string, code: string, smsCodeId: string) {
    //USHBU PHONE_NUMBER GA YUBORILGAN EMG OXIRGI SMS_CODE NI OLYAPMIZ. SMS_CODE OBJECTI BO'LMASA THROW
    // const smsCode: SmsCode = await this.knex<SmsCode>("sms_code").select("*").where("phone_number", phoneNumber).orderBy("created_at", "desc").first();
    const smsCode = await this.smsCodeRepository.findOne({
      order: {
        created_at: "desc"
      }
    });

    if (smsCode.id != smsCodeId) throw GraphException.graphThrow("SMS_CODE_EXPIRED", 400);

    else if (smsCode.checked) throw  GraphException.graphThrow("SMS_CODE_ALREADY_USED", 4000);

    else if (code != smsCode.code) throw GraphException.graphThrow("CONFIRMATION_CODE_INCORRECT", 400);

    //O'SHA SMS KODNI CHECKED QILIB QOYAMIZ
    // await this.knex("sms_code").update({ checked: true }).where("id", smsCode.id);

    this.smsCodeRepository.createQueryBuilder()
      .update(SmsCode)
      .set({ checked: true })
      .where("id = :id", { id: smsCode.id });

  }
}