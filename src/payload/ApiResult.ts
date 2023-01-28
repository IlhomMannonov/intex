import { Field, ObjectType } from "@nestjs/graphql";
import { TokenDTO } from "./TokenDTO";

@ObjectType()
export class ApiResult {
  @Field()
  success: boolean;
  @Field({ nullable: true })
  data: string;
  @Field({ nullable: true })
  message: string;

  public static successResponse(message: string): ApiResult {
    const apiResult = new ApiResult();
    apiResult.message = message;
    return apiResult;
  }
}
