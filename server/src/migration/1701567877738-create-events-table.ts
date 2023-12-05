import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

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
                        type: "int",
                    },
                    {
                        name: "publish_date",
                        type: "timestamp",
                    },
                    {
                        name: "tickets",
                        type: "json",
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

        await queryRunner.createForeignKey(
            "events",
            new TableForeignKey({
                columnNames: ["type"],
                referencedColumnNames: ["id"],
                referencedTableName: "event_type",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("event");
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("type") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("event", foreignKey);
        }
        await queryRunner.dropTable("events");
    }

}
