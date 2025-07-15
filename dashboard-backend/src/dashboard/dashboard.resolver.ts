import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './dashboard.entity';

@Resolver(() => Dashboard)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => [Dashboard])
  dashboards(): Promise<Dashboard[]> {
    return this.dashboardService.findAll();
  }

  @Mutation(() => Dashboard)
  createDashboard(
    @Args('title') title: string,
    @Args('userId') userId: number,
  ): Promise<Dashboard> {
    return this.dashboardService.create(title, userId);
  }
}
