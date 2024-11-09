// src/config/database.config.ts
import { Sequelize } from 'sequelize-typescript';
import { Deal } from '../models/deal.model'; // Импортируйте свою модель

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // или имя вашего контейнера
  port: 5432,
  username: 'your_db_username',
  password: 'your_db_password',
  database: 'your_db_name',
  models: [Deal], // Укажите ваши модели здесь
});