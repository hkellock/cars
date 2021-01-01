import { Field, ObjectType } from '@nestjs/graphql';
import { Car } from 'src/car/car.model';

@ObjectType()
export class User {
  @Field()
  username: string;

  @Field((type) => [Car!]!)
  cars: Car[];
}
