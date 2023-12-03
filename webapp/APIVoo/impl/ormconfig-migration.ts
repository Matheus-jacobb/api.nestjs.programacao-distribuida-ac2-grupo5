require('dotenv').config();
export default {
  type: process.env.DB_TYPE,
  host: 'localhost',
  port: 5431,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/*.ts'],
  migrationsRun: true,
};
