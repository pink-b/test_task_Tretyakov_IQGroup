// src/config/database.config.ts
import { Sequelize } from 'sequelize-typescript';
import { Deal } from '../models/deal.model';
import { Comment } from '../models/comment.model';


export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'new_password',
  database: process.env.DATABASE_NAME || 'test_task_tretyakov_iqgroup',
  models: [Deal, Comment],
});