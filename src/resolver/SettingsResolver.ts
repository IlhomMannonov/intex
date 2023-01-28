import { Args, Query, Resolver } from "@nestjs/graphql";
import { Language } from "../entity/Language";
import { SettingsService } from "../service/SettingsService";
import { LanguageDTO } from "../payload/LanguageDTO";

@Resolver()
export class SettingsResolver {


  constructor( private settingsService: SettingsService) {
  }

  @Query(() => Language)
  async editLanguage(@Args("lang") language: LanguageDTO) {
    return this.settingsService.editLanguage(language);
  }
}