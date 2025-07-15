import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dashboard } from './dashboard.entity';
import { DashboardService } from './dashboard.service';
import { DashboardResolver } from './dashboard.resolver';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dashboard, User])],
  providers: [DashboardService, DashboardResolver],
})
export class DashboardModule {}
