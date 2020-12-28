import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CarService } from './car.service';
import { Car } from './car.model';
import { CarInput } from './car.input';

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Query(() => [Car!]!)
  async cars() {
    return await this.carService.findAll();
  }

  @Mutation(() => Car!)
  async createCar(@Args('input') input: CarInput) {
    return await this.carService.create(input);
  }

  @Mutation(() => String!)
  async removeCar(@Args('id') id: string) {
    return await this.carService.remove(id);
  }
}
