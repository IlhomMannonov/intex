import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Attachment } from "../entity/Attachment";

@Module({
  imports:[TypeOrmModule.forFeature([Attachment])]
})
export class AttachmentModule {

}