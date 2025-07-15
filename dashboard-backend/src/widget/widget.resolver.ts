import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WidgetService } from './widget.service';
import { Widget } from './widget.entity';

@Resolver(() => Widget)
export class WidgetResolver {
  constructor(private readonly widgetService: WidgetService) {}

  @Query(() => [Widget])
  widgets(): Promise<Widget[]> {
    return this.widgetService.findAll();
  }

  @Mutation(() => Widget)
  createWidget(
    @Args('type') type: string,
    @Args('sqlQuery') sqlQuery: string,
    @Args('layout') layout: string,
    @Args('dashboardId', { type: () => Int }) dashboardId: number,
  ): Promise<Widget> {
    return this.widgetService.create(type, sqlQuery, layout, dashboardId);
  }
}
