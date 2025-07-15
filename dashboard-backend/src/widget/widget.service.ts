import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Widget } from './widget.entity';
import { Dashboard } from '../dashboard/dashboard.entity';

@Injectable()
export class WidgetService {
  constructor(
    @InjectRepository(Widget)
    private widgetRepo: Repository<Widget>,
    @InjectRepository(Dashboard)
    private dashboardRepo: Repository<Dashboard>,
  ) {}

  async findAll(): Promise<Widget[]> {
    return this.widgetRepo.find(); // no need to add `relations: ['dashboard']` if eager is set
  }

  async create(
    type: string,
    sqlQuery: string,
    layout: string,
    dashboardId: number,
  ): Promise<Widget> {
    const dashboard = await this.dashboardRepo.findOneBy({ id: dashboardId });
    if (!dashboard) {
      throw new Error(`Dashboard with ID ${dashboardId} not found`);
    }

    const widget = this.widgetRepo.create({
      type,
      sqlQuery,
      layout,
      dashboard,
    });

    return this.widgetRepo.save(widget);
  }
}
