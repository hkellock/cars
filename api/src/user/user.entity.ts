import { ObjectType, Field } from '@nestjs/graphql';
import { Car } from 'src/car/car.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  username: string;

  @OneToMany((type) => Car, (car) => car.user)
  @Field((type) => [Car!]!)
  cars: Car[];
}
