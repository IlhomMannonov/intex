import { Inject, Injectable } from "@nestjs/common";
import { SignInDTO } from "../payload/SignInDTO";
import { TokenDTO } from "../payload/TokenDTO";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { SignInResponseDTO } from "../payload/SignInResponseDTO";
import { UserDevice } from "../entity/UserDevice";
import { ForgotPasswordDTO } from "../payload/ForgotPasswordDTO";
import { GraphException } from "../exception/GraphException";
import { SmsCodeService } from "./SmsCodeService";
import { CheckSmsCodeDTO } from "../payload/CheckSmsCodeDTO";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserDevice) private userDeviceRepository: Repository<UserDevice>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(SmsCodeService) private smsCodeService: SmsCodeService
  ) {
  }

  async signIn(signInDTO: SignInDTO): Promise<SignInResponseDTO> {

    let user = await this.validateUser(signInDTO.userName, signInDTO.password);

    const response: SignInResponseDTO = new SignInResponseDTO();

    //USERNI DEVICENI RASMIYLASHTIRYABMIZ
    const reliableDevice: boolean = await this.checkUserDevice(user, signInDTO.deviceKey);

    if (reliableDevice) {
      const tokenDTO: TokenDTO = await this.generateToken(user, signInDTO.deviceKey);
      response.isToken = true;
      response.token = tokenDTO;
    } else {
      const forgotPassword: ForgotPasswordDTO = await this.forgotPassword(signInDTO.userName);
      response.smsCode = forgotPassword.smsCode;
      response.isToken = false;
    }

    return response;
  }

  async checkSmsCode(checkSmsCodeDTO: CheckSmsCodeDTO) {
    await this.smsCodeService.checkSmsCodeIfFailedThrow(checkSmsCodeDTO.phoneNumber, checkSmsCodeDTO.smsCode, checkSmsCodeDTO.smsCodeId);

    const user: User = await this.validateUser(checkSmsCodeDTO.phoneNumber, checkSmsCodeDTO.password);

    return this.saveUserDeviceAndGenerateToken(checkSmsCodeDTO.reliableDevice, user);

  }


  async validateUser(username: string, password: string): Promise<User> {

    const user = await this.userRepository.findOne({
      where: {
        phone_number: username
      }
    });

    // const user = await this.knex<User>("users").select("id", "phone_number", "password").where("phone_number", username).first();

    if (user == null) throw GraphException.graphThrow("User not found", 400);

    if (!await bcrypt.compare(password, user.password)) throw GraphException.graphThrow("Phone number or password invalid", 400);

    return user;
  }

  async checkUserDevice(user: User, deviceKey: string): Promise<boolean> {
    //DEVICE KEYNI CLIENTDAN KELMAGAN BO'LSA
    if (deviceKey == null) return false;

    const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
    const check: boolean = regexExp.test(deviceKey);

    if (!check) return false;
    //DEVICE KEY CLIENTDAN KELGAN BO'LSA USHUBU USERGA TEGISHLI EKNALGIINI TEKSHIRAMIZ

    const exists: boolean = await this.userRepository.query(`select exists(select *
                                                                           from user_device ud
                                                                           where users_id = ${user.id}
                                                                             and ud.id = '${deviceKey}')`);

    console.log(exists);
    return exists;
  }


  async generateToken(user: User, deviceKey: string): Promise<TokenDTO> {
    const token = await this.jwtService.signAsync({ id: user.id });
    return new TokenDTO(token, "null", deviceKey);
  }

  private async forgotPassword(phoneNumber: string) {
    if (phoneNumber == null) throw GraphException.graphThrow("Phone number null", 400);

    await this.getEnableUserByPhoneNumberIfNotExistThrow(phoneNumber);

    const forgotPassword: ForgotPasswordDTO = new ForgotPasswordDTO();

    //USERNING EMAIL BO'LMASA VA XAVFSIZLIK SAVOLLARIGA BERGAN JAVOBLARI SONI TIZIMDA BEGILANGAN SONDAN KAM BO'LSA UNGA SMS YUBORAMIZ
    forgotPassword.smsCode = await this.smsCodeService.sendSmsAndReturnSmsCode(phoneNumber);


    return forgotPassword;
  }


  async getEnableUserByPhoneNumberIfNotExistThrow(phoneNumber: string) {
    // const user = await this.knex<User>("users").select("*").where("phone_number", phoneNumber).first();
    const user = await this.userRepository.findOne({ where: { phone_number: phoneNumber } });
    if (user == null) throw GraphException.graphThrow("NOT_FOUND_PHONE_NUMBER", 400);
    return user;
  }


  async saveUserDeviceAndGenerateToken(reliableDevice: boolean, user: User) {

    //MIJOZGA DEVICE KEY QAYTARISH UCHUN(AGAR BU FIILD NULL HOLATIDA QOLSA, USERGA DEVICE KEY QAYTARMAYMIZ)
    let deviceKey: string = null;

    //USER BRWSERINI ISHONCHLI QURILMA DEB HISOBLAGAN BO'LSA
    if (reliableDevice)
      deviceKey = await this.saveUserDeviceAndReturnId(user);

    //MIJOZGA TOKEN QAYTARISH UCHUN GENERATSIYA QILYAPMIZ

    return this.generateToken(user, deviceKey);
  }

  async saveUserDeviceAndReturnId(user: User): Promise<string> {

    // const device: UserDevice = await this.knex<UserDevice>("user_device").insert({
    //   user_agent: "agent",
    //   users_id: user.id
    // }).returning(["id", "users_id", "user_agent"]);

    const device = await this.userDeviceRepository.insert({ user_agent: "agent", users_id: user.id });

    return device[0].id;
  }
}
