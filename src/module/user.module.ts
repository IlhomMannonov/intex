import { Module } from "@nestjs/common";
import { UserResolver } from "../resolver/user.resolver";
import { UserService } from "../service/user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { SmsCodeService } from "../service/SmsCodeService";
import { MainService } from "../service/MainService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/User";
import { SmsCode } from "../entity/SmsCode";
import { UserDevice } from "../entity/UserDevice";

@Module({
  providers:
    [
      UserResolver,
      UserService,
      SmsCodeService,
      MainService],
  imports: [
    TypeOrmModule.forFeature([User, SmsCode, UserDevice]),
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "12h" }
    })
  ]
})
export class UserModule {
}
