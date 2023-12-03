import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1699231862826 implements MigrationInterface {
    name = 'initialMigration1699231862826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chapter" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title" character varying NOT NULL, "content" text NOT NULL, "cover" character varying, "bookId" integer NOT NULL, CONSTRAINT "UQ_1540f666b7a73b75b2c13e5db2d" UNIQUE ("title"), CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users-likes" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" integer NOT NULL, "bookId" integer NOT NULL, CONSTRAINT "PK_410229bc4e1bdfca213302020d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "title" character varying NOT NULL, "cover" character varying, "authorId" integer NOT NULL, CONSTRAINT "UQ_3cd818eaf734a9d8814843f1197" UNIQUE ("title"), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_password_resets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" integer NOT NULL, "resetPasswordCode" character varying NOT NULL, "validUntil" bigint NOT NULL, CONSTRAINT "PK_1195936bd55065c8dfbfed4e4cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "cover"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "content" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "cover" character varying`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "bookId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "creatorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "chapterId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "message" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_b03017fa6a4ab0dd232fec0231f" FOREIGN KEY ("chapterId") REFERENCES "chapter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD CONSTRAINT "FK_c07818321fafc49c28566c28763" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users-likes" ADD CONSTRAINT "FK_32d231cf58f33535475b43bc3d8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users-likes" ADD CONSTRAINT "FK_aa9bf30dc2b0b60d42cdd60ced1" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_password_resets" ADD CONSTRAINT "FK_2202b74b2057713a1cff9f7beca" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_password_resets" DROP CONSTRAINT "FK_2202b74b2057713a1cff9f7beca"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"`);
        await queryRunner.query(`ALTER TABLE "users-likes" DROP CONSTRAINT "FK_aa9bf30dc2b0b60d42cdd60ced1"`);
        await queryRunner.query(`ALTER TABLE "users-likes" DROP CONSTRAINT "FK_32d231cf58f33535475b43bc3d8"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_c07818321fafc49c28566c28763"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_b03017fa6a4ab0dd232fec0231f"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP CONSTRAINT "FK_ec31fc72d948403c35b8cf289f0"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "message"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "chapterId"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "creatorId"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "cover"`);
        await queryRunner.query(`ALTER TABLE "chapter" DROP COLUMN "content"`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "bookId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "cover" character varying`);
        await queryRunner.query(`ALTER TABLE "chapter" ADD "content" text NOT NULL`);
        await queryRunner.query(`DROP TABLE "user_password_resets"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "users-likes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "chapter"`);
    }

}
