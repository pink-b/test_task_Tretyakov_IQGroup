import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deal } from 'src/models/deal.model';
import { Comment } from 'src/models/comment.model';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class DealService {
  constructor(
    @InjectModel(Deal)
    private dealModel: typeof Deal,
  ) {}

  async getAllDeals(): Promise<Deal[]> {
    return await this.dealModel.findAll({ include: [Comment] });
  }

  async getDealById(id: number): Promise<Deal> {
    return await this.dealModel.findByPk(id, { include: [Comment] });
  }

  async createDeal(dealData: Partial<Deal>) {
    return await this.dealModel.create(dealData);
  }

  async updateDeal(id: number, dealData: Partial<Deal>) {
    console.log(`___________________updateDeal ID:${id}____________________`)
    const deal = await this.dealModel.findByPk(id, { include: [Comment] });
    
    if (!deal) {
      throw new NotFoundException(`Сделка с id ${id} не найдена`);
    }
    console.log(`__________________________${JSON.stringify(dealData)}_____________________________`)
    // Remove comments from dealData before updating the deal
    const { comments, ...dealDataWithoutComments } = dealData;
    
    deal.set(dealDataWithoutComments);
    await deal.save();

    if (comments) {
      console.log(`_________________commentsFromDeal:${JSON.stringify(comments)}___________________`)
      // Delete existing comments
      await Comment.destroy({ where: { dealId: id } });

      // Prepare new comments without IDs to let Sequelize auto-generate them
      const newComments = comments.map(comment => ({
        text: comment.text,
        dealId: id,
        // Optionally preserve timestamps if needed
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt
      }));
      console.log(`_________________newComments:${JSON.stringify(newComments)}___________________`)
      // Create new comments
      await Comment.bulkCreate(newComments);
    }
  
    // Fetch and return updated deal with new comments
    return await this.dealModel.findByPk(id, { include: [Comment] });
  }
  
  async deleteDeal(id: number) {
    await Comment.destroy({ where: { dealId: id } });
    await this.dealModel.destroy({ where: { id } });
    return { message: 'Сделка успешно удалена' };
  }
}