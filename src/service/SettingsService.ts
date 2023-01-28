import { Injectable } from "@nestjs/common";
import { LanguageDTO } from "../payload/LanguageDTO";
import { Language } from "../entity/Language";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SettingsService {

  constructor(@InjectRepository(Language)private languageRepository: Repository<Language>
  ) {
  }


  async editLanguage(language: LanguageDTO) {


    await this.languageRepository.delete({});

    const insertResult = await this.languageRepository.insert({
      name_uz: language.name_uz,
      name_ru: language.name_ru,
      name_en: language.name_en
    });


    console.log(insertResult);
    return insertResult[0];
  }


}