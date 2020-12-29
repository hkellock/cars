import { Field, ObjectType } from '@nestjs/graphql';
import { CarType } from './car.types';

@ObjectType()
export class Car {
  @Field()
  id: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field((type) => CarType!)
  type: string;

  @Field((type) => Number!)
  price: number;

  @Field((type) => Number!)
  yearlyTax: number;

  @Field((type) => Number!)
  wltpConsumption: number;
}
