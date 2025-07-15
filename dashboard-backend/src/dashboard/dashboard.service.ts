import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dashboard } from './dashboard.entity';
import { User } from '../user/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Dashboard)
    private dashboardRepo: Repository<Dashboard>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll(): Promise<Dashboard[]> {
    return this.dashboardRepo.find({ relations: ['user', 'widgets'] });
  }

  async create(title: string, userId: number): Promise<Dashboard> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    const dashboard = this.dashboardRepo.create({ title, user });
    return this.dashboardRepo.save(dashboard);
  }
}
