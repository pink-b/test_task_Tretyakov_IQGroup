// src/deals/deals.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { DealsService } from './deals.service';
import { Deal } from '../models/deal.model';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Get()
  async findAll(): Promise<Deal[]> {
    return this.dealsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Deal> {
    return this.dealsService.findOne(id);
  }

  @Post()
  async create(@Body() deal: Deal): Promise<Deal> {
    return this.dealsService.create(deal);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() deal: Deal): Promise<Deal> {
    return this.dealsService.update(id, deal);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.dealsService.remove(id);
  }
}

