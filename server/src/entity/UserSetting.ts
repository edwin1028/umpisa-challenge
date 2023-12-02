import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity("user_setting")
export class UserSetting {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @OneToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column("json", {
        default: {
            theme_mode: "dark",
        },
    })
    setting!: object;
}
