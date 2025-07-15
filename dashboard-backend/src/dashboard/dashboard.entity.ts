import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { Widget } from '../widget/widget.entity';

@ObjectType()
@Entity()
export class Dashboard {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @ManyToOne(() => User, user => user.dashboards)
  @Field(() => User)
  user: User;

  @OneToMany(() => Widget, widget => widget.dashboard)
  @Field(() => [Widget])
  widgets: Widget[];
}
