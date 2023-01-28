import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TokenDTO {
  @Field()
  type: string = "Bearer";
  @Field()
  accessToken: string = "null";
  @Field()
  refreshToken: string = "null";

  @Field()
  deviceKey: string;


  constructor(accessToken: string, refreshToken: string, deviceKey: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.deviceKey = deviceKey;
  }

  public static initToken(): TokenDTO {
    return new TokenDTO("null", "null", "null");
  }
}
