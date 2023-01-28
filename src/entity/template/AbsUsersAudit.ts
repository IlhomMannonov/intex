import { Field } from "@nestjs/graphql";
import { AbsDate } from "./AbsDate";
import { Column, Long, PrimaryGeneratedColumn } from "typeorm";
import { ColumnKey } from "../../utils/ColumnKey";


export abstract class AbsUsersAudit extends AbsDate {
    @Field(type => Number)
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({type: "bigint", name: ColumnKey.CREATED_BY_ID},)
    createdById: Long;

    @Column({type: "bigint", name: ColumnKey.UPDATED_BY_ID})
    updatedById: Long;


    constructor(id: Number) {
        super();
        this.id = id;
    }
}