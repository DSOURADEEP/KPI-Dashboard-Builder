import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Dashboard } from '../dashboard/dashboard.entity';

@ObjectType()
@Entity()
export class Widget {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  sqlQuery: string;

  @Field()
  @Column()
  layout: string;

  @Field(() => Dashboard) // Ensure this is exposed in GraphQL
  @ManyToOne(() => Dashboard, dashboard => dashboard.widgets, { eager: true, onDelete: 'CASCADE' })
  dashboard: Dashboard;
}
