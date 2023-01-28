import { PrimaryGeneratedColumn } from "typeorm";
import { AbsDate } from "./AbsDate";

export abstract  class AbsLongWithUserAudit extends AbsDate{
    @PrimaryGeneratedColumn()
    private id: Number;
}