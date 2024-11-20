import { Module } from '@nestjs/common';
import { DealController } from './deals/deals.controller';
import { DealService } from './deals/deals.service';
import { CommentController } from './comments/comments.controller';
import { CommentService } from './comments/comments.service';
import { CleanupService } from './cleanUp/cleanUp.service';
import { CleanupController } from './cleanUp/cleanUp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Deal } from './models/deal.model';
import { Comment } from './models/comment.model';

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
      autoLoadModels: true,
    }),
    SequelizeModule.forFeature([Deal, Comment]),
  ],
  controllers: [DealController, CommentController, CleanupController],
  providers: [DealService, CommentService, CleanupService],
})
export class AppModule {}