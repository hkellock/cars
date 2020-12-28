import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Car {
  @Field()
  id: string;

  @Field()
  brand: string;

  @Field()
  model: string;

  @Field()
  type: string;

  @Field((type) => Number!)
  price: number;

  @Field((type) => Number!)
  yearlyTax: number;

  @Field((type) => Number!)
  wltpConsumption: number;
}
