import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'; 
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { WidgetModule } from './widget/widget.module';

import { User } from './user/user.entity';
import { Dashboard } from './dashboard/dashboard.entity';
import { Widget } from './widget/widget.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Dashboard, Widget],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: true,
    }),
    UserModule,
    DashboardModule,
    WidgetModule,
  ],
})
export class AppModule {}
