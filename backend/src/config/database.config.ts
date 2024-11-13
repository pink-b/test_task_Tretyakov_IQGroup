// src/config/database.config.ts
import { Sequelize } from 'sequelize-typescript';
import { Deal } from '../models/deal.model';
export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'новый_пароль',
  database: 'test_task_tretyakov_iqgroup',
  models: [Deal],
});