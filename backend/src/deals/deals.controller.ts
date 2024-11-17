import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { DealService } from './deals.service';
import { Deal } from 'src/models/deal.model';

@Controller('deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @Get()
  async getAllDeals() {
    return await this.dealService.getAllDeals();
  }

  @Get(':id')
  async getDealById(@Param('id') id: number) {
    return await this.dealService.getDealById(id);
  }

  @Post()
  async createDeal(@Body() dealData: Partial<Deal>) {
    return await this.dealService.createDeal(dealData);
  }

  @Patch(':id')
  async updateDeal(@Param('id') id: number, @Body() dealData: Partial<Deal>) {
    return await this.dealService.updateDeal(id, dealData);
  }

  @Delete(':id')
  async deleteDeal(@Param('id') id: number) {
    return await this.dealService.deleteDeal(id);
  }
}