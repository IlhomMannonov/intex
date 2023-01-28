import {Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {ColumnKey} from "../../utils/ColumnKey";

export abstract class AbsDate {

    @Column()
    @CreateDateColumn({type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", name: ColumnKey.CREATED_AT})
    createdAt: Date;

    @Column()
    @UpdateDateColumn({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        onUpdate: "CURRENT_TIMESTAMP(6)",
        name: ColumnKey.UPDATED_AT
    })
    updatedAt: Date;
    @Column({default: false, type: "boolean"})
    deleted: Boolean;

}