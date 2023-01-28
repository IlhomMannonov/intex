import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import * as process from "process";
import { doc } from "prettier";
import { ApolloDriver } from "@nestjs/apollo";
import { UserModule } from "./module/user.module";
import { JwtModule } from "@nestjs/jwt";
import { CategoryModule } from "./module/CategoryModule";
import { SettingsModule } from "./module/SettingsModule";
import { TypeOrmModule } from "@nestjs/typeorm";
import join = doc.builders.join;
import { Category } from "./entity/Category";
import { Language } from "./entity/Language";
import { Product } from "./entity/Product";
import { SmsCode } from "./entity/SmsCode";
import { UserDevice } from "./entity/UserDevice";
import { User } from "./entity/User";
import { ProductModule } from "./module/ProductModule";
import { Attachment } from "./entity/Attachment";
import { AttachmentModule } from "./module/AttachmentModule";


@Module({
  imports: [
    AttachmentModule,
    UserModule,
    ProductModule,
    CategoryModule,
    SettingsModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), ["src/schema.gql"]),
      driver: ApolloDriver
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root123",
      database: "db1",
      entities: [Category, Language, Product, SmsCode, UserDevice, User, Attachment],
      synchronize: true
    }),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "12h" }
    })
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule {
}
