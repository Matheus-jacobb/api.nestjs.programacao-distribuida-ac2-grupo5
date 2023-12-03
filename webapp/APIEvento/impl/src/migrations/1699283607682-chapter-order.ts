import {MigrationInterface, QueryRunner} from "typeorm";

export class chapterOrder1699283607682 implements MigrationInterface {
    name = 'chapterOrder1699283607682'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" ADD "order" integer`);
        await queryRunner.query(`UPDATE "chapter" SET "order" = 0`);
        await queryRunner.query(`ALTER TABLE "chapter" ALTER COLUMN "order" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "chapter" ALTER COLUMN "order" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "order"`);
    }

}
