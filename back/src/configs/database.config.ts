import { DataSource } from 'typeorm';
import { dbConfig } from './envs.config';
import { User } from '../users/User.entity';
import { Comment } from '../comments/Comment.entity';

export const typeorm: DataSource = new DataSource({
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  synchronize: dbConfig.synchronize,
  logging: dbConfig.logging,
  dropSchema: dbConfig.dropSchema,
  entities: [User, Comment],
});
export const userModel = typeorm.getRepository(User);
export const commentModel = typeorm.getRepository(Comment);
