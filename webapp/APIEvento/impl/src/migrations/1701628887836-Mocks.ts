import {MigrationInterface, QueryRunner} from "typeorm";

export class Mocks1701628887836 implements MigrationInterface {
    name = 'Mocks1701628887836';

    public async up(queryRunner: QueryRunner): Promise<void> {
      // Inserção de dados iniciais para a tabela "places"
      for (let i = 1; i <= 5; i++) {
        await queryRunner.query(`INSERT INTO "places" ("createdAt", "updatedAt", "isActive", "type", "name", "commonLimit", "vipLimit") VALUES (now(), now(), true, 'Venue', 'Mock Venue ${i}', ${100 + i}, ${50 + i})`);
      }
  
      // Inserção de dados iniciais para a tabela "users"
      for (let i = 1; i <= 5; i++) {
        await queryRunner.query(`INSERT INTO "users" ("createdAt", "updatedAt", "isActive", "email", "password", "roles", "userId", "eventId", "chair", "isVip") VALUES (now(), now(), true, 'mock${i}@example.com', 'mockPassword', 'user', ${i + 1}, ${i}, ${i + 2}, ${i % 2 === 0})`);
      }
  
      // Inserção de dados iniciais para a tabela "events"
      for (let i = 1; i <= 5; i++) {
        await queryRunner.query(`INSERT INTO "events" ("createdAt", "updatedAt", "isActive", "type", "startDate", "endDate", "placeId") VALUES (now(), now(), true, 'Concert', '2023-12-${10 + i}T18:00:00.000Z', '2023-12-${10 + i}T22:00:00.000Z', ${i})`);
      }
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      // Desfazer as operações realizadas no método up, caso seja necessário
    }
}