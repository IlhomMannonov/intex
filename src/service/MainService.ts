import { Injectable } from "@nestjs/common";
import { GraphException } from "../exception/GraphException";

@Injectable()
export class MainService {

  generateVerificationCode(countChar: number): string {
    if (countChar > 8 || countChar < 5) throw GraphException.graphThrow("SMS_CODE_MUST_BE_BETWEEN", 400);
    const val = Math.floor(1000 + Math.random() * 9000);
    return String(val);
  }

  generateVerificationCodeWithMessageToPhone(verificationCode: string) {
    return "Intex uchun verification code " + verificationCode;
  }
}