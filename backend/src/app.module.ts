import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DealsController } from './deals/deals.controller';
import { DealsService } from './deals/deals.service';

import { SequelizeModule } from '@nestjs/sequelize';

import { Deal } from './models/deal.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_db_username',
      password: 'your_db_password',
      database: 'your_db_name',
      models: [Deal],
    }),
  ],
  controllers: [AppController, DealsController],
  providers: [AppService, DealsService],
})
export class AppModule {}
