import { Field, InputType } from '@nestjs/graphql';
import { CarType } from './car.types';

@InputType()
export class CarInput {
  @Field()
  brand: string;

  @Field()
  model: string;

  @Field(() => CarType!)
  type: string;

  @Field((type) => Number!)
  price: number;

  @Field((type) => Number!)
  yearlyTax: number;

  @Field((type) => Number!)
  wltpConsumption: number;
}
