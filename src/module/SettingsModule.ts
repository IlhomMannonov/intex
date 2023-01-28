import { Module } from "@nestjs/common";
import { SettingsService } from "../service/SettingsService";
import { SettingsResolver } from "../resolver/SettingsResolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Language } from "../entity/Language";

@Module({
  imports:[TypeOrmModule.forFeature([Language])],

  providers: [
    SettingsService,
    SettingsResolver
  ]
})
export class SettingsModule {

}