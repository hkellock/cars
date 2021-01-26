import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CarType } from './car.types';

@Entity()
@ObjectType()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  brand: string;

  @Column()
  @Field()
  model: string;

  @Column()
  @Field((type) => CarType)
  type: string;

  @Column('float')
  @Field((type) => Number)
  price: number;

  @Column('float')
  @Field((type) => Number)
  yearlyTax: number;

  @Column('float')
  @Field((type) => Number)
  wltpConsumption: number;

  @ManyToOne((type) => User, (user) => user.cars)
  user?: User;

  @ManyToMany((type) => Car, (car) => car.compareTo)
  @JoinTable()
  @Field((type) => [Car], { nullable: true })
  compareTo?: Car[];
}
