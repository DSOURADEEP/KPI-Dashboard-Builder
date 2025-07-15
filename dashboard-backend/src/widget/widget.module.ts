import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Widget } from './widget.entity';
import { WidgetService } from './widget.service';
import { WidgetResolver } from './widget.resolver';
import { Dashboard } from '../dashboard/dashboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Widget, Dashboard])],
  providers: [WidgetService, WidgetResolver],
})
export class WidgetModule {}
