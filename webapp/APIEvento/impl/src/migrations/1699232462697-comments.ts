import {MigrationInterface, QueryRunner} from "typeorm";

export class comments1699232462697 implements MigrationInterface {
    name = 'comments1699232462697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_b03017fa6a4ab0dd232fec0231f"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_c07818321fafc49c28566c28763"`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title" character varying NOT NULL, "creatorId" integer NOT NULL, "chapterId" integer NOT NULL, "message" character varying NOT NULL, CONSTRAINT "UQ_7afd0cb94bbd9edd9ccea8d9549" UNIQUE ("title"), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "chapterId"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "chapter" ALTER COLUMN "creatorId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_8dc14e6a6a0c24a0ce1bc74380d" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_0b42c764851bcb3ffae634792bc" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_0b42c764851bcb3ffae634792bc"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_8dc14e6a6a0c24a0ce1bc74380d"`);
        await queryRunner.query(`ALTER TABLE "chapter" ALTER COLUMN "creatorId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "chapterId" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_c07818321fafc49c28566c28763" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_b03017fa6a4ab0dd232fec0231f" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
