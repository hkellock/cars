import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  type: string;

  @Column('float')
  price: number;

  @Column('float')
  yearlyTax: number;

  @Column('float')
  wltpConsumption: number;

  @ManyToOne((type) => User, (user) => user.cars)
  user?: User;
}
