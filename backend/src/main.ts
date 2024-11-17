import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Sequelize } from 'sequelize-typescript';
import { Deal } from './models/deal.model';
import { Comment } from './models/comment.model';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  const sequelize = app.get<Sequelize>(Sequelize);

  await sequelize.sync()
    .then(() => {
      console.log('Database synchronized successfully.');
    })
    .catch((error) => {
      console.error('Error synchronizing database:', error);
    });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();