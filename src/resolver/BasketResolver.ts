import { Query, Resolver } from "@nestjs/graphql";
import { BasketService } from "./BasketService";
import { Roles } from "../decorator/PreAuthorize";
import { UserRoleEnum } from "../enums/UserRoleEnum";
import { UserProduct } from "../entity/UserProduct";
import { Inject } from "@nestjs/common";

@Resolver()
export class BasketResolver {
  constructor(private basketService: BasketService) {
  }

  @Roles(UserRoleEnum.ADMIN)
  @Query(() => UserProduct)
  async getMyBasket() {
    return this.basketService.getMyBasket();
  }

}