import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Deal } from 'src/models/deal.model';
import { Comment } from 'src/models/comment.model';

@Injectable()
export class DealService {
  constructor(
    @InjectModel(Deal)
    private dealModel: typeof Deal,
  ) {}

  async getAllDeals(): Promise<Deal[]> {
    return await this.dealModel.findAll({ include: [Comment] }); // Включаем комментарии
  }

  async getDealById(id: number): Promise<Deal> {
    return await this.dealModel.findByPk(id, { include: [Comment] }); // Включаем комментарии
  }

  async createDeal(dealData: Partial<Deal>) {
    return await this.dealModel.create(dealData);
  }

  async updateDeal(id: number, dealData: Partial<Deal>) {
    await this.dealModel.update(dealData, { where: { id } });
    return this.getDealById(id);
  }

  async deleteDeal(id: number) {
    await this.dealModel.destroy({ where: { id } });
    return { message: 'Deal deleted successfully' };
  }
}