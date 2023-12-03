import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateEventsTable1701567877738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "events",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "title",
                        type: "varchar",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "images_url",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "date_start",
                        type: "timestamp",
                    },
                    {
                        name: "date_end",
                        type: "timestamp",
                    },
                    {
                        name: "venue",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "type",
                        type: "json",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "created_by",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "updated_by",
                        type: "int",
                        isNullable: true,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("events");
    }

}
