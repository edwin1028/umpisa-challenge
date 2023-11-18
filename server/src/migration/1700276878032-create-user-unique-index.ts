import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

export class CreateUserUniqueIndex1700276878032 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users ADD CONSTRAINT unique_email UNIQUE (email)`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE users DROP CONSTRAINT unique_email UNIQUE (email)`
        );
    }
}
