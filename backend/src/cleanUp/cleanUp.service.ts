import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deal } from 'src/models/deal.model';
import { Comment } from 'src/models/comment.model';

@Injectable()
export class CleanupService {
  constructor(
    @InjectModel(Deal) private readonly dealModel: typeof Deal,
    @InjectModel(Comment) private readonly commentModel: typeof Comment,
  ) {}

  async cleanUp() {
    await this.commentModel.destroy({ where: {}, truncate: true });

    await this.dealModel.destroy({ where: {}, truncate: true });
  }
}