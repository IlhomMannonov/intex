import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { ContextUtils } from "@nestjs/core/helpers/context-utils";

@Injectable()
export class LocalStrategy {
  constructor(private userService: UserService,
              @Inject('CurrentContext') private context: ContextUtils
              ) {
  }
  async a(){

  }


}