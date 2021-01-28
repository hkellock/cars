import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Car } from '../car/car.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  isAdmin?: boolean | null;

  @OneToMany((type) => Car, (car) => car.user)
  @Field((type) => [Car!]!)
  cars: Car[];
}
