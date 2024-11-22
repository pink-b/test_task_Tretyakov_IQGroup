import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DatabaseInitService implements OnModuleInit {
  constructor(private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    const sql = fs.readFileSync(path.join(__dirname, 'init_db/init.sql')).toString();
    try {
      await this.sequelize.query(sql);
      console.log('Database and tables created successfully');
    } catch (error) {
      console.error('Error creating database and tables:', error);
    }
  }
}