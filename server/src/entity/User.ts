import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { UserSetting } from "./UserSetting";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ select: false })
    password!: string;

    @Column()
    salt!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Timestamp;

    @Column({ nullable: true })
    created_by!: number;

    @Column({ type: "timestamp", insert: false, nullable: true })
    updated_at!: Timestamp;

    @Column({ insert: false, nullable: true })
    updated_by!: number;
}
