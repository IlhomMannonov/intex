import { Module } from "@nestjs/common";
import { CategoryResolver } from "../resolver/CategoryResolver";
import { CategoryService } from "../service/CategoryService";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../entity/Category";

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers:[
    CategoryResolver,
    CategoryService
  ]
})
export class CategoryModule {

}