import { Injectable } from '@nestjs/common';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentsService {
  async findAll(dealId: string): Promise<Comment[]> {
    return Comment.findAll({ where: { dealId } });
  }

  async create(comment: Comment): Promise<Comment> {
    return Comment.create(comment);
  }

  async remove(id: string): Promise<void> {
    await Comment.destroy({ where: { id } });
  }
}