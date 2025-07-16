import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Widget } from './widget.entity';
import { WidgetService } from './widget.service';
import { WidgetResolver } from './widget.resolver';
import { Dashboard } from '../dashboard/dashboard.entity';
import { WidgetController } from './widget.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Widget, Dashboard])],
  providers: [WidgetService, WidgetResolver],
  controllers: [WidgetController],
})
export class WidgetModule {}
