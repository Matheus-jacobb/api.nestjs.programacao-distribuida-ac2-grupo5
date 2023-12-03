import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertMockDataMigration1701628220429 implements MigrationInterface {
  name = 'InsertMockDataMigration1701628220429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserção de dados iniciais para a tabela "places"
    await queryRunner.query(`INSERT INTO "places" ("createdAt", "updatedAt", "isActive", "type", "name", "commonLimit", "vipLimit") VALUES (now(), now(), true, 'Venue', 'Mock Venue 1', 100, 50), (now(), now(), true, 'Stadium', 'Mock Stadium 2', 150, 75), (now(), now(), true, 'Hall', 'Mock Hall 3', 80, 40), (now(), now(), true, 'Arena', 'Mock Arena 4', 120, 60), (now(), now(), true, 'Club', 'Mock Club 5', 60, 30)`);

    // Inserção de dados iniciais para a tabela "users"
    await queryRunner.query(`INSERT INTO "users" ("createdAt", "updatedAt", "isActive", "email", "password", "roles") VALUES (now(), now(), true, 'user1@example.com', 'password1', 'user'), (now(), now(), true, 'user2@example.com', 'password2', 'admin'), (now(), now(), true, 'user3@example.com', 'password3', 'user'), (now(), now(), true, 'user4@example.com', 'password4', 'user'), (now(), now(), true, 'user5@example.com', 'password5', 'admin')`);

    // Inserção de dados iniciais para a tabela "events"
    await queryRunner.query(`INSERT INTO "events" ("createdAt", "updatedAt", "isActive", "type", "startDate", "endDate", "placeId") VALUES (now(), now(), true, 'Concert', '2023-12-10T18:00:00.000Z', '2023-12-10T22:00:00.000Z', 1), (now(), now(), true, 'Sports Game', '2023-12-15T15:00:00.000Z', '2023-12-15T18:00:00.000Z', 2), (now(), now(), true, 'Conference', '2023-12-20T09:00:00.000Z', '2023-12-20T17:00:00.000Z', 3), (now(), now(), true, 'Party', '2023-12-25T20:00:00.000Z', '2023-12-26T02:00:00.000Z', 4), (now(), now(), true, 'Exhibition', '2023-12-28T10:00:00.000Z', '2023-12-30T18:00:00.000Z', 5)`);

    // Inserção de dados iniciais para a tabela "tickets"
    await queryRunner.query(`INSERT INTO "tickets" ("createdAt", "updatedAt", "isActive", "userId", "eventId", "chair", "isVip") VALUES (now(), now(), true, 1, 1, 15, true), (now(), now(), true, 2, 2, 25, false), (now(), now(), true, 3, 3, 10, true), (now(), now(), true, 4, 4, 5, false), (now(), now(), true, 5, 5, 30, true)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Desfazer as operações realizadas no método up, caso seja necessário
  }
}