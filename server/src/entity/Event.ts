import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    title!: string;

    @Column({nullable: true})
    description!: string;

    @Column("json", {nullable: true})
    images_url!: object;

    @Column("timestamp")
    date_start!: Date;

    @Column("timestamp")
    date_end!: Date;

    @Column("json", {nullable: true})
    venue!: object;
    
    @Column("json")
    type!: object;

    @Column("json")
    tickets!: object;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Timestamp;

    @Column({ nullable: true })
    created_by!: number;

    @Column({ type: "timestamp", insert: false, nullable: true })
    updated_at!: Timestamp;

    @Column({ insert: false, nullable: true })
    updated_by!: number;
}
