import { Module } from '@nestjs/common';
import { DealController } from './deals/deals.controller';
import { DealService } from './deals/deals.service';
import { CommentController } from './comments/comments.controller';
import { CommentService } from './comments/comments.service';
import { Comment } from './models/comment.model';

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
      models: [Deal, Comment],
      autoLoadModels: true
    }),
    SequelizeModule.forFeature([Deal, Comment]),
  ],
  controllers: [DealController, CommentController],
  providers: [DealService, CommentService],
})
export class AppModule {}