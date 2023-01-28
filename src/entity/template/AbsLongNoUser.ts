import {AbsDate} from "./AbsDate";
import {ObjectType} from "@nestjs/graphql";
import {Long, PrimaryGeneratedColumn} from "typeorm";

export abstract class AbsLongNoUser extends AbsDate {
    @PrimaryGeneratedColumn({type: "bigint"})
    id: number;
}