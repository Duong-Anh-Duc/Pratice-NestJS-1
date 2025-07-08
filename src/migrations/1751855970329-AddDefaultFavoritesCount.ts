import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDefaultFavoritesCount1751855970329 implements MigrationInterface {
    name = 'AddDefaultFavoritesCount1751855970329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "favoritesCount" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" ALTER COLUMN "favoritesCount" DROP DEFAULT`);
    }

}
