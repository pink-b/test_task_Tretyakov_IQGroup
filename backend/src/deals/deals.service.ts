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
    const deal = await this.dealModel.findByPk(id, { include: [Comment] });
    
    if (!deal) {
      throw new NotFoundException(`Сделка с id ${id} не найдена`);
    }

    deal.set(dealData);
    await deal.save();

    if (dealData.comments) {
      await Comment.destroy({ where: { dealId: id } });

      const comments = dealData.comments.map(comment => ({
        ...comment,
        dealId: id,
      }));
  
      await Comment.bulkCreate(comments);
    }
  
    return deal;
  }
  
  async deleteDeal(id: number) {
    await Comment.destroy({ where: { dealId: id } });

    await this.dealModel.destroy({ where: { id } });
  
    return { message: 'Сделка успешно удалена' };
  }
}