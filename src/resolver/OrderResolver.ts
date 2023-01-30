import { Query, Resolver } from "@nestjs/graphql";
import { OrderService } from "../service/OrderService";
import { Order } from "../entity/Order";

@Resolver()
export class OrderResolver {

  constructor(
    private orderService: OrderService
  ) {
  }



}