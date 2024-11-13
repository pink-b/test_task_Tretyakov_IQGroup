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
      username: 'postgres',
      password: 'новый_пароль',
      database: 'test_task_tretyakov_iqgroup',
      models: [Deal],
      autoLoadModels: true
    }),
  ],
  controllers: [AppController, DealsController],
  providers: [AppService, DealsService],
})
export class AppModule {}