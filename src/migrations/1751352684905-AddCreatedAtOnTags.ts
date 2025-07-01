import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtOnTags1751352684905 implements MigrationInterface {
    name = 'AddCreatedAtOnTags1751352684905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
    }

}
