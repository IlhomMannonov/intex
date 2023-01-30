import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "../entity/Order";
import { UserProduct } from "../entity/UserProduct";
import { BasketResolver } from "../resolver/BasketResolver";
import { BasketService } from "../resolver/BasketService";

@Module({
  imports: [TypeOrmModule.forFeature([UserProduct])],
  providers: [
    BasketResolver,
    BasketService
  ]
})
export class BasketModule {

}