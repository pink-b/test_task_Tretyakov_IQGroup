// src/deals/deals.service.ts
import { Injectable } from '@nestjs/common';
import { Deal } from '../models/deal.model';

@Injectable()
export class DealsService {
  async findAll(): Promise<Deal[]> {
    return Deal.findAll();
  }

  async findOne(id: string): Promise<Deal> {
    return Deal.findByPk(id);
  }

  async create(deal: Deal): Promise<Deal> {
    return Deal.create(deal);
  }

  async update(id: string, deal: Deal): Promise<Deal> {
    await Deal.update(deal, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await Deal.destroy({ where: { id } });
  }
}