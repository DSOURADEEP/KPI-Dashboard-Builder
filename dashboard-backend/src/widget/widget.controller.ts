import { Controller, Post, Body } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller()
export class WidgetController {
  constructor(private dataSource: DataSource) {}

  @Post('query')
  async runCustomQuery(@Body() body: { sql: string }) {
    const { sql } = body;

    try {
      const result = await this.dataSource.query(sql);
      return result;
    } catch (error) {
      console.error('Query error:', error);
      return { error: 'Failed to run query' };
    }
  }
}
