import {MigrationInterface, QueryRunner} from "typeorm";

export class AddInitialMigration1701629449953 implements MigrationInterface {
    name = 'AddInitialMigration1701629449953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "places" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "type" character varying NOT NULL, "name" character varying NOT NULL, "commonLimit" integer NOT NULL, "vipLimit" integer NOT NULL, CONSTRAINT "PK_1afab86e226b4c3bc9a74465c12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "email" character varying NOT NULL, "password" character varying NOT NULL, "roles" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "userId" integer NOT NULL, "eventId" integer NOT NULL, "chair" integer NOT NULL, "isVip" boolean NOT NULL, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "type" character varying NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying NOT NULL, "placeId" integer NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_4bb45e096f521845765f657f5c8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_8a101375d173c39a7c1d02c9d7d" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "events" ADD CONSTRAINT "FK_359b48411878a60ae7df2d5f25e" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "events" DROP CONSTRAINT "FK_359b48411878a60ae7df2d5f25e"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_8a101375d173c39a7c1d02c9d7d"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_4bb45e096f521845765f657f5c8"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "places"`);
    }

}
