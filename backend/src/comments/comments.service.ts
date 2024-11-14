import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from 'src/models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async getCommentsByDealId(dealId: number) {
    return await this.commentModel.findAll({ where: { dealId } });
  }

  async createComment(commentData: Partial<Comment>) {
    return await this.commentModel.create(commentData);
  }

  async deleteComment(id: number) {
    await this.commentModel.destroy({ where: { id } });
    return { message: 'Comment deleted successfully' };
  }
}