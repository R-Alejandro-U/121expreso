import { DataSource } from 'typeorm';
import { dbConfig } from './envs.config';

export const AppDataSource: DataSource = new DataSource({
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  dropSchema: dbConfig.dropSchema,
  entities: dbConfig.entities,
});
