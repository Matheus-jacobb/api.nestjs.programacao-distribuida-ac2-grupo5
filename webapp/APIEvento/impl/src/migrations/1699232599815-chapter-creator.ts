import {MigrationInterface, QueryRunner} from "typeorm";

export class chapterCreator1699232599815 implements MigrationInterface {
    name = 'chapterCreator1699232599815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "creatorId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" ADD "creatorId" integer`);
    }

}
