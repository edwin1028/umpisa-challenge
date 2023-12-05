import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from "typeorm";

export class CreateUserSettingTable1701567952147 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user_setting",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "setting",
                        type: "json",
                        default: `'${JSON.stringify({theme_mode: 'light'})}'`
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "user_setting",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("user_setting");
        const foreignKey = table?.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("user_id") !== -1
        );
        if (foreignKey) {
            await queryRunner.dropForeignKey("user_setting", foreignKey);
        }
        await queryRunner.dropTable("user_setting");
    }
}
