import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from '../models/comment.model';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':dealId')
  async findAll(@Param('dealId') dealId: string): Promise<Comment[]> {
    return this.commentsService.findAll(dealId);
  }

  @Post()
  async create(@Body() comment: Comment): Promise<Comment> {
    return this.commentsService.create(comment);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.commentsService.remove(id);
  }
}