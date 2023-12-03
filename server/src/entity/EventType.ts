import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity("event_type")
export class EventType {
    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Timestamp;

    @Column({ nullable: true })
    created_by!: number;

    @Column({ type: "timestamp", insert: false, nullable: true })
    updated_at!: Timestamp;

    @Column({ insert: false, nullable: true })
    updated_by!: number;
}
