import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "../entity/Category";
import { Order } from "../entity/Order";
import { OrderResolver } from "../resolver/OrderResolver";
import { OrderService } from "../service/OrderService";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  providers:[
    OrderResolver,
    OrderService
  ]
})
export class OrderModule {

}