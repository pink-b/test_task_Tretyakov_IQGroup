import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comment } from 'src/models/comment.model';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':dealId')
  async getCommentsByDealId(@Param('dealId') dealId: number) {
    return await this.commentService.getCommentsByDealId(dealId);
  }

  @Post()
  async createComment(@Body() commentData: Partial<Comment>) {
    return await this.commentService.createComment(commentData);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return await this.commentService.deleteComment(id);
  }
}